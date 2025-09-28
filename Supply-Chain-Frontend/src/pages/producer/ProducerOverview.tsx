import { useState, useEffect } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';

interface ProducerStats {
  totalProducts: number;
  productsProduced: number;
  productsShipped: number;
  productsInWarehouse: number;
  recentActivity: {
    id: number;
    name: string;
    state: string;
    timestamp: string;
    action: string;
  }[];
}

const ProducerOverview = () => {
  const { 
    isConnected, 
    products, 
    loading, 
    error,
    refreshProducts,
    getAllProducerTransactions,
    getProductStateString,
    formatTimestamp
  } = useBlockchain();

  const [stats, setStats] = useState<ProducerStats>({
    totalProducts: 0,
    productsProduced: 0,
    productsShipped: 0,
    productsInWarehouse: 0,
    recentActivity: []
  });

  useEffect(() => {
    if (products.length > 0) {
      calculateStats();
    }
  }, [products]);

  const calculateStats = () => {
    const totalProducts = products.length;
    const productsProduced = products.filter(p => p.currentState === 0).length;
    const productsShipped = products.filter(p => p.currentState >= 1).length;
    const productsInWarehouse = products.filter(p => p.currentState === 2).length;

    // Get recent activity (last 5 products with their latest updates)
    const recentActivity = products
      .sort((a, b) => b.lastUpdated - a.lastUpdated)
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        name: product.name,
        state: getProductStateString(product.currentState),
        timestamp: formatTimestamp(product.lastUpdated),
        action: getActionFromState(product.currentState)
      }));

    setStats({
      totalProducts,
      productsProduced,
      productsShipped,
      productsInWarehouse,
      recentActivity
    });
  };

  const getActionFromState = (state: number): string => {
    switch (state) {
      case 0: return 'Produced';
      case 1: return 'Shipped to Transporter';
      case 2: return 'Delivered to Warehouse';
      case 3: return 'Shipped to Distributor';
      case 4: return 'In Store';
      case 5: return 'Sold';
      default: return 'Unknown';
    }
  };

  const downloadTransactions = async () => {
    try {
      const transactions = await getAllProducerTransactions();
      
      // Create CSV content
      const csvContent = [
        'Product ID,From State,To State,Actor,Timestamp,Location,Date',
        ...transactions.map(tx => [
          tx.productId,
          getProductStateString(tx.fromState),
          getProductStateString(tx.toState),
          tx.actor,
          tx.timestamp,
          tx.location,
          formatTimestamp(tx.timestamp)
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `producer_transactions_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading transactions:', error);
      alert('Failed to download transactions. Please try again.');
    }
  };

  const getStateColor = (state: number) => {
    switch (state) {
      case 0: return 'bg-blue-100 text-blue-800';
      case 1: return 'bg-yellow-100 text-yellow-800';
      case 2: return 'bg-purple-100 text-purple-800';
      case 3: return 'bg-indigo-100 text-indigo-800';
      case 4: return 'bg-green-100 text-green-800';
      case 5: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Producer Overview</h1>
          <WalletConnection />
        </div>
        <div className="bg-[#1F2937] rounded-lg p-6 text-center">
          <p className="text-gray-400">Please connect your wallet to view producer statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Producer Overview</h1>
        <div className="flex space-x-4">
          <button
            onClick={downloadTransactions}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
          >
            <span className="material-icons text-sm mr-2">download</span>
            Download Transactions
          </button>
          <button
            onClick={refreshProducts}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <span className="material-icons text-sm mr-2">refresh</span>
            Refresh Data
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Total Products</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
              <p className="text-sm text-gray-400">Created</p>
            </div>
            <div className="p-3 bg-blue-900 rounded-full">
              <span className="material-icons text-blue-300">inventory</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Produced</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{stats.productsProduced}</p>
              <p className="text-sm text-gray-400">Ready to Ship</p>
            </div>
            <div className="p-3 bg-green-900 rounded-full">
              <span className="material-icons text-green-300">factory</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Shipped</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{stats.productsShipped}</p>
              <p className="text-sm text-gray-400">In Supply Chain</p>
            </div>
            <div className="p-3 bg-yellow-900 rounded-full">
              <span className="material-icons text-yellow-300">local_shipping</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">In Warehouse</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{stats.productsInWarehouse}</p>
              <p className="text-sm text-gray-400">Stored</p>
            </div>
            <div className="p-3 bg-purple-900 rounded-full">
              <span className="material-icons text-purple-300">warehouse</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Flow Chart */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-6">Production Flow</h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-2">
              <span className="material-icons text-white">factory</span>
            </div>
            <p className="text-sm text-gray-400">Produced</p>
            <p className="text-white font-semibold">{stats.productsProduced}</p>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-600 mx-4"></div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mb-2">
              <span className="material-icons text-white">local_shipping</span>
            </div>
            <p className="text-sm text-gray-400">Shipped</p>
            <p className="text-white font-semibold">{stats.productsShipped}</p>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-600 mx-4"></div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2">
              <span className="material-icons text-white">warehouse</span>
            </div>
            <p className="text-sm text-gray-400">In Warehouse</p>
            <p className="text-white font-semibold">{stats.productsInWarehouse}</p>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-600 mx-4"></div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-2">
              <span className="material-icons text-white">store</span>
            </div>
            <p className="text-sm text-gray-400">Distributed</p>
            <p className="text-white font-semibold">{products.filter(p => p.currentState >= 3).length}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-2">Loading activity...</p>
          </div>
        ) : stats.recentActivity.length === 0 ? (
          <div className="text-center py-8">
            <span className="material-icons text-6xl text-gray-600 mb-4">factory</span>
            <p className="text-gray-400">No recent activity found</p>
            <p className="text-gray-500 text-sm mt-2">Create your first product to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-[#374151] rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-900 rounded-full">
                    <span className="material-icons text-green-300 text-sm">factory</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Product #{activity.id}: {activity.name}</p>
                    <p className="text-gray-400 text-sm">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStateColor(products.find(p => p.id === activity.id)?.currentState || 0)}`}>
                    {activity.state}
                  </span>
                  <p className="text-gray-400 text-xs mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/producer/products" 
            className="p-4 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="material-icons text-green-400">add_circle</span>
              <div>
                <p className="text-white font-medium">Create Product</p>
                <p className="text-gray-400 text-sm">Add new product to supply chain</p>
              </div>
            </div>
          </a>
          
          <a 
            href="/producer/products" 
            className="p-4 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="material-icons text-blue-400">inventory_2</span>
              <div>
                <p className="text-white font-medium">Manage Products</p>
                <p className="text-gray-400 text-sm">View and ship your products</p>
              </div>
            </div>
          </a>
          
          <a 
            href="/producer/download" 
            className="p-4 bg-[#374151] rounded-lg hover:bg-[#4B5563] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="material-icons text-green-400">download</span>
              <div>
                <p className="text-white font-medium">Download Transactions</p>
                <p className="text-gray-400 text-sm">Export transaction data to CSV</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProducerOverview;
