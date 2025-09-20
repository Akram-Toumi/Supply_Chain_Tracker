import { useState } from 'react';

interface DistributorStats {
  totalInventory: number;
  activeOrders: number;
  pendingVerifications: number;
  deliveredOrders: number;
}

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
}

interface RecentActivity {
  id: number;
  type: 'order' | 'inventory' | 'verification';
  message: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

const DistributorOverview = () => {
  const [stats] = useState<DistributorStats>({
    totalInventory: 2500,
    activeOrders: 15,
    pendingVerifications: 8,
    deliveredOrders: 156
  });

  const [inventory] = useState<InventoryItem[]>([
    {
      id: 'INV001',
      name: 'Organic Apples',
      quantity: 500,
      status: 'in_stock',
      lastUpdated: '2025-09-05'
    },
    {
      id: 'INV002',
      name: 'Green Tea Leaves',
      quantity: 50,
      status: 'low_stock',
      lastUpdated: '2025-09-05'
    }
  ]);

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: 1,
      type: 'order',
      message: 'New order #ORD001 received for Organic Apples',
      timestamp: '2025-09-06 10:30',
      status: 'success'
    },
    {
      id: 2,
      type: 'verification',
      message: 'Batch #B2023110 verification pending',
      timestamp: '2025-09-06 10:15',
      status: 'warning'
    },
    {
      id: 3,
      type: 'inventory',
      message: 'Green Tea Leaves stock below threshold',
      timestamp: '2025-09-06 10:00',
      status: 'info'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Inventory</p>
              <h3 className="text-2xl font-bold text-white">{stats.totalInventory}</h3>
            </div>
            <div className="p-3 bg-blue-900 rounded-full">
              <span className="material-icons text-blue-300">inventory_2</span>
            </div>
          </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Orders</p>
              <h3 className="text-2xl font-bold text-white">{stats.activeOrders}</h3>
            </div>
            <div className="p-3 bg-green-900 rounded-full">
              <span className="material-icons text-green-300">shopping_cart</span>
            </div>
          </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Verifications</p>
              <h3 className="text-2xl font-bold text-white">{stats.pendingVerifications}</h3>
            </div>
            <div className="p-3 bg-yellow-900 rounded-full">
              <span className="material-icons text-yellow-300">verified</span>
            </div>
          </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Delivered Orders</p>
              <h3 className="text-2xl font-bold text-white">{stats.deliveredOrders}</h3>
            </div>
            <div className="p-3 bg-purple-900 rounded-full">
              <span className="material-icons text-purple-300">local_shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Items */}
        <div className="bg-[#1F2937] rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Low Stock Items</h2>
            <button className="text-primary hover:text-primary-light text-sm">View All →</button>
          </div>
          <div className="space-y-4">
            {inventory
              .filter(item => item.status === 'low_stock')
              .map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-[#374151] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-400">Last updated: {item.lastUpdated}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white">{item.quantity} units</p>
                    <span className="text-yellow-300 text-sm">Low Stock</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1F2937] rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <button className="text-primary hover:text-primary-light text-sm">View All →</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-900 text-green-300' :
                  activity.status === 'warning' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-blue-900 text-blue-300'
                }`}>
                  <span className="material-icons text-sm">
                    {activity.type === 'order' ? 'shopping_cart' :
                     activity.type === 'verification' ? 'verified' :
                     'inventory_2'}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-400 text-xs">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorOverview;
