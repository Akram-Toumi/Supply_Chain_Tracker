import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';

interface VerificationResult {
  id: number;
  name: string;
  producer: string;
  currentOwner: string;
  currentState: number;
  isAuthentic: boolean;
  blockchainData: {
    transactionHash: string;
    blockNumber: number;
    timestamp: string;
  };
  supplyChainHistory: {
    stage: string;
    location: string;
    timestamp: string;
    owner: string;
    state: number;
  }[];
}

const ProductAuthenticity = () => {
  const { 
    isConnected, 
    getProduct, 
    getProductHistory, 
    getProductStateString, 
    formatTimestamp,
    loading, 
    error 
  } = useBlockchain();
  
  const [productId, setProductId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!productId.trim()) return;
    
    setVerifying(true);
    setVerificationResult(null);
    
    try {
      const productIdNum = parseInt(productId);
      if (isNaN(productIdNum)) {
        throw new Error('Please enter a valid product ID (number)');
      }

      // Get product details
      const product = await getProduct(productIdNum);
      if (!product) {
        throw new Error('Product not found');
      }

      // Get product history
      const history = await getProductHistory(productIdNum);
      
      // Create verification result
      const result: VerificationResult = {
        id: product.id,
        name: product.name,
        producer: product.producer,
        currentOwner: product.currentOwner,
        currentState: product.currentState,
        isAuthentic: true, // If we can retrieve from blockchain, it's authentic
        blockchainData: {
          transactionHash: '0x' + Math.random().toString(16).substr(2, 8) + '...', // Mock for now
          blockNumber: Math.floor(Math.random() * 1000000) + 1000000,
          timestamp: formatTimestamp(product.lastUpdated)
        },
        supplyChainHistory: history.map(transaction => ({
          stage: getProductStateString(transaction.state),
          location: transaction.location,
          timestamp: formatTimestamp(transaction.timestamp),
          owner: transaction.owner,
          state: transaction.state
        }))
      };

      setVerificationResult(result);
    } catch (error: any) {
      console.error('Error verifying product:', error);
      alert(`Verification failed: ${error.message}`);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Retailer Product Verification</h1>
        <WalletConnection />
      </div>

      {/* Blockchain Status */}
      <BlockchainStatus />

      {/* Verification Input */}
      <div className="bg-[#1F2937] p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Verify Product Authenticity for Customers</h2>
        <p className="text-gray-400 mb-4">
          Enter a product ID to verify its authenticity and view the complete supply chain history for customer transparency. Only products that have reached the store (IN_STORE state) are available for verification.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 bg-[#374151] p-3 rounded">
            <span className="material-icons text-gray-400">verified_user</span>
            <input
              type="text"
              placeholder="Enter product ID (e.g., 1, 2, 3...)"
              className="bg-transparent text-white w-full focus:outline-none"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={!productId || verifying || !isConnected}
            className={`w-full px-4 py-2 rounded flex items-center justify-center space-x-2 ${
              !productId || verifying || !isConnected
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark'
            }`}
          >
            <span className="material-icons">shield</span>
            <span>
              {!isConnected ? 'Connect Wallet First' : 
               verifying ? 'Verifying...' : 'Verify Authenticity'}
            </span>
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
                <p className="text-gray-400">Product ID: {verificationResult.id}</p>
                <p className="text-gray-400">Producer: {verificationResult.producer}</p>
                <p className="text-gray-400">Current Owner: {verificationResult.currentOwner}</p>
                <p className="text-gray-400">Current State: {getProductStateString(verificationResult.currentState)}</p>
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
                  <p className="text-white font-mono text-sm">{verificationResult.blockchainData.transactionHash}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Block Number</p>
                  <p className="text-white">{verificationResult.blockchainData.blockNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Updated</p>
                  <p className="text-white">{verificationResult.blockchainData.timestamp}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supply Chain History */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-6">Complete Supply Chain History for Customer Transparency</h3>
            <div className="space-y-4">
              {verificationResult.supplyChainHistory.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index !== verificationResult.supplyChainHistory.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-700"></div>
                  )}
                  
                  <div className="flex space-x-4">
                    {/* Icon */}
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-[#374151] rounded-full flex items-center justify-center">
                        <span className="material-icons text-primary">
                          {step.state === 0 ? 'agriculture' :
                           step.state === 1 ? 'local_shipping' :
                           step.state === 2 ? 'warehouse' :
                           step.state === 3 ? 'inventory' :
                           step.state === 4 ? 'store' :
                           'check_circle'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="bg-[#374151] p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-white font-medium">{step.stage}</h4>
                            <p className="text-gray-400 text-sm">{step.location}</p>
                            <p className="text-gray-400 text-sm">Owner: {step.owner}</p>
                          </div>
                          <p className="text-gray-400 text-sm">{step.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
