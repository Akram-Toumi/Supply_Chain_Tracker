import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import ProductDetailsModal from '../../components/ProductDetailsModal';
import BlockchainStatus from '../../components/BlockchainStatus';

const WarehouseReceive = () => {
  const { 
    isConnected, 
    products, 
    loading, 
    error, 
    deliverToWarehouse,
    getProductStateString, 
    formatTimestamp,
    refreshProducts
  } = useBlockchain();
  
  const [receivingProductId, setReceivingProductId] = useState<number | null>(null);
  const [receiveLocation, setReceiveLocation] = useState('');
  const [receiving, setReceiving] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleDeliverToWarehouse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiveLocation.trim() || receivingProductId === null) return;

    try {
      setReceiving(true);
      await deliverToWarehouse(receivingProductId, receiveLocation);
      setReceivingProductId(null);
      setReceiveLocation('');
      // Show success message
      alert(`Product #${receivingProductId} delivered to warehouse at: ${receiveLocation}`);
    } catch (error) {
      console.error('Error delivering product to warehouse:', error);
    } finally {
      setReceiving(false);
    }
  };

  const handleStartReceiving = (productId: number) => {
    setReceivingProductId(productId);
    setReceiveLocation('');
  };

  const handleCancelReceiving = () => {
    setReceivingProductId(null);
    setReceiveLocation('');
  };

  const handleViewDetails = (productId: number) => {
    setSelectedProductId(productId);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedProductId(null);
  };

  const canReceiveInWarehouse = (product: any) => {
    return product.currentState === 1; // IN_TRANSIT state
  };

  const getStatusColor = (state: number) => {
    switch (state) {
      case 0: return 'bg-blue-100 text-blue-800'; // PRODUCED
      case 1: return 'bg-yellow-100 text-yellow-800'; // IN_TRANSIT
      case 2: return 'bg-purple-100 text-purple-800'; // IN_WAREHOUSE
      case 3: return 'bg-indigo-100 text-indigo-800'; // DISTRIBUTED
      case 4: return 'bg-green-100 text-green-800'; // IN_STORE
      case 5: return 'bg-gray-100 text-gray-800'; // SOLD
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Carrier Delivery Dashboard</h1>
          <WalletConnection />
        </div>
        <div className="bg-[#1F2937] rounded-lg p-6 text-center">
          <p className="text-gray-400">Please connect your wallet to view products in transit</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Carrier Delivery Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={refreshProducts}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <span className="material-icons text-sm mr-2">refresh</span>
            Refresh Products
          </button>
          <WalletConnection />
        </div>
      </div>

      <BlockchainStatus />

      {receivingProductId && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Deliver Product #{receivingProductId} to Warehouse</h3>
          <p className="text-gray-400 text-sm mb-4">
            This will change the product state from IN_TRANSIT to IN_WAREHOUSE.
          </p>
          <form onSubmit={handleDeliverToWarehouse} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Warehouse Location
              </label>
              <input
                type="text"
                value={receiveLocation}
                onChange={(e) => setReceiveLocation(e.target.value)}
                placeholder="Enter warehouse location"
                className="w-full px-3 py-2 bg-[#374151] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={receiving || !receiveLocation.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {receiving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Receiving...
                  </>
                ) : (
                  <>
                    <span className="material-icons text-sm mr-2">warehouse</span>
                    Deliver to Warehouse
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

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-[#1F2937] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Products in Transit (Ready for Delivery to Warehouse)</h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-2">Loading products...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-3">ID</th>
                  <th className="text-left py-3">Name</th>
                  <th className="text-left py-3">Producer</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Created</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(product => product.currentState === 1).length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">
                      No products in transit found. Products will appear here after they are shipped by producers and received by carriers.
                    </td>
                  </tr>
                ) : (
                  products
                    .filter(product => product.currentState === 1)
                    .map(product => (
                    <tr key={product.id} className="border-b border-gray-700">
                      <td className="py-3 text-white font-mono">#{product.id}</td>
                      <td className="py-3 text-white">{product.name}</td>
                      <td className="py-3 text-gray-300 font-mono text-sm">
                        {product.producer.slice(0, 6)}...{product.producer.slice(-4)}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-sm ${getStatusColor(product.currentState)}`}>
                          {getProductStateString(product.currentState)}
                        </span>
                      </td>
                      <td className="py-3 text-gray-300 text-sm">
                        {formatTimestamp(product.createdAt)}
                      </td>
                      <td className="py-3">
                        <button 
                          onClick={() => handleViewDetails(product.id)}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                          title="View Details"
                        >
                          <span className="material-icons text-sm">visibility</span>
                        </button>
                        {canReceiveInWarehouse(product) && (
                          <button 
                            onClick={() => handleStartReceiving(product.id)}
                            className="text-purple-400 hover:text-purple-300 mr-3"
                            title="Deliver to Warehouse"
                          >
                            <span className="material-icons text-sm">warehouse</span>
                          </button>
                        )}
                        <button 
                          onClick={() => handleViewDetails(product.id)}
                          className="text-green-400 hover:text-green-300"
                          title="View History"
                        >
                          <span className="material-icons text-sm">history</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedProductId && (
        <ProductDetailsModal
          productId={selectedProductId}
          isOpen={showDetailsModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default WarehouseReceive;
