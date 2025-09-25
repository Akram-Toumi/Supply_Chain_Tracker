import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';
import ProductDetailsModal from '../../components/ProductDetailsModal';

interface Shipment {
  id: string;
  type: 'inbound' | 'outbound';
  status: 'pending' | 'in-transit' | 'delivered' | 'completed';
  supplier: string;
  date: string;
  products: {
    id: string;
    name: string;
    quantity: number;
  }[];
  transporterId: string;
  temperature: string;
  estimatedArrival: string;
}

const WarehouseShipments = () => {
  const { 
    isConnected, 
    products, 
    loading, 
    error, 
    shipToDistributor,
    getProductStateString, 
    formatTimestamp,
    refreshProducts
  } = useBlockchain();

  const [activeTab, setActiveTab] = useState<'inbound' | 'outbound'>('outbound');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [shippingProductId, setShippingProductId] = useState<number | null>(null);
  const [shipLocation, setShipLocation] = useState('');
  const [shipping, setShipping] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Handler functions
  const handleShipToDistributor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipLocation.trim() || shippingProductId === null) return;

    try {
      setShipping(true);
      await shipToDistributor(shippingProductId, shipLocation);
      setShippingProductId(null);
      setShipLocation('');
      alert(`Product #${shippingProductId} shipped to distributor at: ${shipLocation}`);
    } catch (error) {
      console.error('Error shipping product to distributor:', error);
    } finally {
      setShipping(false);
    }
  };

  const handleStartShipping = (productId: number) => {
    setShippingProductId(productId);
    setShipLocation('');
  };

  const handleCancelShipping = () => {
    setShippingProductId(null);
    setShipLocation('');
  };

  const canShipToDistributor = (product: any) => {
    return product.currentState === 2; // IN_WAREHOUSE state
  };

  const handleViewDetails = (productId: number) => {
    setSelectedProductId(productId);
    setShowDetailsModal(true);
  };

  // Filter products for warehouse (IN_WAREHOUSE state)
  const warehouseProducts = products.filter(product => 
    product.currentState === 2 // IN_WAREHOUSE state
  );

  const filteredProducts = warehouseProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.id.toString().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Warehouse Shipments</h2>
          <WalletConnection />
        </div>
        <div className="bg-[#1F2937] rounded-lg p-6 text-center">
          <p className="text-gray-400">Please connect your wallet to view warehouse products</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Warehouse Shipments</h2>
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

      {/* Ship to Distributor Form */}
      {shippingProductId && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ship Product #{shippingProductId} to Distributor</h3>
          <p className="text-gray-400 text-sm mb-4">
            This will change the product state from IN_WAREHOUSE to DISTRIBUTED.
          </p>
          <form onSubmit={handleShipToDistributor} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Distributor Location
              </label>
              <input
                type="text"
                value={shipLocation}
                onChange={(e) => setShipLocation(e.target.value)}
                placeholder="Enter distributor location"
                className="w-full px-3 py-2 bg-[#374151] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={shipping || !shipLocation.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {shipping ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Shipping...
                  </>
                ) : (
                  <>
                    <span className="material-icons text-sm mr-2">local_shipping</span>
                    Ship to Distributor
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelShipping}
                disabled={shipping}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Filter */}
      <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
        <span className="material-icons text-gray-400">search</span>
        <input
          type="text"
          placeholder="Search warehouse products..."
          className="bg-transparent text-white w-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products List */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Products in Warehouse (Ready for Distribution)</h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-2">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <span className="material-icons text-6xl text-gray-600 mb-4">warehouse</span>
            <p className="text-gray-400">No products in warehouse found</p>
            <p className="text-gray-500 text-sm mt-2">Products will appear here when they reach IN_WAREHOUSE state</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-[#374151] rounded-lg p-4 border border-gray-600">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-white text-lg font-medium">{product.name}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-300">
                        {getProductStateString(product.currentState)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Product ID: {product.id}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    {canShipToDistributor(product) && (
                      <button 
                        onClick={() => handleStartShipping(product.id)}
                        className="text-purple-400 hover:text-purple-300 mr-3"
                        title="Ship to Distributor"
                      >
                        <span className="material-icons text-sm">local_shipping</span>
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

export default WarehouseShipments;
