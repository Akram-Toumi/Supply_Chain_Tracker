import { useState } from 'react';

interface Shipment {
  id: string;
  productName: string;
  quantity: number;
  origin: string;
  destination: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
  temperature: string;
  departureTime: string;
  estimatedArrival: string;
  assignedDriver: string;
  vehicleId: string;
}

const TransporterShipments = () => {
  const [shipments] = useState<Shipment[]>([
    {
      id: 'SH001',
      productName: 'Organic Apples',
      quantity: 500,
      origin: 'Farm A',
      destination: 'Warehouse B',
      status: 'in_transit',
      temperature: '4°C',
      departureTime: '2025-09-06 08:00',
      estimatedArrival: '2025-09-06 14:00',
      assignedDriver: 'John Smith',
      vehicleId: 'TRK-001'
    },
    {
      id: 'SH002',
      productName: 'Fresh Vegetables',
      quantity: 300,
      origin: 'Farm C',
      destination: 'Distribution Center',
      status: 'pending',
      temperature: '4°C',
      departureTime: '2025-09-06 15:00',
      estimatedArrival: '2025-09-06 18:00',
      assignedDriver: 'Maria Garcia',
      vehicleId: 'TRK-003'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Shipments</h2>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span className="material-icons">add</span>
          <span>New Shipment</span>
        </button>
      </div>

      <div className="space-y-4">
        {shipments.map(shipment => (
          <div key={shipment.id} className="bg-[#1F2937] rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-white text-lg font-medium">{shipment.productName}</h3>
                <p className="text-gray-400 text-sm">Shipment ID: {shipment.id}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                shipment.status === 'delivered' ? 'bg-green-900 text-green-300' :
                shipment.status === 'in_transit' ? 'bg-blue-900 text-blue-300' :
                shipment.status === 'picked_up' ? 'bg-yellow-900 text-yellow-300' :
                'bg-purple-900 text-purple-300'
              }`}>
                {shipment.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Origin</p>
                <p className="text-white">{shipment.origin}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Destination</p>
                <p className="text-white">{shipment.destination}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Departure</p>
                <p className="text-white">{shipment.departureTime}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">ETA</p>
                <p className="text-white">{shipment.estimatedArrival}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-400 text-sm">Quantity</p>
                <p className="text-white">{shipment.quantity} units</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Temperature</p>
                <p className="text-white">{shipment.temperature}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Driver</p>
                <p className="text-white">{shipment.assignedDriver}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Vehicle</p>
                <p className="text-white">{shipment.vehicleId}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end space-x-4">
              <button className="text-white hover:text-primary flex items-center space-x-1">
                <span className="material-icons text-sm">qr_code_2</span>
                <span>QR Code</span>
              </button>
              <button className="text-white hover:text-primary flex items-center space-x-1">
                <span className="material-icons text-sm">edit</span>
                <span>Edit</span>
              </button>
              <button className="text-white hover:text-primary flex items-center space-x-1">
                <span className="material-icons text-sm">description</span>
                <span>Documents</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransporterShipments;
