import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';
import ProductDetailsModal from '../../components/ProductDetailsModal';

interface JourneyStep {
  stage: string;
  location: string;
  timestamp: string;
  owner: string;
  state: number;
  icon: string;
}

const ProductHistory = () => {
  const { 
    isConnected, 
    products, 
    getProductHistory, 
    getProductStateString, 
    formatTimestamp,
    sellProduct,
    loading, 
    error 
  } = useBlockchain();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedProductHistory, setSelectedProductHistory] = useState<JourneyStep[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [purchasingProductId, setPurchasingProductId] = useState<number | null>(null);
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [purchasing, setPurchasing] = useState(false);

  // Filter to show only products in store (IN_STORE state)
  const inStoreProducts = products.filter(product => product.currentState === 4);
  
  const filteredProducts = inStoreProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toString().includes(searchQuery.toLowerCase())
  );

  const handleProductSelect = async (productId: number) => {
    setSelectedProduct(productId);
    try {
      const history = await getProductHistory(productId);
      const journeySteps: JourneyStep[] = history.map(transaction => ({
        stage: getProductStateString(transaction.state),
        location: transaction.location,
        timestamp: formatTimestamp(transaction.timestamp),
        owner: transaction.owner,
        state: transaction.state,
        icon: transaction.state === 0 ? 'agriculture' :
              transaction.state === 1 ? 'local_shipping' :
              transaction.state === 2 ? 'warehouse' :
              transaction.state === 3 ? 'inventory' :
              transaction.state === 4 ? 'store' :
              'check_circle'
      }));
      setSelectedProductHistory(journeySteps);
    } catch (error) {
      console.error('Error fetching product history:', error);
      alert('Failed to fetch product history');
    }
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
      await sellProduct(productId, purchaseLocation);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Retailer Product History</h1>
        <WalletConnection />
      </div>

      {/* Blockchain Status */}
      <BlockchainStatus />

      {/* Search Bar */}
      <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg w-full md:w-96">
        <span className="material-icons text-gray-400">search</span>
        <input
          type="text"
          placeholder="Search products in store..."
          className="bg-transparent text-white w-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className={`bg-[#1F2937] p-4 rounded-lg cursor-pointer transition-colors ${
              selectedProduct === product.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleProductSelect(product.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-medium">{product.name}</h3>
                <p className="text-gray-400 text-sm">ID: {product.id}</p>
              </div>
              <span className="material-icons text-primary">history</span>
            </div>
            <p className="text-gray-400 mt-2">Producer: {product.producer}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-green-400 text-sm">✓ Available in Store</p>
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
                <span>{!isConnected ? 'Connect Wallet' : 'Buy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Journey Timeline */}
      {selectedProductHistory.length > 0 && (
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-6">Product Supply Chain Journey</h2>
          <div className="space-y-4">
            {selectedProductHistory.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index !== selectedProductHistory.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-700"></div>
                )}
                
                <div className="flex space-x-4">
                  {/* Icon */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#374151] rounded-full flex items-center justify-center">
                      <span className="material-icons text-primary">{step.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="bg-[#374151] p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-medium">{step.stage}</h3>
                          <p className="text-gray-400 text-sm">{step.location}</p>
                          <p className="text-gray-400 text-sm">Owner: {step.owner}</p>
                        </div>
                        <p className="text-gray-400 text-sm">{step.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {purchasingProductId && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Purchase Product #{purchasingProductId}</h3>
          <p className="text-gray-400 text-sm mb-4">
            This will mark the product as sold and complete the supply chain journey.
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

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <ProductDetailsModal
          productId={selectedProduct}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default ProductHistory;
