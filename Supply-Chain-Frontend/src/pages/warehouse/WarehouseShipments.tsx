import { useState } from 'react';

interface Shipment {
  id: string;
  type: 'inbound' | 'outbound';
  status: 'pending' | 'in-transit' | 'delivered' | 'completed';
  supplier: string;
  date: string;
  products: {
    id: string;
    name: string;
    quantity: number;
  }[];
  transporterId: string;
  temperature: string;
  estimatedArrival: string;
}

const WarehouseShipments = () => {
  const [activeTab, setActiveTab] = useState<'inbound' | 'outbound'>('inbound');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [shipments] = useState<Shipment[]>([
    {
      id: 'SH001',
      type: 'inbound',
      status: 'in-transit',
      supplier: 'OrganicFarms Inc.',
      date: '2024-03-15',
      products: [
        {
          id: 'P001',
          name: 'Organic Apples',
          quantity: 1000
        },
        {
          id: 'P002',
          name: 'Fresh Vegetables',
          quantity: 500
        }
      ],
      transporterId: 'TR001',
      temperature: '4°C',
      estimatedArrival: '2024-03-16 14:30'
    },
    {
      id: 'SH002',
      type: 'outbound',
      status: 'pending',
      supplier: 'GreenMart',
      date: '2024-03-16',
      products: [
        {
          id: 'P003',
          name: 'Green Tea Leaves',
          quantity: 300
        }
      ],
      transporterId: 'TR002',
      temperature: '22°C',
      estimatedArrival: '2024-03-17 09:00'
    }
  ]);

  const filteredShipments = shipments.filter(shipment => {
    const matchesType = shipment.type === activeTab;
    const matchesSearch = shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    return matchesType && matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900 text-yellow-300';
      case 'in-transit':
        return 'bg-blue-900 text-blue-300';
      case 'delivered':
        return 'bg-green-900 text-green-300';
      case 'completed':
        return 'bg-gray-900 text-gray-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Shipments Management</h2>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span className="material-icons">add</span>
          <span>New Shipment</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'inbound'
              ? 'bg-primary text-white'
              : 'bg-[#1F2937] text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('inbound')}
        >
          Inbound Shipments
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'outbound'
              ? 'bg-primary text-white'
              : 'bg-[#1F2937] text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('outbound')}
        >
          Outbound Shipments
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search shipments..."
            className="bg-transparent text-white w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">filter_list</span>
          <select
            className="bg-transparent text-white w-full focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments.map(shipment => (
          <div key={shipment.id} className="bg-[#1F2937] rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-white text-lg font-medium">Shipment {shipment.id}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(shipment.status)}`}>
                    {shipment.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{shipment.supplier}</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">edit</span>
                  <span>Edit</span>
                </button>
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">visibility</span>
                  <span>Track</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p className="text-white">{shipment.date}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Temperature</p>
                <p className="text-white">{shipment.temperature}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Transporter ID</p>
                <p className="text-white">{shipment.transporterId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">ETA</p>
                <p className="text-white">{shipment.estimatedArrival}</p>
              </div>
            </div>

            {/* Products */}
            <div className="bg-[#374151] rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Products</h4>
              <div className="space-y-3">
                {shipment.products.map(product => (
                  <div key={product.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-white text-sm">{product.name}</p>
                      <p className="text-gray-400 text-xs">ID: {product.id}</p>
                    </div>
                    <p className="text-white text-sm">{product.quantity} units</p>
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

export default WarehouseShipments;
