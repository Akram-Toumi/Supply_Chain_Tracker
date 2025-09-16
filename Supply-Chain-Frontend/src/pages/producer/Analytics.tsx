import { useState } from 'react';

interface AnalyticsData {
  productionVolume: number[];
  labels: string[];
  successRate: number;
  qualityScore: number;
  carbonFootprint: number;
}

const Analytics = () => {
  const [analyticsData] = useState<AnalyticsData>({
    productionVolume: [150, 220, 180, 240, 190, 280, 300],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    successRate: 98,
    qualityScore: 4.8,
    carbonFootprint: 12.5
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Success Rate</h3>
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold text-green-500">{analyticsData.successRate}%</p>
            <p className="text-green-400 text-sm mb-1">+2.5%</p>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Quality Score</h3>
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold text-white">{analyticsData.qualityScore}</p>
            <p className="text-green-400 text-sm mb-1">+0.3</p>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Carbon Footprint</h3>
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold text-white">{analyticsData.carbonFootprint}</p>
            <p className="text-sm text-white mb-1">CO₂e</p>
            <p className="text-red-400 text-sm mb-1">+1.2</p>
          </div>
        </div>
      </div>

      {/* Production Volume Chart */}
      <div className="bg-[#1F2937] p-6 rounded-lg">
        <h3 className="text-white font-semibold mb-4">Production Volume</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {analyticsData.productionVolume.map((volume, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-green-500 rounded-t"
                style={{ height: `${(volume / 300) * 100}%` }}
              ></div>
              <p className="text-gray-400 text-sm mt-2">{analyticsData.labels[index]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-white font-semibold mb-4">Quality Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Product Quality</span>
                <span className="text-white">96%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded">
                <div className="h-full bg-green-500 rounded" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Packaging Quality</span>
                <span className="text-white">92%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded">
                <div className="h-full bg-green-500 rounded" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Storage Conditions</span>
                <span className="text-white">98%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded">
                <div className="h-full bg-green-500 rounded" style={{ width: '98%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-white font-semibold mb-4">Sustainability Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Energy Efficiency</span>
                <span className="text-white">88%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded">
                <div className="h-full bg-green-500 rounded" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Water Usage</span>
                <span className="text-white">85%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded">
                <div className="h-full bg-green-500 rounded" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Waste Reduction</span>
                <span className="text-white">90%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded">
                <div className="h-full bg-green-500 rounded" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
