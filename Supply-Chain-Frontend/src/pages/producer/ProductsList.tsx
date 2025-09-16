import { useState } from 'react';
import type { Product } from '../../types/producer';

const ProductsList = () => {
  const [products] = useState<Product[]>([
    {
      id: 'PRD001',
      name: 'Organic Coffee Beans',
      category: 'Beverages',
      quantity: 500,
      status: 'available',
      lastUpdated: '2025-09-05'
    },
    {
      id: 'PRD002',
      name: 'Premium Tea Leaves',
      category: 'Beverages',
      quantity: 100,
      status: 'low',
      lastUpdated: '2025-09-04'
    },
    {
      id: 'PRD003',
      name: 'Honey',
      category: 'Sweeteners',
      quantity: 0,
      status: 'out_of_stock',
      lastUpdated: '2025-09-03'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add Product
        </button>
      </div>

      <div className="bg-[#1F2937] rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="text-left py-3">Name</th>
                <th className="text-left py-3">Category</th>
                <th className="text-left py-3">Quantity</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-700">
                  <td className="py-3 text-white">{product.name}</td>
                  <td className="py-3 text-white">{product.category}</td>
                  <td className="py-3 text-white">{product.quantity}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      product.status === 'available' ? 'bg-green-900 text-green-300' :
                      product.status === 'low' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {product.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-primary hover:text-primary-light mr-3">
                      <span className="material-icons">edit</span>
                    </button>
                    <button className="text-red-500 hover:text-red-400">
                      <span className="material-icons">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
