import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';

const RetailerOverview = () => {
  const { 
    isConnected, 
    products, 
    getProductStateString,
    receiveByRetailer,
    loading, 
    error 
  } = useBlockchain();
  
  const [receivingProductId, setReceivingProductId] = useState<number | null>(null);
  const [receiveLocation, setReceiveLocation] = useState('');
  const [receiving, setReceiving] = useState(false);


  const handleReceive = async (productId: number) => {
    if (!receiveLocation.trim()) {
      alert('Please enter a receive location');
      return;
    }

    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setReceiving(true);
      console.log('Attempting to receive product:', productId, 'at location:', receiveLocation);
      await receiveByRetailer(productId, receiveLocation);
      setReceivingProductId(null);
      setReceiveLocation('');
      alert(`Product #${productId} received successfully!`);
    } catch (error: any) {
      console.error('Error receiving product:', error);
      alert(`Failed to receive product: ${error.message}`);
    } finally {
      setReceiving(false);
    }
  };

  const handleStartReceive = (productId: number) => {
    setReceivingProductId(productId);
    setReceiveLocation('');
  };

  const handleCancelReceive = () => {
    setReceivingProductId(null);
    setReceiveLocation('');
  };

  // Filter products by state
  const distributedProducts = products.filter(p => p.currentState === 3); // DISTRIBUTED
  const inStoreProducts = products.filter(p => p.currentState === 4); // IN_STORE
  const soldProducts = products.filter(p => p.currentState === 5); // SOLD
  
  // Calculate analytics
  const productsToReceive = distributedProducts.length;
  const productsInStore = inStoreProducts.length;
  const productsSold = soldProducts.length;
  const totalProducts = productsToReceive + productsInStore + productsSold;
  
  // Get unique producers from all products
  const uniqueProducers = [...new Set(products.map(p => p.producer))];
  const producerStats = uniqueProducers.map(producer => {
    const producerProducts = products.filter(p => p.producer === producer);
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">To Receive</p>
              <h3 className="text-2xl font-bold text-white">{productsToReceive}</h3>
            </div>
            <span className="material-icons text-orange-500 text-3xl">inbox</span>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">In Store</p>
              <h3 className="text-2xl font-bold text-white">{productsInStore}</h3>
            </div>
            <span className="material-icons text-green-500 text-3xl">store</span>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Products</p>
              <h3 className="text-2xl font-bold text-white">{totalProducts}</h3>
            </div>
            <span className="material-icons text-blue-500 text-3xl">inventory</span>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Producers</p>
              <h3 className="text-2xl font-bold text-white">{uniqueProducers.length}</h3>
            </div>
            <span className="material-icons text-purple-500 text-3xl">business</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products to Receive */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Products to Receive</h3>
          <div className="space-y-4">
            {distributedProducts.slice(-5).reverse().map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-orange-500">inbox</span>
                  <div>
                    <p className="text-white text-sm">{product.name}</p>
                    <p className="text-gray-400 text-xs">ID: {product.id} • {getProductStateString(product.currentState)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-white text-sm">{product.producer}</p>
                    <p className="text-orange-400 text-xs">Ready to Receive</p>
                  </div>
                  <button
                    onClick={() => handleStartReceive(product.id)}
                    disabled={!isConnected}
                    className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
                      !isConnected 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                  >
                    <span className="material-icons text-sm">inbox</span>
                    <span>{!isConnected ? 'Connect Wallet' : 'Receive'}</span>
                  </button>
                </div>
              </div>
            ))}
            {distributedProducts.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <span className="material-icons text-4xl mb-2">inbox</span>
                <p>No products to receive</p>
              </div>
            )}
          </div>
        </div>

        {/* Recently Received Products */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Recently Received</h3>
          <div className="space-y-4">
            {inStoreProducts.slice(-5).reverse().map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-green-500">check_circle</span>
                  <div>
                    <p className="text-white text-sm">{product.name}</p>
                    <p className="text-gray-400 text-xs">ID: {product.id} • {getProductStateString(product.currentState)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-white text-sm">{product.producer}</p>
                    <p className="text-green-400 text-xs">Received</p>
                  </div>
                  <div className="px-3 py-1 rounded text-sm bg-green-600 text-white">
                    <span className="material-icons text-sm">check</span>
                  </div>
                </div>
              </div>
            ))}
            {inStoreProducts.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <span className="material-icons text-4xl mb-2">check_circle</span>
                <p>No products received yet</p>
              </div>
            )}
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
              <p className="text-white font-bold text-lg">{products.filter(p => p.name.toLowerCase().includes('coffee') || p.name.toLowerCase().includes('bean')).length}</p>
              <p className="text-gray-400 text-sm">Beverages</p>
            </div>
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">local_drink</span>
              <p className="text-white font-bold text-lg">{products.filter(p => p.name.toLowerCase().includes('milk') || p.name.toLowerCase().includes('dairy')).length}</p>
              <p className="text-gray-400 text-sm">Dairy</p>
            </div>
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">eco</span>
              <p className="text-white font-bold text-lg">{products.filter(p => p.name.toLowerCase().includes('organic') || p.name.toLowerCase().includes('natural')).length}</p>
              <p className="text-gray-400 text-sm">Organic</p>
            </div>
            <div className="bg-[#374151] p-4 rounded-lg text-center">
              <span className="material-icons text-primary text-3xl mb-2">inventory</span>
              <p className="text-white font-bold text-lg">{totalProducts}</p>
              <p className="text-gray-400 text-sm">Total Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Receive Modal */}
      {receivingProductId && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Receive Product #{receivingProductId}</h3>
          <p className="text-gray-400 text-sm mb-4">
            This will confirm that the product has been received from the distributor and update its status to "In Store".
          </p>
          <form onSubmit={(e) => { e.preventDefault(); handleReceive(receivingProductId); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Receive Location
              </label>
              <input
                type="text"
                value={receiveLocation}
                onChange={(e) => setReceiveLocation(e.target.value)}
                placeholder="Enter receive location (e.g., Store, Warehouse, etc.)"
                className="w-full px-3 py-2 bg-[#374151] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={receiving}
                className={`flex-1 px-4 py-2 rounded flex items-center justify-center space-x-2 ${
                  receiving
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {receiving ? (
                  <>
                    <span className="material-icons text-sm animate-spin">refresh</span>
                    <span>Receiving...</span>
                  </>
                ) : (
                  <>
                    <span className="material-icons text-sm">inbox</span>
                    <span>Confirm Receive</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelReceive}
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
