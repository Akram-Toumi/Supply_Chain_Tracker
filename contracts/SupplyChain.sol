// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChain {
    enum ProductState { 
        PRODUCED, 
        IN_TRANSIT, 
        IN_WAREHOUSE, 
        DISTRIBUTED, 
        IN_STORE, 
        SOLD 
    }

    struct Product {
        uint256 id;
        string name;
        address producer;
        ProductState currentState;
        address currentOwner;
        uint256 createdAt;
        uint256 lastUpdated;
    }

    struct Transaction {
        uint256 productId;
        ProductState fromState;
        ProductState toState;
        address actor;
        uint256 timestamp;
        string location;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => Transaction[]) public productHistory;
    mapping(address => bool) public producers;
    mapping(address => bool) public carriers;
    mapping(address => bool) public warehouses;
    mapping(address => bool) public distributors;
    mapping(address => bool) public retailers;

    uint256 public productCount;
    address public owner;

    event ProductCreated(uint256 productId, string name, address producer);
    event StateChanged(
        uint256 productId, 
        ProductState fromState, 
        ProductState toState, 
        address actor
    );
    event ActorAdded(address actor, string role);
    event ActorRemoved(address actor, string role);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyProducer() {
        require(producers[msg.sender], "Only producer can perform this action");
        _;
    }

    modifier onlyCarrier() {
        require(carriers[msg.sender], "Only carrier can perform this action");
        _;
    }

    modifier onlyWarehouse() {
        require(warehouses[msg.sender], "Only warehouse can perform this action");
        _;
    }

    modifier onlyDistributor() {
        require(distributors[msg.sender], "Only distributor can perform this action");
        _;
    }

    modifier onlyRetailer() {
        require(retailers[msg.sender], "Only retailer can perform this action");
        _;
    }

    modifier validProduct(uint256 _productId) {
        require(products[_productId].id != 0, "Product does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
        productCount = 0;
    }

    function addProducer(address _producer) external onlyOwner {
        producers[_producer] = true;
        emit ActorAdded(_producer, "PRODUCER");
    }

    function addCarrier(address _carrier) external onlyOwner {
        carriers[_carrier] = true;
        emit ActorAdded(_carrier, "CARRIER");
    }

    function addWarehouse(address _warehouse) external onlyOwner {
        warehouses[_warehouse] = true;
        emit ActorAdded(_warehouse, "WAREHOUSE");
    }

    function addDistributor(address _distributor) external onlyOwner {
        distributors[_distributor] = true;
        emit ActorAdded(_distributor, "DISTRIBUTOR");
    }

    function addRetailer(address _retailer) external onlyOwner {
        retailers[_retailer] = true;
        emit ActorAdded(_retailer, "RETAILER");
    }

    function createProduct(string memory _name) external onlyProducer {
        productCount++;
        
        products[productCount] = Product({
            id: productCount,
            name: _name,
            producer: msg.sender,
            currentState: ProductState.PRODUCED,
            currentOwner: msg.sender,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });

        productHistory[productCount].push(Transaction({
            productId: productCount,
            fromState: ProductState.PRODUCED,
            toState: ProductState.PRODUCED,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: "Creation"
        }));

        emit ProductCreated(productCount, _name, msg.sender);
    }

    function shipProduct(uint256 _productId, string memory _location) 
        external 
        onlyProducer 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.PRODUCED, "Product must be in PRODUCED state");
        require(product.currentOwner == msg.sender, "You don't own this product");

        product.currentState = ProductState.IN_TRANSIT;
        product.currentOwner = msg.sender;
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.PRODUCED,
            toState: ProductState.IN_TRANSIT,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));

        emit StateChanged(_productId, ProductState.PRODUCED, ProductState.IN_TRANSIT, msg.sender);
    }

    function receiveInTransit(uint256 _productId, string memory _location) 
        external 
        onlyCarrier 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.IN_TRANSIT, "Product must be in transit");

        product.currentOwner = msg.sender;
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.IN_TRANSIT,
            toState: ProductState.IN_TRANSIT,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));
    }

    function deliverToWarehouse(uint256 _productId, string memory _location) 
        external 
        onlyCarrier 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.IN_TRANSIT, "Product must be in transit");
        require(product.currentOwner == msg.sender, "You don't own this product");

        product.currentState = ProductState.IN_WAREHOUSE;
        product.currentOwner = msg.sender;
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.IN_TRANSIT,
            toState: ProductState.IN_WAREHOUSE,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));

        emit StateChanged(_productId, ProductState.IN_TRANSIT, ProductState.IN_WAREHOUSE, msg.sender);
    }

    function receiveInWarehouse(uint256 _productId, string memory _location) 
        external 
        onlyWarehouse 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.IN_WAREHOUSE, "Product must be in warehouse");

        product.currentOwner = msg.sender;
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.IN_WAREHOUSE,
            toState: ProductState.IN_WAREHOUSE,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));
    }

    function shipToDistributor(uint256 _productId, string memory _location) 
        external 
        onlyWarehouse 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.IN_WAREHOUSE, "Product must be in warehouse");
        require(product.currentOwner == msg.sender, "You don't own this product");

        product.currentState = ProductState.DISTRIBUTED;
        product.currentOwner = msg.sender;
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.IN_WAREHOUSE,
            toState: ProductState.DISTRIBUTED,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));

        emit StateChanged(_productId, ProductState.IN_WAREHOUSE, ProductState.DISTRIBUTED, msg.sender);
    }

    function receiveByDistributor(uint256 _productId, string memory _location) 
        external 
        onlyDistributor 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.DISTRIBUTED, "Product must be distributed");

        product.currentOwner = msg.sender;
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.DISTRIBUTED,
            toState: ProductState.DISTRIBUTED,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));
    }

    function deliverToRetailer(uint256 _productId, string memory _location) 
        external 
        onlyDistributor 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.DISTRIBUTED, "Product must be distributed");
        require(product.currentOwner == msg.sender, "You don't own this product");

        product.currentState = ProductState.IN_STORE;
        product.currentOwner = msg.sender;
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.DISTRIBUTED,
            toState: ProductState.IN_STORE,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));

        emit StateChanged(_productId, ProductState.DISTRIBUTED, ProductState.IN_STORE, msg.sender);
    }

    function receiveByRetailer(uint256 _productId, string memory _location) 
        external 
        onlyRetailer 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.DISTRIBUTED, "Product must be distributed");

        product.currentState = ProductState.IN_STORE;
        product.currentOwner = msg.sender;
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.DISTRIBUTED,
            toState: ProductState.IN_STORE,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));

        emit StateChanged(_productId, ProductState.DISTRIBUTED, ProductState.IN_STORE, msg.sender);
    }

    function sellProduct(uint256 _productId, string memory _location) 
        external 
        onlyRetailer 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.IN_STORE, "Product must be in store");
        require(product.currentOwner == msg.sender, "You don't own this product");

        product.currentState = ProductState.SOLD;
        product.currentOwner = address(0); // No owner after sale
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.IN_STORE,
            toState: ProductState.SOLD,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));

        emit StateChanged(_productId, ProductState.IN_STORE, ProductState.SOLD, msg.sender);
    }

    function purchaseProduct(uint256 _productId, string memory _location) 
        external 
        validProduct(_productId) 
    {
        Product storage product = products[_productId];
        require(product.currentState == ProductState.IN_STORE, "Product must be in store");

        product.currentState = ProductState.SOLD;
        product.currentOwner = address(0); // No owner after sale
        product.lastUpdated = block.timestamp;

        productHistory[_productId].push(Transaction({
            productId: _productId,
            fromState: ProductState.IN_STORE,
            toState: ProductState.SOLD,
            actor: msg.sender,
            timestamp: block.timestamp,
            location: _location
        }));

        emit StateChanged(_productId, ProductState.IN_STORE, ProductState.SOLD, msg.sender);
    }

    function getProductHistory(uint256 _productId) 
        external 
        view 
        validProduct(_productId) 
        returns (Transaction[] memory) 
    {
        return productHistory[_productId];
    }

    function getProductState(uint256 _productId) 
        external 
        view 
        validProduct(_productId) 
        returns (ProductState) 
    {
        return products[_productId].currentState;
    }

    function getProductInfo(uint256 _productId) 
        external 
        view 
        validProduct(_productId) 
        returns (Product memory) 
    {
        return products[_productId];
    }

    function isProducer(address _address) external view returns (bool) {
        return producers[_address];
    }

    function isCarrier(address _address) external view returns (bool) {
        return carriers[_address];
    }

    function isWarehouse(address _address) external view returns (bool) {
        return warehouses[_address];
    }

    function isDistributor(address _address) external view returns (bool) {
        return distributors[_address];
    }

    function isRetailer(address _address) external view returns (bool) {
        return retailers[_address];
    }
}