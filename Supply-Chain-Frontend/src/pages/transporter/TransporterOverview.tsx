import { useState } from 'react';

interface Route {
  id: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in_progress' | 'completed';
  startTime: string;
  estimatedArrival: string;
  distance: string;
  shipmentType: string;
  temperature: string;
}

const TransporterOverview = () => {
  const [activeRoutes] = useState<Route[]>([
    {
      id: 'RT001',
      origin: 'Farm A',
      destination: 'Warehouse B',
      status: 'in_progress',
      startTime: '2025-09-06 08:00',
      estimatedArrival: '2025-09-06 14:00',
      distance: '120km',
      shipmentType: 'Refrigerated',
      temperature: '4°C'
    },
    {
      id: 'RT002',
      origin: 'Warehouse C',
      destination: 'Distribution Center',
      status: 'pending',
      startTime: '2025-09-06 15:00',
      estimatedArrival: '2025-09-06 18:00',
      distance: '75km',
      shipmentType: 'Standard',
      temperature: 'N/A'
    }
  ]);

  const [recentUpdates] = useState([
    {
      id: 1,
      timestamp: '2025-09-06 10:30',
      message: 'Temperature check completed - All within range',
      type: 'info',
      icon: 'thermostat'
    },
    {
      id: 2,
      timestamp: '2025-09-06 10:15',
      message: 'Route RT001 - 40% complete',
      type: 'success',
      icon: 'route'
    },
    {
      id: 3,
      timestamp: '2025-09-06 09:45',
      message: 'Traffic delay on Highway 101 - ETA updated',
      type: 'warning',
      icon: 'warning'
    }
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Active Routes</h3>
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold text-white">2</p>
            <p className="text-green-400 text-sm mb-1">On Schedule</p>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Total Distance Today</h3>
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold text-white">195</p>
            <p className="text-white text-sm mb-1">km</p>
          </div>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Temperature Compliance</h3>
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold text-green-500">100%</p>
            <p className="text-green-400 text-sm mb-1">All Normal</p>
          </div>
        </div>
      </div>

      {/* Active Routes Overview */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-white text-xl mb-4">Active Routes</h3>
        <div className="space-y-4">
          {activeRoutes.map(route => (
            <div key={route.id} className="bg-[#374151] rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-white font-medium">Route {route.id}</h4>
                  <p className="text-sm text-gray-400">{route.origin} → {route.destination}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  route.status === 'completed' ? 'bg-green-900 text-green-300' :
                  route.status === 'in_progress' ? 'bg-blue-900 text-blue-300' :
                  'bg-yellow-900 text-yellow-300'
                }`}>
                  {route.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">ETA</p>
                  <p className="text-white">{route.estimatedArrival}</p>
                </div>
                <div>
                  <p className="text-gray-400">Distance</p>
                  <p className="text-white">{route.distance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-white text-xl mb-4">Recent Updates</h3>
        <div className="space-y-4">
          {recentUpdates.map(update => (
            <div key={update.id} className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${
                update.type === 'success' ? 'bg-green-900 text-green-300' :
                update.type === 'warning' ? 'bg-yellow-900 text-yellow-300' :
                'bg-blue-900 text-blue-300'
              }`}>
                <span className="material-icons text-sm">{update.icon}</span>
              </div>
              <div>
                <p className="text-white text-sm">{update.message}</p>
                <p className="text-gray-400 text-xs">{update.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransporterOverview;
