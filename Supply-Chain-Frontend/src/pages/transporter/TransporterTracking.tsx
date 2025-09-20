import { useState } from 'react';

interface Vehicle {
  id: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'moving' | 'stopped' | 'loading' | 'unloading';
  currentRoute?: string;
  lastUpdate: string;
  speed: number;
}

const TransporterTracking = () => {
  const [qrCode, setQrCode] = useState('');
  const [vehicles] = useState<Vehicle[]>([
    {
      id: 'TRK-001',
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: 'Highway 101, Mile 45'
      },
      status: 'moving',
      currentRoute: 'RT001',
      lastUpdate: '2025-09-06 10:30',
      speed: 65
    },
    {
      id: 'TRK-002',
      location: {
        lat: 40.7135,
        lng: -74.0066,
        address: 'Distribution Center A'
      },
      status: 'loading',
      lastUpdate: '2025-09-06 10:25',
      speed: 0
    }
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Live Tracking</h2>

      {/* QR Scanner */}
      <div className="bg-[#1F2937] p-6 rounded-lg">
        <div className="flex items-center space-x-4 bg-[#374151] p-3 rounded">
          <span className="material-icons text-gray-400">qr_code_scanner</span>
          <input
            type="text"
            placeholder="Scan shipment QR code"
            className="bg-transparent text-white w-full focus:outline-none"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
          />
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-[#1F2937] p-6 rounded-lg">
        <div className="bg-[#374151] h-96 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <span className="material-icons text-4xl text-gray-400">map</span>
            <p className="text-gray-400 mt-2">Map will be integrated here</p>
          </div>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="bg-[#1F2937] p-6 rounded-lg">
        <h3 className="text-white text-xl mb-4">Vehicle Status</h3>
        <div className="space-y-4">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-[#374151] p-4 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-white font-medium">{vehicle.id}</h4>
                  <p className="text-sm text-gray-400">{vehicle.location.address}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  vehicle.status === 'moving' ? 'bg-green-900 text-green-300' :
                  vehicle.status === 'stopped' ? 'bg-red-900 text-red-300' :
                  'bg-blue-900 text-blue-300'
                }`}>
                  {vehicle.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Speed</p>
                  <p className="text-white">{vehicle.speed} km/h</p>
                </div>
                <div>
                  <p className="text-gray-400">Route</p>
                  <p className="text-white">{vehicle.currentRoute || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Last Update</p>
                  <p className="text-white">{vehicle.lastUpdate}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button className="text-primary hover:text-primary-light">
                  <span className="material-icons">navigation</span>
                </button>
                <button className="text-primary hover:text-primary-light">
                  <span className="material-icons">info</span>
                </button>
                <button className="text-primary hover:text-primary-light">
                  <span className="material-icons">history</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransporterTracking;
