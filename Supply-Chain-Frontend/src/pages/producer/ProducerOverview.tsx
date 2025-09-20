import { useState } from 'react';
import type { Analytics, Transaction } from '../../types/producer';

const ProducerOverview = () => {
  const [analytics] = useState<Analytics>({
    totalProducts: 3,
    activeBatches: 2,
    totalCertificates: 2,
    recentTransactions: [
      {
        id: 'TRX001',
        type: 'production',
        description: 'New batch of Organic Coffee Beans',
        date: '2025-09-05',
        status: 'completed'
      },
      {
        id: 'TRX002',
        type: 'shipment',
        description: 'Shipment to Warehouse A',
        date: '2025-09-04',
        status: 'pending'
      }
    ]
  });

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Total Products</h3>
          <p className="text-2xl font-bold text-white">{analytics.totalProducts}</p>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Active Batches</h3>
          <p className="text-2xl font-bold text-white">{analytics.activeBatches}</p>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Certifications</h3>
          <p className="text-2xl font-bold text-white">{analytics.totalCertificates}</p>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Success Rate</h3>
          <p className="text-2xl font-bold text-green-500">98%</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
        <div className="space-y-4">
          {analytics.recentTransactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between bg-[#2D3748] p-4 rounded">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded ${
                  transaction.type === 'production' ? 'bg-blue-900 text-blue-300' :
                  transaction.type === 'shipment' ? 'bg-purple-900 text-purple-300' :
                  'bg-green-900 text-green-300'
                }`}>
                  <span className="material-icons">
                    {transaction.type === 'production' ? 'inventory' :
                     transaction.type === 'shipment' ? 'local_shipping' :
                     'verified'}
                  </span>
                </div>
                <div>
                  <p className="text-white">{transaction.description}</p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${
                transaction.status === 'completed' ? 'bg-green-900 text-green-300' :
                transaction.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {transaction.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProducerOverview;
