import { useState } from 'react';

interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  deliveryDate: string | null;
  customer: string;
  location: string;
  total: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

const DistributorOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [orders] = useState<Order[]>([
    {
      id: 'ORD001',
      productId: 'INV001',
      productName: 'Organic Apples',
      quantity: 200,
      status: 'processing',
      orderDate: '2025-09-05',
      deliveryDate: '2025-09-07',
      customer: 'Fresh Foods Market',
      location: 'Store #123, Main Street',
      total: 1200,
      paymentStatus: 'paid'
    },
    {
      id: 'ORD002',
      productId: 'INV002',
      productName: 'Green Tea Leaves',
      quantity: 100,
      status: 'pending',
      orderDate: '2025-09-05',
      deliveryDate: null,
      customer: 'Green Grocers',
      location: 'Store #45, Park Avenue',
      total: 800,
      paymentStatus: 'pending'
    },
    {
      id: 'ORD003',
      productId: 'INV001',
      productName: 'Organic Apples',
      quantity: 150,
      status: 'shipped',
      orderDate: '2025-09-04',
      deliveryDate: '2025-09-06',
      customer: 'Wellness Store',
      location: 'Store #67, Lake View',
      total: 900,
      paymentStatus: 'paid'
    }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Orders Management</h2>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span className="material-icons">add</span>
          <span>New Order</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-transparent text-white w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">filter_list</span>
          <select
            className="bg-transparent text-white w-full focus:outline-none"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">sort</span>
          <select className="bg-transparent text-white w-full focus:outline-none">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-[#1F2937] rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-white text-lg font-medium">Order #{order.id}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'delivered' ? 'bg-green-900 text-green-300' :
                    order.status === 'shipped' ? 'bg-blue-900 text-blue-300' :
                    order.status === 'processing' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-purple-900 text-purple-300'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.paymentStatus === 'paid' ? 'bg-green-900 text-green-300' :
                    order.paymentStatus === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{order.orderDate}</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">edit</span>
                  <span>Edit</span>
                </button>
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">print</span>
                  <span>Print</span>
                </button>
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">more_vert</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Product</p>
                <p className="text-white">{order.productName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Quantity</p>
                <p className="text-white">{order.quantity} units</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="text-white">${order.total}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Delivery Date</p>
                <p className="text-white">{order.deliveryDate || 'Not set'}</p>
              </div>
            </div>

            <div className="bg-[#374151] p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Customer</p>
                  <p className="text-white">{order.customer}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Delivery Location</p>
                  <p className="text-white">{order.location}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">receipt</span>
                  <span>Invoice</span>
                </button>
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">local_shipping</span>
                  <span>Track</span>
                </button>
              </div>
              <button className="text-primary hover:text-primary-light">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributorOrders;
