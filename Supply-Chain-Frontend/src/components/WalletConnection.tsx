import React from 'react';
import { useBlockchain } from '../contexts/BlockchainContext';

const WalletConnection: React.FC = () => {
  const { 
    isConnected, 
    currentAccount, 
    loading, 
    error, 
    connectWallet, 
    disconnectWallet 
  } = useBlockchain();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && currentAccount) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-300">
            Connected: {formatAddress(currentAccount)}
          </span>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end space-y-2">
      {error && (
        <div className="text-red-400 text-sm max-w-xs text-right">
          {error}
        </div>
      )}
      <button
        onClick={connectWallet}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default WalletConnection;

