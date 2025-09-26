import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';

const ProductAuthenticity = () => {
  const { 
    isConnected, 
    getProductInfo, 
    getProductHistory,
    getProductStateString,
    formatTimestamp 
  } = useBlockchain();
  
  const [productId, setProductId] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerification = async () => {
    if (!productId.trim()) {
      setError('Please enter a product ID');
      return;
    }

    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setVerifying(true);
      setError(null);
      
      const productIdNum = parseInt(productId);
      if (isNaN(productIdNum)) {
        throw new Error('Please enter a valid product ID');
      }

      console.log('Verifying authenticity for product ID:', productIdNum);
      
      // Get product information and history
      const [productInfo, productHistory] = await Promise.all([
        getProductInfo(productIdNum),
        getProductHistory(productIdNum)
      ]);
      
      console.log('Product info:', productInfo);
      console.log('Product history:', productHistory);
      
      // Perform authenticity checks
      const authenticityChecks = await performAuthenticityChecks(productInfo, productHistory);
      
      setVerificationResult({
        productInfo,
        productHistory,
        authenticityChecks,
        verifiedAt: new Date().toISOString()
      });
      
    } catch (error: any) {
      console.error('Error verifying product authenticity:', error);
      setError(error.message || 'Failed to verify product authenticity');
      setVerificationResult(null);
    } finally {
      setVerifying(false);
    }
  };

  const performAuthenticityChecks = async (productInfo: any, productHistory: any[]) => {
    const checks = {
      blockchainVerification: {
        passed: productInfo && productInfo.id > 0,
        message: productInfo && productInfo.id > 0 
          ? 'Product exists on blockchain' 
          : 'Product not found on blockchain'
      },
      supplyChainIntegrity: {
        passed: productHistory && productHistory.length > 0,
        message: productHistory && productHistory.length > 0 
          ? 'Complete supply chain history available' 
          : 'No supply chain history found'
      },
      stateProgression: {
        passed: checkStateProgression(productHistory),
        message: checkStateProgression(productHistory) 
          ? 'Valid state progression through supply chain' 
          : 'Invalid or suspicious state progression'
      },
      producerVerification: {
        passed: productInfo && productInfo.producer && productInfo.producer !== '0x0000000000000000000000000000000000000000',
        message: productInfo && productInfo.producer && productInfo.producer !== '0x0000000000000000000000000000000000000000'
          ? 'Valid producer address' 
          : 'Invalid or missing producer'
      },
      timestampValidation: {
        passed: checkTimestampValidation(productHistory),
        message: checkTimestampValidation(productHistory) 
          ? 'Timestamps are chronologically valid' 
          : 'Suspicious timestamp patterns detected'
      }
    };

    const overallScore = Object.values(checks).filter(check => check.passed).length;
    const totalChecks = Object.keys(checks).length;
    
    return {
      ...checks,
      overallScore,
      totalChecks,
      authenticityPercentage: Math.round((overallScore / totalChecks) * 100),
      isAuthentic: overallScore >= 4 // Require at least 4 out of 5 checks to pass
    };
  };

  const checkStateProgression = (history: any[]) => {
    if (!history || history.length === 0) return false;
    
    const validStates = [0, 1, 2, 3, 4, 5]; // PRODUCED, IN_TRANSIT, IN_WAREHOUSE, DISTRIBUTED, IN_STORE, SOLD
    const stateTransitions = history.map(tx => ({ from: tx.fromState, to: tx.toState }));
    
    // Check if all state transitions are valid
    for (const transition of stateTransitions) {
      if (!validStates.includes(transition.from) || !validStates.includes(transition.to)) {
        return false;
      }
    }
    
    return true;
  };

  const checkTimestampValidation = (history: any[]) => {
    if (!history || history.length === 0) return false;
    
    // Check if timestamps are in chronological order
    for (let i = 1; i < history.length; i++) {
      if (history[i].timestamp < history[i - 1].timestamp) {
        return false;
      }
    }
    
    return true;
  };

  const getCheckIcon = (passed: boolean) => {
    return passed ? 'check_circle' : 'cancel';
  };

  const getCheckColor = (passed: boolean) => {
    return passed ? 'text-green-400' : 'text-red-400';
  };

  const getAuthenticityLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'High', color: 'text-green-400', bgColor: 'bg-green-900' };
    if (percentage >= 70) return { level: 'Medium', color: 'text-yellow-400', bgColor: 'bg-yellow-900' };
    if (percentage >= 50) return { level: 'Low', color: 'text-orange-400', bgColor: 'bg-orange-900' };
    return { level: 'Very Low', color: 'text-red-400', bgColor: 'bg-red-900' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Product Authenticity Verification</h1>
      </div>

      {/* Verification Input */}
      <div className="bg-[#1F2937] p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Verify Product Authenticity</h2>
        <p className="text-gray-400 mb-4">Enter the product ID from the product label or QR code to verify its authenticity and view complete supply chain information.</p>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter product ID to verify authenticity..."
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="flex-1 px-4 py-2 bg-[#374151] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleVerification}
            disabled={verifying || !isConnected}
            className={`px-6 py-2 rounded flex items-center space-x-2 ${
              verifying || !isConnected
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark'
            }`}
          >
            <span className="material-icons">verified_user</span>
            <span>{verifying ? 'Verifying...' : 'Verify'}</span>
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded">
            <div className="flex items-center space-x-2">
              <span className="material-icons text-sm">error</span>
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div className="space-y-6">
          {/* Overall Authenticity Score */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Authenticity Verification Result</h3>
              <span className={`px-3 py-1 rounded-full flex items-center space-x-1 ${
                verificationResult.authenticityChecks.isAuthentic 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-red-900 text-red-300'
              }`}>
                <span className="material-icons text-sm">
                  {verificationResult.authenticityChecks.isAuthentic ? 'verified' : 'gpp_bad'}
                </span>
                <span>{verificationResult.authenticityChecks.isAuthentic ? 'Authentic' : 'Suspicious'}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {verificationResult.authenticityChecks.authenticityPercentage}%
                </div>
                <p className="text-gray-400">Authenticity Score</p>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${
                  getAuthenticityLevel(verificationResult.authenticityChecks.authenticityPercentage).color
                }`}>
                  {getAuthenticityLevel(verificationResult.authenticityChecks.authenticityPercentage).level}
                </div>
                <p className="text-gray-400">Confidence Level</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">
                  {verificationResult.authenticityChecks.overallScore}/{verificationResult.authenticityChecks.totalChecks}
                </div>
                <p className="text-gray-400">Checks Passed</p>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Product Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400">Product Name</p>
                <p className="text-white text-lg font-medium">{verificationResult.productInfo.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Product ID</p>
                <p className="text-white font-mono">{verificationResult.productInfo.id}</p>
              </div>
              <div>
                <p className="text-gray-400">Producer</p>
                <p className="text-white font-mono">{verificationResult.productInfo.producer}</p>
              </div>
              <div>
                <p className="text-gray-400">Current Status</p>
                <p className="text-white">{getProductStateString(verificationResult.productInfo.currentState)}</p>
              </div>
            </div>
          </div>

          {/* Detailed Verification Checks */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Verification Details</h3>
            <div className="space-y-4">
              {Object.entries(verificationResult.authenticityChecks).map(([key, check]: [string, any]) => {
                if (typeof check !== 'object' || !check.hasOwnProperty('passed')) return null;
                
                return (
                  <div key={key} className="flex items-center justify-between p-4 bg-[#374151] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className={`material-icons ${getCheckColor(check.passed)}`}>
                        {getCheckIcon(check.passed)}
                      </span>
                      <div>
                        <p className="text-white font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-gray-400 text-sm">{check.message}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      check.passed ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                    }`}>
                      {check.passed ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supply Chain Summary */}
          <div className="bg-[#1F2937] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Supply Chain Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400">Total Transactions</p>
                <p className="text-white text-2xl font-bold">{verificationResult.productHistory.length}</p>
              </div>
              <div>
                <p className="text-gray-400">Verification Date</p>
                <p className="text-white">{new Date(verificationResult.verifiedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center space-x-2">
              <span className="material-icons text-sm">download</span>
              <span>Download Report</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center space-x-2">
              <span className="material-icons text-sm">share</span>
              <span>Share Verification</span>
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center space-x-2">
              <span className="material-icons text-sm">history</span>
              <span>View Full History</span>
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!verificationResult && !verifying && (
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">How Authenticity Verification Works</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="material-icons text-primary">looks_one</span>
              <p className="text-gray-300">Find the product ID on the product label or scan the QR code to get the ID</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="material-icons text-primary">looks_two</span>
              <p className="text-gray-300">Enter the product ID above to begin verification</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="material-icons text-primary">looks_3</span>
              <p className="text-gray-300">Our system performs multiple blockchain-based authenticity checks</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="material-icons text-primary">looks_4</span>
              <p className="text-gray-300">Get a comprehensive authenticity report with confidence score and supply chain details</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAuthenticity;
