import { useState } from 'react';

interface ProductScanHistory {
  id: string;
  name: string;
  date: string;
  isAuthentic: boolean;
  manufacturer: string;
}

interface Analytics {
  totalScans: number;
  authenticProducts: number;
  totalSaved: number;
  recentScans: ProductScanHistory[];
  productCategories: {
    name: string;
    count: number;
  }[];
  manufacturerStats: {
    name: string;
    scans: number;
    authenticity: number;
  }[];
}

const ConsumerOverview = () => {
  const [analytics] = useState<Analytics>({
    totalScans: 48,
    authenticProducts: 46,
    totalSaved: 12,
    recentScans: [
      {
        id: 'PRD001',
        name: 'Organic Coffee Beans',
        date: '2025-09-06',
        isAuthentic: true,
        manufacturer: 'Green Bean Co.'
      },
      {
        id: 'PRD002',
        name: 'Fresh Milk',
        date: '2025-09-05',
        isAuthentic: true,
        manufacturer: 'Dairy Fresh Inc.'
      },
      {
        id: 'PRD003',
        name: 'Organic Honey',
        date: '2025-09-04',
        isAuthentic: false,
        manufacturer: 'Unknown'
      }
    ],
    productCategories: [
      { name: 'Beverages', count: 18 },
      { name: 'Dairy', count: 12 },
      { name: 'Fresh Produce', count: 10 },
      { name: 'Packaged Foods', count: 8 }
    ],
    manufacturerStats: [
      { name: 'Green Bean Co.', scans: 15, authenticity: 100 },
      { name: 'Dairy Fresh Inc.', scans: 12, authenticity: 100 },
      { name: 'Organic Farms Ltd.', scans: 10, authenticity: 90 },
      { name: 'Nature\'s Best', scans: 8, authenticity: 100 }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Scans</p>
              <h3 className="text-2xl font-bold text-white">{analytics.totalScans}</h3>
            </div>
            <span className="material-icons text-primary text-3xl">qr_code_scanner</span>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Authentic Products</p>
              <h3 className="text-2xl font-bold text-white">{analytics.authenticProducts}</h3>
            </div>
            <span className="material-icons text-green-500 text-3xl">verified</span>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Saved Products</p>
              <h3 className="text-2xl font-bold text-white">{analytics.totalSaved}</h3>
            </div>
            <span className="material-icons text-yellow-500 text-3xl">favorite</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Scans */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Recent Scans</h3>
          <div className="space-y-4">
            {analytics.recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`material-icons ${
                    scan.isAuthentic ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {scan.isAuthentic ? 'verified' : 'gpp_bad'}
                  </span>
                  <div>
                    <p className="text-white text-sm">{scan.name}</p>
                    <p className="text-gray-400 text-xs">ID: {scan.id} • {scan.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">{scan.manufacturer}</p>
                  <p className={`text-xs ${scan.isAuthentic ? 'text-green-400' : 'text-red-400'}`}>
                    {scan.isAuthentic ? 'Authentic' : 'Suspicious'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Product Categories</h3>
          <div className="space-y-4">
            {analytics.productCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#374151] rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-primary">category</span>
                  <p className="text-white">{category.name}</p>
                </div>
                <p className="text-white">{category.count} scans</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturer Stats */}
        <div className="bg-[#1F2937] p-6 rounded-lg lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">Top Manufacturers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.manufacturerStats.map((stat, index) => (
              <div key={index} className="bg-[#374151] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-white font-medium">{stat.name}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    stat.authenticity === 100 ? 'bg-green-900 text-green-300' :
                    stat.authenticity >= 90 ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {stat.authenticity}% Authentic
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{stat.scans} total scans</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerOverview;
