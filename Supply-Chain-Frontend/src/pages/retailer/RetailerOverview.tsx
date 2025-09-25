import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';

const RetailerOverview = () => {
  const { 
    isConnected, 
    products, 
    getProductStateString,
    sellProduct,
    loading, 
    error 
  } = useBlockchain();
  
  const [purchasingProductId, setPurchasingProductId] = useState<number | null>(null);
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [purchasing, setPurchasing] = useState(false);

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

  // Filter to show only products in store (IN_STORE state)
  const inStoreProducts = products.filter(p => p.currentState === 4);
  
  // Calculate analytics from in-store products only
  const totalProducts = inStoreProducts.length;
  const productsInStore = inStoreProducts.length; // All are in store
  const productsSold = products.filter(p => p.currentState === 5).length; // SOLD
  
  // Get recent in-store products (last 5)
  const recentProducts = inStoreProducts.slice(-5).reverse();
  
  // Get unique producers from in-store products only
  const uniqueProducers = [...new Set(inStoreProducts.map(p => p.producer))];
  const producerStats = uniqueProducers.map(producer => {
    const producerProducts = inStoreProducts.filter(p => p.producer === producer);
    return {
      name: producer,
      products: producerProducts.length,
      authenticity: 100 // All blockchain products are authentic
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Retailer Dashboard</h1>
        <WalletConnection />
      </div>

      {/* Blockchain Status */}
      <BlockchainStatus />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Products in Store</p>
              <h3 className="text-2xl font-bold text-white">{totalProducts}</h3>
            </div>
            <span className="material-icons text-primary text-3xl">store</span>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Producers</p>
              <h3 className="text-2xl font-bold text-white">{uniqueProducers.length}</h3>
            </div>
            <span className="material-icons text-green-500 text-3xl">business</span>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Products Sold</p>
              <h3 className="text-2xl font-bold text-white">{productsSold}</h3>
            </div>
            <span className="material-icons text-yellow-500 text-3xl">shopping_cart</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Products */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Products in Store</h3>
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-green-500">verified</span>
                  <div>
                    <p className="text-white text-sm">{product.name}</p>
                    <p className="text-gray-400 text-xs">ID: {product.id} • {getProductStateString(product.currentState)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-white text-sm">{product.producer}</p>
                    <p className="text-green-400 text-xs">Authentic</p>
                  </div>
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
        </div>

        {/* Producer Stats */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Producers</h3>
          <div className="space-y-4">
            {producerStats.map((producer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-primary">business</span>
                  <p className="text-white">{producer.name}</p>
                </div>
                <p className="text-white">{producer.products} products</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className="bg-[#1F2937] p-6 rounded-lg lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">Product Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">agriculture</span>
              <p className="text-white font-bold text-lg">{inStoreProducts.filter(p => p.name.toLowerCase().includes('coffee') || p.name.toLowerCase().includes('bean')).length}</p>
              <p className="text-gray-400 text-sm">Beverages</p>
            </div>
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">local_drink</span>
              <p className="text-white font-bold text-lg">{inStoreProducts.filter(p => p.name.toLowerCase().includes('milk') || p.name.toLowerCase().includes('dairy')).length}</p>
              <p className="text-gray-400 text-sm">Dairy</p>
            </div>
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">eco</span>
              <p className="text-white font-bold text-lg">{inStoreProducts.filter(p => p.name.toLowerCase().includes('organic') || p.name.toLowerCase().includes('natural')).length}</p>
              <p className="text-gray-400 text-sm">Organic</p>
            </div>
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">inventory</span>
              <p className="text-white font-bold text-lg">{inStoreProducts.length}</p>
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
    </div>
  );
};

export default RetailerOverview;
