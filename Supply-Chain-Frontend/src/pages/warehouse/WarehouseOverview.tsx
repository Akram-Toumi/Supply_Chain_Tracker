import { useState } from 'react';

interface WarehouseStats {
  totalStorage: number;
  occupiedSpace: number;
  incomingShipments: number;
  outgoingShipments: number;
  averageTemperature: string;
  averageHumidity: string;
}

interface StorageZone {
  id: string;
  name: string;
  capacity: number;
  occupied: number;
  temperature: string;
  humidity: string;
  status: 'optimal' | 'warning' | 'alert';
}

interface RecentActivity {
  id: number;
  type: 'storage' | 'shipment' | 'monitoring';
  message: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

const WarehouseOverview = () => {
  const [stats] = useState<WarehouseStats>({
    totalStorage: 10000,
    occupiedSpace: 7500,
    incomingShipments: 12,
    outgoingShipments: 8,
    averageTemperature: '4°C',
    averageHumidity: '65%'
  });

  const [zones] = useState<StorageZone[]>([
    {
      id: 'Z001',
      name: 'Cold Storage A',
      capacity: 2000,
      occupied: 1800,
      temperature: '2°C',
      humidity: '70%',
      status: 'optimal'
    },
    {
      id: 'Z002',
      name: 'Dry Storage B',
      capacity: 3000,
      occupied: 2200,
      temperature: '22°C',
      humidity: '45%',
      status: 'warning'
    },
    {
      id: 'Z003',
      name: 'Fresh Produce C',
      capacity: 2500,
      occupied: 1900,
      temperature: '8°C',
      humidity: '75%',
      status: 'optimal'
    }
  ]);

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: 1,
      type: 'shipment',
      message: 'Incoming shipment #SH001 arrived - Cold Storage A',
      timestamp: '2025-09-06 10:30',
      status: 'success'
    },
    {
      id: 2,
      type: 'monitoring',
      message: 'Temperature alert in Dry Storage B',
      timestamp: '2025-09-06 10:15',
      status: 'warning'
    },
    {
      id: 3,
      type: 'storage',
      message: 'Storage optimization completed for Zone C',
      timestamp: '2025-09-06 10:00',
      status: 'info'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-lg md:col-span-2">
          <h3 className="text-lg font-medium text-white mb-4">Storage Capacity</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="h-4 bg-[#374151] rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(stats.occupiedSpace / stats.totalStorage) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-400">
                  {stats.occupiedSpace} / {stats.totalStorage} m³ Used
                </span>
                <span className="text-primary">
                  {((stats.occupiedSpace / stats.totalStorage) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Environment</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Average Temperature</span>
                <span className="text-white">{stats.averageTemperature}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Average Humidity</span>
                  <span className="text-white">{stats.averageHumidity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Incoming Shipments</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{stats.incomingShipments}</p>
              <p className="text-sm text-gray-400">Expected Today</p>
            </div>
            <div className="p-3 bg-blue-900 rounded-full">
              <span className="material-icons text-blue-300">local_shipping</span>
            </div>
          </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Outgoing Shipments</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{stats.outgoingShipments}</p>
              <p className="text-sm text-gray-400">Scheduled Today</p>
            </div>
            <div className="p-3 bg-green-900 rounded-full">
              <span className="material-icons text-green-300">departure_board</span>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Zones */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">Storage Zones</h3>
          <button className="text-primary hover:text-primary-light text-sm">
            View All Zones →
          </button>
        </div>
        <div className="space-y-4">
          {zones.map(zone => (
            <div key={zone.id} className="bg-[#374151] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-white font-medium">{zone.name}</h4>
                  <p className="text-sm text-gray-400">Zone ID: {zone.id}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  zone.status === 'optimal' ? 'bg-green-900 text-green-300' :
                  zone.status === 'warning' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {zone.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-400">Temperature</p>
                  <p className="text-white">{zone.temperature}</p>
                </div>
                <div>
                  <p className="text-gray-400">Humidity</p>
                  <p className="text-white">{zone.humidity}</p>
                </div>
                <div>
                  <p className="text-gray-400">Capacity</p>
                  <p className="text-white">{zone.capacity} m³</p>
                </div>
                <div>
                  <p className="text-gray-400">Occupied</p>
                  <p className="text-white">{zone.occupied} m³</p>
                </div>
              </div>
              <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    (zone.occupied / zone.capacity) > 0.9 ? 'bg-red-500' :
                    (zone.occupied / zone.capacity) > 0.7 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${(zone.occupied / zone.capacity) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map(activity => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-900 text-green-300' :
                activity.status === 'warning' ? 'bg-yellow-900 text-yellow-300' :
                'bg-blue-900 text-blue-300'
              }`}>
                <span className="material-icons text-sm">
                  {activity.type === 'shipment' ? 'local_shipping' :
                   activity.type === 'monitoring' ? 'thermostat' :
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
  );
};

export default WarehouseOverview;
