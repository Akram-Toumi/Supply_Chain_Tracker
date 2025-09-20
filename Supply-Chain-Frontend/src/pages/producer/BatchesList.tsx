import { useState } from 'react';
import type { Batch } from '../../types/producer';

const BatchesList = () => {
  const [batches] = useState<Batch[]>([
    {
      id: 'BAT001',
      productId: 'PRD001',
      productName: 'Organic Coffee Beans',
      quantity: 200,
      productionDate: '2025-09-01',
      expiryDate: '2026-09-01',
      status: 'processing',
      certificates: ['USDA Organic', 'Fair Trade']
    },
    {
      id: 'BAT002',
      productId: 'PRD001',
      productName: 'Organic Coffee Beans',
      quantity: 300,
      productionDate: '2025-08-28',
      expiryDate: '2026-08-28',
      status: 'completed',
      certificates: ['USDA Organic', 'Fair Trade']
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Batches</h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          New Batch
        </button>
      </div>

      <div className="space-y-4">
        {batches.map(batch => (
          <div key={batch.id} className="bg-[#1F2937] p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{batch.productName}</h3>
                <p className="text-gray-400">Batch ID: {batch.id}</p>
              </div>
              <span className={`px-3 py-1 rounded text-sm ${
                batch.status === 'completed' ? 'bg-green-900 text-green-300' :
                batch.status === 'processing' ? 'bg-blue-900 text-blue-300' :
                'bg-yellow-900 text-yellow-300'
              }`}>
                {batch.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Quantity</p>
                <p className="text-white">{batch.quantity} units</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Production Date</p>
                <p className="text-white">{batch.productionDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Expiry Date</p>
                <p className="text-white">{batch.expiryDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Product ID</p>
                <p className="text-white">{batch.productId}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">Certificates</p>
              <div className="flex flex-wrap gap-2">
                {batch.certificates.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-[#2D3748] rounded-full text-white text-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end space-x-3">
              <button className="px-3 py-1 text-primary hover:text-primary-light">
                <span className="material-icons">edit</span>
              </button>
              <button className="px-3 py-1 text-primary hover:text-primary-light">
                <span className="material-icons">qr_code</span>
              </button>
              <button className="px-3 py-1 text-primary hover:text-primary-light">
                <span className="material-icons">share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchesList;
