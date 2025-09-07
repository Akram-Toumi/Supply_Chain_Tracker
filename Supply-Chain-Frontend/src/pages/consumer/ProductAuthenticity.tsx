import { useState } from 'react';

interface VerificationResult {
  id: string;
  name: string;
  manufacturer: string;
  isAuthentic: boolean;
  blockchainData: {
    transactionHash: string;
    blockNumber: number;
    timestamp: string;
  };
  certifications: {
    name: string;
    issuer: string;
    validUntil: string;
    status: 'valid' | 'expired' | 'revoked';
  }[];
  securityFeatures: {
    feature: string;
    status: boolean;
  }[];
}

const ProductAuthenticity = () => {
  const [productId, setProductId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleVerify = () => {
    setVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setVerificationResult({
        id: '123456/890',
        name: 'Organic Coffee Beans',
        manufacturer: 'Green Bean Co.',
        isAuthentic: true,
        blockchainData: {
          transactionHash: '0x1234...5678',
          blockNumber: 12345678,
          timestamp: '2025-08-15 10:30:15'
        },
        certifications: [
          {
            name: 'Certified Organic',
            issuer: 'Global Organic Authority',
            validUntil: '2026-08-15',
            status: 'valid'
          },
          {
            name: 'Fair Trade Certified',
            issuer: 'Fair Trade International',
            validUntil: '2026-08-15',
            status: 'valid'
          }
        ],
        securityFeatures: [
          {
            feature: 'QR Code Authentication',
            status: true
          },
          {
            feature: 'Digital Signature',
            status: true
          },
          {
            feature: 'Blockchain Verification',
            status: true
          }
        ]
      });
      setVerifying(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Verification Input */}
      <div className="bg-[#1F2937] p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Verify Product Authenticity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 bg-[#374151] p-3 rounded">
            <span className="material-icons text-gray-400">verified_user</span>
            <input
              type="text"
              placeholder="Enter product ID or scan QR code"
              className="bg-transparent text-white w-full focus:outline-none"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={!productId || verifying}
            className={`w-full px-4 py-2 rounded flex items-center justify-center space-x-2 ${
              !productId || verifying
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark'
            }`}
          >
            <span className="material-icons">shield</span>
            <span>{verifying ? 'Verifying...' : 'Verify Authenticity'}</span>
          </button>
        </div>
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{verificationResult.name}</h3>
                <p className="text-gray-400">ID: {verificationResult.id}</p>
                <p className="text-gray-400">{verificationResult.manufacturer}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                verificationResult.isAuthentic ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
              }`}>
                <span className="material-icons">
                  {verificationResult.isAuthentic ? 'verified' : 'gpp_bad'}
                </span>
                <span>{verificationResult.isAuthentic ? 'Authentic Product' : 'Suspicious Product'}</span>
              </div>
            </div>

            <div className="bg-[#374151] p-4 rounded-lg">
              <h4 className="text-white font-medium mb-3">Blockchain Verification</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Transaction Hash</p>
                  <p className="text-white font-mono">{verificationResult.blockchainData.transactionHash}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Block Number</p>
                  <p className="text-white">{verificationResult.blockchainData.blockNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Timestamp</p>
                  <p className="text-white">{verificationResult.blockchainData.timestamp}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verificationResult.certifications.map((cert, index) => (
                <div key={index} className="bg-[#374151] p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white font-medium">{cert.name}</h4>
                      <p className="text-gray-400 text-sm">Issued by: {cert.issuer}</p>
                      <p className="text-gray-400 text-sm">Valid until: {cert.validUntil}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      cert.status === 'valid' ? 'bg-green-900 text-green-300' :
                      cert.status === 'expired' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {cert.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Security Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {verificationResult.securityFeatures.map((feature, index) => (
                <div key={index} className="bg-[#374151] p-4 rounded-lg flex items-center justify-between">
                  <span className="text-white">{feature.feature}</span>
                  <span className={`material-icons ${
                    feature.status ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {feature.status ? 'check_circle' : 'cancel'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAuthenticity;
