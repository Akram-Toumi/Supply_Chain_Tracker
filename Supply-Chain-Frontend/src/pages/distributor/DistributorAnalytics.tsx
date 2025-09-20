import { useState } from 'react';

interface AnalyticsData {
  type: string;
  data: {
    label: string;
    value: number;
  }[];
}

const DistributorAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  const [analytics] = useState<{
    inventory: AnalyticsData;
    orders: AnalyticsData;
    revenue: AnalyticsData;
    verifications: AnalyticsData;
  }>({
    inventory: {
      type: 'inventory',
      data: [
        { label: 'In Stock', value: 65 },
        { label: 'Low Stock', value: 25 },
        { label: 'Out of Stock', value: 10 }
      ]
    },
    orders: {
      type: 'orders',
      data: [
        { label: 'Delivered', value: 156 },
        { label: 'In Transit', value: 42 },
        { label: 'Processing', value: 28 },
        { label: 'Pending', value: 15 }
      ]
    },
    revenue: {
      type: 'revenue',
      data: [
        { label: 'Fresh Produce', value: 45000 },
        { label: 'Beverages', value: 32000 },
        { label: 'Dairy', value: 28000 },
        { label: 'Others', value: 15000 }
      ]
    },
    verifications: {
      type: 'verifications',
      data: [
        { label: 'Verified', value: 85 },
        { label: 'Pending', value: 12 },
        { label: 'Rejected', value: 3 }
      ]
    }
  });

  const [performance] = useState([
    {
      metric: 'Total Revenue',
      value: '$120,000',
      change: '+12.5%',
      trend: 'up'
    },
    {
      metric: 'Order Fulfillment Rate',
      value: '94.8%',
      change: '+2.3%',
      trend: 'up'
    },
    {
      metric: 'Average Order Value',
      value: '$850',
      change: '-3.1%',
      trend: 'down'
    },
    {
      metric: 'Product Verification Rate',
      value: '98.2%',
      change: '+1.5%',
      trend: 'up'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
        <div className="flex items-center space-x-4 bg-[#1F2937] p-2 rounded-lg">
          <button
            className={`px-3 py-1 rounded ${
              timeRange === 'week' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timeRange === 'month' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timeRange === 'year' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performance.map((metric, index) => (
          <div key={index} className="bg-[#1F2937] p-6 rounded-lg">
            <p className="text-gray-400 text-sm">{metric.metric}</p>
            <div className="flex items-baseline space-x-2 mt-2">
              <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
              <span className={`text-sm ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory Distribution */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-white font-medium mb-4">Inventory Distribution</h3>
          <div className="space-y-4">
            {analytics.inventory.data.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white">{item.value}%</span>
                </div>
                <div className="h-2 bg-[#374151] rounded">
                  <div
                    className={`h-full rounded ${
                      item.label === 'In Stock' ? 'bg-green-500' :
                      item.label === 'Low Stock' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-white font-medium mb-4">Order Status Distribution</h3>
          <div className="space-y-4">
            {analytics.orders.data.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white">{item.value}</span>
                </div>
                <div className="h-2 bg-[#374151] rounded">
                  <div
                    className={`h-full rounded ${
                      item.label === 'Delivered' ? 'bg-green-500' :
                      item.label === 'In Transit' ? 'bg-blue-500' :
                      item.label === 'Processing' ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${(item.value / 200) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-white font-medium mb-4">Revenue by Category</h3>
          <div className="space-y-4">
            {analytics.revenue.data.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white">${item.value.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-[#374151] rounded">
                  <div
                    className={`h-full rounded bg-primary`}
                    style={{ width: `${(item.value / 45000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Stats */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-white font-medium mb-4">Verification Statistics</h3>
          <div className="space-y-4">
            {analytics.verifications.data.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white">{item.value}</span>
                </div>
                <div className="h-2 bg-[#374151] rounded">
                  <div
                    className={`h-full rounded ${
                      item.label === 'Verified' ? 'bg-green-500' :
                      item.label === 'Pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(item.value / 85) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorAnalytics;
