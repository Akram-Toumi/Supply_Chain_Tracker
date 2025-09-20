import { useState } from 'react';

interface ProductVerification {
  id: string;
  productName: string;
  batchId: string;
  status: 'pending' | 'verified' | 'rejected';
  requestDate: string;
  verificationDate: string | null;
  origin: string;
  producer: string;
  documents: {
    name: string;
    type: string;
    status: 'pending' | 'verified' | 'rejected';
  }[];
}

const DistributorVerification = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [verifications] = useState<ProductVerification[]>([
    {
      id: 'VER001',
      productName: 'Organic Apples',
      batchId: 'B2023110',
      status: 'pending',
      requestDate: '2025-09-05',
      verificationDate: null,
      origin: 'Farm A',
      producer: 'Organic Farms Inc.',
      documents: [
        {
          name: 'Organic Certification',
          type: 'certification',
          status: 'pending'
        },
        {
          name: 'Quality Report',
          type: 'report',
          status: 'verified'
        },
        {
          name: 'Transport Documents',
          type: 'logistics',
          status: 'pending'
        }
      ]
    },
    {
      id: 'VER002',
      productName: 'Green Tea Leaves',
      batchId: 'B2023111',
      status: 'verified',
      requestDate: '2025-09-04',
      verificationDate: '2025-09-05',
      origin: 'Tea Gardens B',
      producer: 'Tea Estates Ltd.',
      documents: [
        {
          name: 'Quality Certificate',
          type: 'certification',
          status: 'verified'
        },
        {
          name: 'Processing Report',
          type: 'report',
          status: 'verified'
        }
      ]
    }
  ]);

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = verification.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         verification.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         verification.producer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || verification.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Verification Requests</h2>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span className="material-icons">add</span>
          <span>New Request</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search verifications..."
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
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg">
          <span className="material-icons text-gray-400">sort</span>
          <select className="bg-transparent text-white w-full focus:outline-none">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Verifications List */}
      <div className="space-y-4">
        {filteredVerifications.map(verification => (
          <div key={verification.id} className="bg-[#1F2937] rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-white text-lg font-medium">{verification.productName}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    verification.status === 'verified' ? 'bg-green-900 text-green-300' :
                    verification.status === 'rejected' ? 'bg-red-900 text-red-300' :
                    'bg-yellow-900 text-yellow-300'
                  }`}>
                    {verification.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">Batch ID: {verification.batchId}</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">verified</span>
                  <span>Verify</span>
                </button>
                <button className="text-white hover:text-primary flex items-center space-x-1">
                  <span className="material-icons text-sm">close</span>
                  <span>Reject</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">Producer</p>
                <p className="text-white">{verification.producer}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Origin</p>
                <p className="text-white">{verification.origin}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Request Date</p>
                <p className="text-white">{verification.requestDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Verification Date</p>
                <p className="text-white">{verification.verificationDate || 'Pending'}</p>
              </div>
            </div>

            <div className="bg-[#374151] p-4 rounded-lg">
              <h4 className="text-white font-medium mb-3">Required Documents</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {verification.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="material-icons text-gray-400">
                        {doc.type === 'certification' ? 'verified_user' :
                         doc.type === 'report' ? 'description' : 'local_shipping'}
                      </span>
                      <div>
                        <p className="text-white text-sm">{doc.name}</p>
                        <p className={`text-xs ${
                          doc.status === 'verified' ? 'text-green-300' :
                          doc.status === 'rejected' ? 'text-red-300' :
                          'text-yellow-300'
                        }`}>
                          {doc.status.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary-light">
                      <span className="material-icons text-sm">visibility</span>
                    </button>
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

export default DistributorVerification;
