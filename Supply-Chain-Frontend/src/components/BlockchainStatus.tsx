import React from 'react';
import { useBlockchain } from '../contexts/BlockchainContext';

const BlockchainStatus: React.FC = () => {
  const { isConnected, currentAccount, products, loading } = useBlockchain();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 mb-6 glass-effect border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
        Blockchain Status
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <span className="text-sm text-gray-300">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        {currentAccount && (
          <div className="text-sm text-gray-300">
            <span className="text-gray-400">Account: </span>
            <span className="font-mono text-blue-300">{formatAddress(currentAccount)}</span>
          </div>
        )}
        
        <div className="text-sm text-gray-300">
          <span className="text-gray-400">Products: </span>
          <span className="font-semibold text-green-300">
            {loading ? 'Loading...' : products.length}
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-400 flex items-center">
        <span className="mr-1">📄</span>
        Contract: {formatAddress('0x7Ec09D73227fD4aa173860b8Fb85E9CDd404277a')}
      </div>
    </div>
  );
};

export default BlockchainStatus;
