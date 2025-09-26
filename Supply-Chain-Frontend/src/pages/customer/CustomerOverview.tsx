import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';

const CustomerOverview = () => {
  const { 
    isConnected, 
    products, 
    getProductStateString,
    purchaseProduct,
    loading, 
    error 
  } = useBlockchain();
  
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState<string>('all');
  const [purchasingProductId, setPurchasingProductId] = useState<number | null>(null);
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [purchasing, setPurchasing] = useState(false);

  // Filter to show only products in store (IN_STORE state) and sold (SOLD state)
  const availableProducts = products.filter(p => p.currentState === 4 || p.currentState === 5);
  
  // Filter products based on search term and state
  const filteredProducts = availableProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toString().includes(searchTerm);
    const matchesState = filterState === 'all' || 
                        (filterState === 'in-store' && product.currentState === 4) ||
                        (filterState === 'sold' && product.currentState === 5);
    return matchesSearch && matchesState;
  });
  
  // Calculate analytics
  const totalProducts = availableProducts.length;
  const productsInStore = products.filter(p => p.currentState === 4).length;
  const productsSold = products.filter(p => p.currentState === 5).length;
  
  // Get unique producers
  const uniqueProducers = [...new Set(availableProducts.map(p => p.producer))];
  
  // Get recent products (last 10)
  const recentProducts = filteredProducts.slice(-10).reverse();

  const handleProductSelect = (productId: number) => {
    setSelectedProduct(selectedProduct === productId ? null : productId);
  };

  const handlePurchase = async (productId: number) => {
    if (!purchaseLocation.trim()) {
      alert('Please enter a purchase location');
      return;
    }

    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setPurchasing(true);
      console.log('Attempting to purchase product:', productId, 'at location:', purchaseLocation);
      await purchaseProduct(productId, purchaseLocation);
      setPurchasingProductId(null);
      setPurchaseLocation('');
      alert(`Product #${productId} purchased successfully!`);
    } catch (error: any) {
      console.error('Error purchasing product:', error);
      alert(`Failed to purchase product: ${error.message}`);
    } finally {
      setPurchasing(false);
    }
  };

  const handleStartPurchase = (productId: number) => {
    setPurchasingProductId(productId);
    setPurchaseLocation('');
  };

  const handleCancelPurchase = () => {
    setPurchasingProductId(null);
    setPurchaseLocation('');
  };

  const getProductStatusColor = (state: number) => {
    switch (state) {
      case 4: return 'text-green-400 bg-green-900/20';
      case 5: return 'text-blue-400 bg-blue-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getProductStatusIcon = (state: number) => {
    switch (state) {
      case 4: return 'store';
      case 5: return 'shopping_cart';
      default: return 'help';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Customer Store</h1>
        <WalletConnection />
      </div>

      {/* Blockchain Status */}
      <BlockchainStatus />

      {/* Search and Filter */}
      <div className="bg-[#1F2937] p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#374151] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-4 py-2 bg-[#374151] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Products</option>
              <option value="in-store">In Store</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Products</p>
              <h3 className="text-2xl font-bold text-white">{totalProducts}</h3>
            </div>
            <span className="material-icons text-primary text-3xl">inventory</span>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Available in Store</p>
              <h3 className="text-2xl font-bold text-white">{productsInStore}</h3>
            </div>
            <span className="material-icons text-green-500 text-3xl">store</span>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Producers</p>
              <h3 className="text-2xl font-bold text-white">{uniqueProducers.length}</h3>
            </div>
            <span className="material-icons text-yellow-500 text-3xl">business</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product List */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Available Products</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-icons text-gray-400 text-4xl mb-2">search_off</span>
                <p className="text-gray-400">No products found matching your criteria</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedProduct === product.id 
                      ? 'bg-[#374151] border border-blue-500' 
                      : 'bg-[#374151] hover:bg-[#4B5563]'
                  }`}
                  onClick={() => handleProductSelect(product.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="material-icons text-green-500">verified</span>
                      <div>
                        <p className="text-white text-sm font-medium">{product.name}</p>
                        <p className="text-gray-400 text-xs">ID: {product.id} • Producer: {product.producer.slice(0, 6)}...{product.producer.slice(-4)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${getProductStatusColor(product.currentState)}`}>
                        <span className="material-icons text-xs">{getProductStatusIcon(product.currentState)}</span>
                        <span>{getProductStateString(product.currentState)}</span>
                      </span>
                      <span className="material-icons text-gray-400 text-sm">
                        {selectedProduct === product.id ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Expanded Product Details */}
                  {selectedProduct === product.id && (
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Product ID</p>
                          <p className="text-white font-mono">{product.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Producer</p>
                          <p className="text-white font-mono">{product.producer}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Current State</p>
                          <p className="text-white">{getProductStateString(product.currentState)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Created</p>
                          <p className="text-white">{new Date(product.createdAt * 1000).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        {product.currentState === 4 ? (
                          <button
                            onClick={() => handleStartPurchase(product.id)}
                            disabled={!isConnected}
                            className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
                              !isConnected 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            <span className="material-icons text-sm">shopping_cart</span>
                            <span>{!isConnected ? 'Connect Wallet' : 'Buy Now'}</span>
                          </button>
                        ) : (
                          <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm flex items-center space-x-1">
                            <span className="material-icons text-sm">check_circle</span>
                            <span>Sold</span>
                          </span>
                        )}
                        <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm flex items-center space-x-1">
                          <span className="material-icons text-sm">verified_user</span>
                          <span>Verify</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Producer Stats */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Producers</h3>
          <div className="space-y-4">
            {uniqueProducers.slice(0, 5).map((producer, index) => {
              const producerProducts = availableProducts.filter(p => p.producer === producer);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="material-icons text-primary">business</span>
                    <div>
                      <p className="text-white text-sm font-mono">{producer.slice(0, 6)}...{producer.slice(-4)}</p>
                      <p className="text-gray-400 text-xs">Producer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm">{producerProducts.length} products</p>
                    <p className="text-green-400 text-xs">Verified</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Categories */}
        <div className="bg-[#1F2937] p-6 rounded-lg lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">Product Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">agriculture</span>
              <p className="text-white font-bold text-lg">{availableProducts.filter(p => p.name.toLowerCase().includes('coffee') || p.name.toLowerCase().includes('bean')).length}</p>
              <p className="text-gray-400 text-sm">Beverages</p>
            </div>
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">local_drink</span>
              <p className="text-white font-bold text-lg">{availableProducts.filter(p => p.name.toLowerCase().includes('milk') || p.name.toLowerCase().includes('dairy')).length}</p>
              <p className="text-gray-400 text-sm">Dairy</p>
            </div>
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">eco</span>
              <p className="text-white font-bold text-lg">{availableProducts.filter(p => p.name.toLowerCase().includes('organic') || p.name.toLowerCase().includes('natural')).length}</p>
              <p className="text-gray-400 text-sm">Organic</p>
            </div>
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">inventory</span>
              <p className="text-white font-bold text-lg">{availableProducts.length}</p>
              <p className="text-gray-400 text-sm">Total Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {purchasingProductId && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Purchase Product #{purchasingProductId}</h3>
          <p className="text-gray-400 text-sm mb-4">
            This will mark the product as sold and complete your purchase.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); handlePurchase(purchasingProductId); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Purchase Location
              </label>
              <input
                type="text"
                value={purchaseLocation}
                onChange={(e) => setPurchaseLocation(e.target.value)}
                placeholder="Enter purchase location (e.g., Store, Online, etc.)"
                className="w-full px-3 py-2 bg-[#374151] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={purchasing}
                className={`flex-1 px-4 py-2 rounded flex items-center justify-center space-x-2 ${
                  purchasing
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {purchasing ? (
                  <>
                    <span className="material-icons text-sm animate-spin">refresh</span>
                    <span>Purchasing...</span>
                  </>
                ) : (
                  <>
                    <span className="material-icons text-sm">shopping_cart</span>
                    <span>Complete Purchase</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelPurchase}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerOverview;
