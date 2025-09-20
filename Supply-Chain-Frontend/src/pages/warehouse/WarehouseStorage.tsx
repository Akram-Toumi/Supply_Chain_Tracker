import { useState } from 'react';

interface StorageUnit {
  id: string;
  zone: string;
  name: string;
  type: 'cold' | 'dry' | 'fresh';
  capacity: number;
  occupied: number;
  temperature: string;
  humidity: string;
  products: {
    id: string;
    name: string;
    quantity: number;
    expiryDate: string;
  }[];
}

const WarehouseStorage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const [storageUnits] = useState<StorageUnit[]>([
    {
      id: 'SU001',
      zone: 'A',
      name: 'Cold Storage Unit 1',
      type: 'cold',
      capacity: 1000,
      occupied: 750,
      temperature: '2°C',
      humidity: '70%',
      products: [
        {
          id: 'P001',
          name: 'Organic Apples',
          quantity: 500,
          expiryDate: '2025-09-20'
        },
        {
          id: 'P002',
          name: 'Fresh Vegetables',
          quantity: 250,
          expiryDate: '2025-09-15'
        }
      ]
    },
    {
      id: 'SU002',
      zone: 'B',
      name: 'Dry Storage Unit 1',
      type: 'dry',
      capacity: 1500,
      occupied: 1200,
      temperature: '22°C',
      humidity: '45%',
      products: [
        {
          id: 'P003',
          name: 'Green Tea Leaves',
          quantity: 800,
          expiryDate: '2026-03-15'
        },
        {
          id: 'P004',
          name: 'Coffee Beans',
          quantity: 400,
          expiryDate: '2026-02-28'
        }
      ]
    }
  ]);

  const filteredUnits = storageUnits.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         unit.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'all' || unit.zone === selectedZone;
    const matchesType = selectedType === 'all' || unit.type === selectedType;
    return matchesSearch && matchesZone && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Storage Management</h2>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span className="material-icons">add</span>
          <span>New Storage Unit</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search storage units..."
            className="bg-transparent text-white w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">grid_view</span>
          <select
            className="bg-transparent text-white w-full focus:outline-none"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="all">All Zones</option>
            <option value="A">Zone A</option>
            <option value="B">Zone B</option>
            <option value="C">Zone C</option>
          </select>
        </div>
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">category</span>
          <select
            className="bg-transparent text-white w-full focus:outline-none"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'cold' | 'dry' | 'fresh')}
          >
            <option value="all">All Types</option>
            <option value="cold">Cold Storage</option>
            <option value="dry">Dry Storage</option>
            <option value="fresh">Fresh Storage</option>
          </select>
        </div>
      </div>

      {/* Storage Units */}
      <div className="space-y-4">
        {filteredUnits.map(unit => (
          <div key={unit.id} className="bg-[#1F2937] rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-white text-lg font-medium">{unit.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    unit.type === 'cold' ? 'bg-blue-900 text-blue-300' :
                    unit.type === 'dry' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-green-900 text-green-300'
                  }`}>
                    {unit.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">ID: {unit.id} | Zone {unit.zone}</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">edit</span>
                  <span>Edit</span>
                </button>
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">qr_code</span>
                  <span>QR Code</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Temperature</p>
                <p className="text-white">{unit.temperature}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Humidity</p>
                <p className="text-white">{unit.humidity}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Capacity</p>
                <p className="text-white">{unit.capacity} m³</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Occupied</p>
                <p className="text-white">{unit.occupied} m³</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Space Utilization</span>
                <span className="text-white">{((unit.occupied / unit.capacity) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-[#374151] rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    (unit.occupied / unit.capacity) > 0.9 ? 'bg-red-500' :
                    (unit.occupied / unit.capacity) > 0.7 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${(unit.occupied / unit.capacity) * 100}%` }}
                />
              </div>
            </div>

            {/* Stored Products */}
            <div className="bg-[#374151] rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Stored Products</h4>
              <div className="space-y-3">
                {unit.products.map(product => (
                  <div key={product.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-white text-sm">{product.name}</p>
                      <p className="text-gray-400 text-xs">ID: {product.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm">{product.quantity} units</p>
                      <p className="text-gray-400 text-xs">Exp: {product.expiryDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-gray-700">
              <button className="text-primary hover:text-primary-light text-sm">
                View Full Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehouseStorage;
