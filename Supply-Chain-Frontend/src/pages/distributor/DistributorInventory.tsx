import { useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
  batchId: string;
  origin: string;
  expiryDate: string;
  temperature: string;
}

const DistributorInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [inventory] = useState<InventoryItem[]>([
    {
      id: 'INV001',
      name: 'Organic Apples',
      category: 'Fruits',
      quantity: 500,
      status: 'in_stock',
      lastUpdated: '2025-09-05',
      batchId: 'B2023110',
      origin: 'Farm A',
      expiryDate: '2025-09-20',
      temperature: '4°C'
    },
    {
      id: 'INV002',
      name: 'Green Tea Leaves',
      category: 'Beverages',
      quantity: 50,
      status: 'low_stock',
      lastUpdated: '2025-09-05',
      batchId: 'B2023111',
      origin: 'Tea Gardens B',
      expiryDate: '2026-03-15',
      temperature: 'Room Temp'
    },
    {
      id: 'INV003',
      name: 'Coffee Beans',
      category: 'Beverages',
      quantity: 0,
      status: 'out_of_stock',
      lastUpdated: '2025-09-04',
      batchId: 'B2023112',
      origin: 'Farm C',
      expiryDate: '2026-02-28',
      temperature: 'Room Temp'
    }
  ]);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.batchId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Inventory Management</h2>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span className="material-icons">add</span>
          <span>New Item</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search inventory..."
            className="bg-transparent text-white w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">category</span>
          <select
            className="bg-transparent text-white w-full focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">filter_list</span>
          <select
            className="bg-transparent text-white w-full focus:outline-none"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory List */}
      <div className="space-y-4">
        {filteredInventory.map(item => (
          <div key={item.id} className="bg-[#1F2937] rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-white text-lg font-medium">{item.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'in_stock' ? 'bg-green-900 text-green-300' :
                    item.status === 'low_stock' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {item.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">ID: {item.id} | Batch: {item.batchId}</p>
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
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">history</span>
                  <span>History</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="text-white">{item.category}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Quantity</p>
                <p className="text-white">{item.quantity} units</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Origin</p>
                <p className="text-white">{item.origin}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Temperature</p>
                <p className="text-white">{item.temperature}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Expiry Date</p>
                <p className="text-white">{item.expiryDate}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <span className="text-gray-400 text-sm">
                Last Updated: {item.lastUpdated}
              </span>
              <button className="text-primary hover:text-primary-light text-sm">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributorInventory;
