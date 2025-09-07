import { useState } from 'react';
import type { Certificate } from '../../types/producer';

const CertificationsList = () => {
  const [certificates] = useState<Certificate[]>([
    {
      id: 'CERT001',
      name: 'USDA Organic Certification',
      issuedBy: 'USDA',
      issuedDate: '2025-01-01',
      expiryDate: '2026-01-01',
      status: 'active'
    },
    {
      id: 'CERT002',
      name: 'Fair Trade Certification',
      issuedBy: 'Fair Trade USA',
      issuedDate: '2025-03-15',
      expiryDate: '2025-10-15',
      status: 'expiring'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Certifications</h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add Certificate
        </button>
      </div>

      <div className="grid gap-6">
        {certificates.map(cert => (
          <div key={cert.id} className="bg-[#1F2937] p-6 rounded-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{cert.name}</h3>
                <p className="text-gray-400">Issued by {cert.issuedBy}</p>
              </div>
              <span className={`px-3 py-1 rounded text-sm ${
                cert.status === 'active' ? 'bg-green-900 text-green-300' :
                cert.status === 'expiring' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {cert.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm">Issue Date</p>
                <p className="text-white">{cert.issuedDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Expiry Date</p>
                <p className="text-white">{cert.expiryDate}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end space-x-3">
              <button className="px-3 py-1 text-primary hover:text-primary-light">
                <span className="material-icons">file_download</span>
              </button>
              <button className="px-3 py-1 text-primary hover:text-primary-light">
                <span className="material-icons">share</span>
              </button>
              <button className="px-3 py-1 text-primary hover:text-primary-light">
                <span className="material-icons">edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsList;
