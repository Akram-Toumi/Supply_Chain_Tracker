import { useState, useEffect } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';

const DistributorOverview = () => {
  const { 
    isConnected, 
    products, 
    loading, 
    error, 
    getUserRoles,
    getProductStateString,
    formatTimestamp
  } = useBlockchain();

  const [userRoles, setUserRoles] = useState<{
    isProducer: boolean;
    isCarrier: boolean;
    isWarehouse: boolean;
    isDistributor: boolean;
    isRetailer: boolean;
  } | null>(null);

  // Load user roles on component mount
  useEffect(() => {
    const loadUserRoles = async () => {
      if (isConnected) {
        try {
          const roles = await getUserRoles();
          setUserRoles(roles);
        } catch (error) {
          console.error('Error loading user roles:', error);
        }
      }
    };

    loadUserRoles();
  }, [isConnected, getUserRoles]);

  // Filter products for distributor (DISTRIBUTED state)
  const distributorProducts = products.filter(product => 
    product.currentState === 3 // DISTRIBUTED state
  );

  // Calculate real statistics
  const stats = {
    totalDistributedProducts: distributorProducts.length,
    productsInDistributedState: distributorProducts.filter(p => p.currentState === 3).length,
    totalProducts: products.length,
    userIsDistributor: userRoles?.isDistributor || false
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Distributor Overview</h2>
          <WalletConnection />
        </div>
        <div className="bg-[#1F2937] rounded-lg p-6 text-center">
          <p className="text-gray-400">Please connect your wallet to view distributor information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Distributor Overview</h2>
        <WalletConnection />
      </div>

      <BlockchainStatus />

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* User Role Status */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Account Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <span className={`material-icons ${userRoles?.isDistributor ? 'text-green-400' : 'text-red-400'}`}>
              {userRoles?.isDistributor ? 'verified' : 'cancel'}
            </span>
            <div>
              <p className="text-white font-medium">Distributor Role</p>
              <p className="text-gray-400 text-sm">
                {userRoles?.isDistributor ? 'Authorized' : 'Not Authorized'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="material-icons text-blue-400">account_balance_wallet</span>
            <div>
              <p className="text-white font-medium">Wallet Connected</p>
              <p className="text-gray-400 text-sm">Ready for transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Distributed Products</p>
              <h3 className="text-2xl font-bold text-white">{stats.totalDistributedProducts}</h3>
            </div>
            <div className="p-3 bg-purple-900 rounded-full">
              <span className="material-icons text-purple-300">inventory_2</span>
            </div>
          </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <h3 className="text-2xl font-bold text-white">{stats.totalProducts}</h3>
            </div>
            <div className="p-3 bg-blue-900 rounded-full">
              <span className="material-icons text-blue-300">shopping_cart</span>
            </div>
          </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ready for Distribution</p>
              <h3 className="text-2xl font-bold text-white">{stats.productsInDistributedState}</h3>
            </div>
            <div className="p-3 bg-green-900 rounded-full">
              <span className="material-icons text-green-300">local_shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Distributed Products */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Distributed Products</h3>
          <a 
            href="/distributor/inventory" 
            className="text-primary hover:text-primary-light text-sm"
          >
            View All →
          </a>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-2">Loading products...</p>
          </div>
        ) : distributorProducts.length === 0 ? (
          <div className="text-center py-8">
            <span className="material-icons text-6xl text-gray-600 mb-4">inventory_2</span>
            <p className="text-gray-400">No distributed products found</p>
            <p className="text-gray-500 text-sm mt-2">Products will appear here when they reach DISTRIBUTED state</p>
          </div>
        ) : (
          <div className="space-y-4">
            {distributorProducts.slice(0, 3).map(product => (
              <div key={product.id} className="bg-[#374151] rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{product.name}</h4>
                    <p className="text-gray-400 text-sm">Product ID: {product.id}</p>
                    <p className="text-gray-400 text-sm">
                      Last Updated: {product.lastUpdated ? formatTimestamp(product.lastUpdated) : 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-300">
                      {getProductStateString(product.currentState)}
                    </span>
                    <p className="text-gray-400 text-sm mt-1">
                      Owner: {product.currentOwner ? `${product.currentOwner.slice(0, 6)}...${product.currentOwner.slice(-4)}` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="/distributor/inventory"
            className="flex items-center space-x-3 p-4 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors"
          >
            <span className="material-icons text-blue-400">inventory_2</span>
            <div>
              <p className="text-white font-medium">Manage Inventory</p>
              <p className="text-gray-400 text-sm">View and manage distributed products</p>
            </div>
          </a>
          <div className="flex items-center space-x-3 p-4 bg-[#374151] rounded-lg">
            <span className="material-icons text-green-400">info</span>
            <div>
              <p className="text-white font-medium">Blockchain Status</p>
              <p className="text-gray-400 text-sm">Real-time blockchain integration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorOverview;
