import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';
import ProductDetailsModal from '../../components/ProductDetailsModal';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
  batchId: string;
  origin: string;
  expiryDate: string;
  temperature: string;
}

const DistributorInventory = () => {
  const { 
    isConnected, 
    products, 
    loading, 
    error, 
    receiveByDistributor,
    deliverToRetailer,
    getProductStateString, 
    formatTimestamp,
    refreshProducts
  } = useBlockchain();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [receivingProductId, setReceivingProductId] = useState<number | null>(null);
  const [deliveringProductId, setDeliveringProductId] = useState<number | null>(null);
  const [receiveLocation, setReceiveLocation] = useState('');
  const [deliverLocation, setDeliverLocation] = useState('');
  const [receiving, setReceiving] = useState(false);
  const [delivering, setDelivering] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Handler functions
  const handleReceiveByDistributor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiveLocation.trim() || receivingProductId === null) return;

    try {
      setReceiving(true);
      await receiveByDistributor(receivingProductId, receiveLocation);
      setReceivingProductId(null);
      setReceiveLocation('');
      alert(`Product #${receivingProductId} received by distributor at: ${receiveLocation}`);
    } catch (error) {
      console.error('Error receiving product by distributor:', error);
    } finally {
      setReceiving(false);
    }
  };

  const handleDeliverToretailer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliverLocation.trim() || deliveringProductId === null) return;

    try {
      setDelivering(true);
      await deliverToRetailer(deliveringProductId, deliverLocation);
      setDeliveringProductId(null);
      setDeliverLocation('');
      alert(`Product #${deliveringProductId} delivered to retailer at: ${deliverLocation}`);
    } catch (error) {
      console.error('Error delivering product to retailer:', error);
    } finally {
      setDelivering(false);
    }
  };

  const handleStartReceiving = (productId: number) => {
    setReceivingProductId(productId);
    setReceiveLocation('');
  };

  const handleStartDelivering = (productId: number) => {
    setDeliveringProductId(productId);
    setDeliverLocation('');
  };

  const handleCancelReceiving = () => {
    setReceivingProductId(null);
    setReceiveLocation('');
  };

  const handleCancelDelivering = () => {
    setDeliveringProductId(null);
    setDeliverLocation('');
  };

  const canReceiveByDistributor = (product: any) => {
    return product.currentState === 3; // DISTRIBUTED state
  };

  const canDeliverToretailer = (product: any) => {
    // Product must be in DISTRIBUTED state and the distributor must own it
    // After receiveByDistributor, the distributor becomes the currentOwner
    return product.currentState === 3; // DISTRIBUTED state
  };

  const handleViewDetails = (productId: number) => {
    setSelectedProductId(productId);
    setShowDetailsModal(true);
  };

  // Filter products for distributor (DISTRIBUTED state)
  const distributorProducts = products.filter(product => 
    product.currentState === 3 // DISTRIBUTED state
  );

  const filteredProducts = distributorProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.id.toString().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Distributor Inventory</h2>
          <WalletConnection />
        </div>
        <div className="bg-[#1F2937] rounded-lg p-6 text-center">
          <p className="text-gray-400">Please connect your wallet to view distributed products</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Distributor Inventory</h2>
        <div className="flex space-x-4">
          <button
            onClick={refreshProducts}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <span className="material-icons text-sm mr-2">refresh</span>
            Refresh
          </button>
          <WalletConnection />
        </div>
      </div>

      <BlockchainStatus />

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Receive Product Form */}
      {receivingProductId && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Receive Product #{receivingProductId} by Distributor</h3>
          <p className="text-gray-400 text-sm mb-4">
            This will update the location of the distributed product.
          </p>
          <form onSubmit={handleReceiveByDistributor} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Distributor Location
              </label>
              <input
                type="text"
                value={receiveLocation}
                onChange={(e) => setReceiveLocation(e.target.value)}
                placeholder="Enter distributor location"
                className="w-full px-3 py-2 bg-[#374151] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={receiving || !receiveLocation.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {receiving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Receiving...
                  </>
                ) : (
                  <>
                    <span className="material-icons text-sm mr-2">inventory</span>
                    Receive Product
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelReceiving}
                disabled={receiving}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Deliver to retailer Form */}
      {deliveringProductId && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Deliver Product #{deliveringProductId} to retailer</h3>
          <p className="text-gray-400 text-sm mb-4">
            This will change the product state from DISTRIBUTED to IN_STORE. Make sure you have received this product first.
          </p>
          <form onSubmit={handleDeliverToretailer} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                retailer Location
              </label>
              <input
                type="text"
                value={deliverLocation}
                onChange={(e) => setDeliverLocation(e.target.value)}
                placeholder="Enter retailer location"
                className="w-full px-3 py-2 bg-[#374151] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={delivering || !deliverLocation.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {delivering ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Delivering...
                  </>
                ) : (
                  <>
                    <span className="material-icons text-sm mr-2">store</span>
                    Deliver to retailer
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelDelivering}
                disabled={delivering}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                Cancel
        </button>
      </div>
          </form>
        </div>
      )}

      {/* Filters */}
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">search</span>
          <input
            type="text"
          placeholder="Search distributed products..."
            className="bg-transparent text-white w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      {/* Products List */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Distributed Products (Ready for Distribution)</h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-2">Loading products...</p>
        </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <span className="material-icons text-6xl text-gray-600 mb-4">inventory_2</span>
            <p className="text-gray-400">No distributed products found</p>
            <p className="text-gray-500 text-sm mt-2">Products will appear here when they reach DISTRIBUTED state</p>
        </div>
        ) : (
      <div className="space-y-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-[#374151] rounded-lg p-4 border border-gray-600">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                      <h3 className="text-white text-lg font-medium">{product.name}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-300">
                        {getProductStateString(product.currentState)}
                  </span>
                </div>
                    <p className="text-gray-400 text-sm mt-1">Product ID: {product.id}</p>
              </div>
                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    {canReceiveByDistributor(product) && (
                      <button 
                        onClick={() => handleStartReceiving(product.id)}
                        className="text-green-400 hover:text-green-300 mr-3"
                        title="Receive Product"
                      >
                        <span className="material-icons text-sm">inventory</span>
                </button>
                    )}
                    {canDeliverToretailer(product) && (
                      <button 
                        onClick={() => handleStartDelivering(product.id)}
                        className="text-purple-400 hover:text-purple-300 mr-3"
                        title="Deliver to retailer"
                      >
                        <span className="material-icons text-sm">store</span>
                </button>
                    )}
                    <button 
                      onClick={() => handleViewDetails(product.id)}
                      className="text-blue-400 hover:text-blue-300"
                      title="View Details"
                    >
                      <span className="material-icons text-sm">info</span>
                </button>
              </div>
            </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                    <p className="text-gray-400 text-sm">Producer</p>
                    <p className="text-white text-sm">
                      {product.producer ? `${product.producer.slice(0, 6)}...${product.producer.slice(-4)}` : 'N/A'}
                    </p>
              </div>
              <div>
                    <p className="text-gray-400 text-sm">Current Owner</p>
                    <p className="text-white text-sm">
                      {product.currentOwner ? `${product.currentOwner.slice(0, 6)}...${product.currentOwner.slice(-4)}` : 'N/A'}
                    </p>
              </div>
              <div>
                    <p className="text-gray-400 text-sm">Created</p>
                    <p className="text-white text-sm">
                      {product.createdAt ? formatTimestamp(product.createdAt) : 'N/A'}
                    </p>
              </div>
              <div>
                    <p className="text-gray-400 text-sm">Last Updated</p>
                    <p className="text-white text-sm">
                      {product.lastUpdated ? formatTimestamp(product.lastUpdated) : 'N/A'}
                    </p>
              </div>
            </div>
          </div>
        ))}
      </div>
        )}
      </div>

      {selectedProductId && (
        <ProductDetailsModal
          productId={selectedProductId}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedProductId(null);
          }}
        />
      )}
    </div>
  );
};

export default DistributorInventory;
