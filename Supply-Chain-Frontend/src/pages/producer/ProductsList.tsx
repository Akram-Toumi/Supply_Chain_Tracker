import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import ProductDetailsModal from '../../components/ProductDetailsModal';
import BlockchainStatus from '../../components/BlockchainStatus';

const ProductsList = () => {
  const { 
    isConnected, 
    products, 
    loading, 
    error, 
    createProduct, 
    shipProduct,
    getProductStateString, 
    formatTimestamp,
    refreshProducts
  } = useBlockchain();
  
  const [newProductName, setNewProductName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [shippingProductId, setShippingProductId] = useState<number | null>(null);
  const [shipLocation, setShipLocation] = useState('');
  const [shipping, setShipping] = useState(false);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    try {
      setCreating(true);
      await createProduct(newProductName.trim());
      setNewProductName('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setCreating(false);
    }
  };

  const getStatusColor = (state: number) => {
    switch (state) {
      case 0: // PRODUCED
        return 'bg-blue-900 text-blue-300';
      case 1: // IN_TRANSIT
        return 'bg-yellow-900 text-yellow-300';
      case 2: // IN_WAREHOUSE
        return 'bg-orange-900 text-orange-300';
      case 3: // DISTRIBUTED
        return 'bg-green-900 text-green-300';
      case 4: // IN_STORE
        return 'bg-purple-900 text-purple-300';
      case 5: // SOLD
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const handleViewDetails = (productId: number) => {
    setSelectedProductId(productId);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedProductId(null);
  };

  const handleShipProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipLocation.trim() || shippingProductId === null) return;

    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setShipping(true);
      await shipProduct(shippingProductId, shipLocation);
      setShippingProductId(null);
      setShipLocation('');
    } catch (error) {
      console.error('Error shipping product:', error);
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

  const canShipProduct = (product: any) => {
    return product.currentState === 0; // PRODUCED state
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Products</h2>
          <WalletConnection />
        </div>
        
        <div className="bg-[#1F2937] rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-lg">Connect your wallet to view and manage products</p>
            <p className="text-sm mt-2">You need to connect your MetaMask wallet to interact with the blockchain</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <div className="flex items-center space-x-4">
          <WalletConnection />
          <button 
            onClick={refreshProducts}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh Products'}
          </button>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Product
          </button>
        </div>
      </div>

      <BlockchainStatus />

      {showCreateForm && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Create New Product</h3>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={creating || !newProductName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {shippingProductId && (
        <div className="bg-[#1F2937] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ship Product #{shippingProductId}</h3>
          <form onSubmit={handleShipProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Destination Location
              </label>
              <input
                type="text"
                value={shipLocation}
                onChange={(e) => setShipLocation(e.target.value)}
                placeholder="Enter destination location"
                className="w-full px-3 py-2 bg-[#374151] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={shipping || !shipLocation.trim() || !isConnected}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {shipping ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Shipping...
                  </>
                ) : (
                  <>
                    <span className="material-icons text-sm mr-2">local_shipping</span>
                    Ship Product
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

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-[#1F2937] rounded-lg p-6">
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">
                      No products found. Create your first product to get started.
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
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
                        {canShipProduct(product) && (
                          <button 
                            onClick={() => handleStartShipping(product.id)}
                            disabled={!isConnected}
                            className={`mr-3 ${
                              !isConnected 
                                ? 'text-gray-500 cursor-not-allowed' 
                                : 'text-orange-400 hover:text-orange-300'
                            }`}
                            title={!isConnected ? "Connect wallet to ship" : "Ship Product"}
                          >
                            <span className="material-icons text-sm">local_shipping</span>
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

export default ProductsList;
