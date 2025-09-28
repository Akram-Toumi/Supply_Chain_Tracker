import { useState } from 'react';
import { useBlockchain } from '../../contexts/BlockchainContext';
import WalletConnection from '../../components/WalletConnection';
import BlockchainStatus from '../../components/BlockchainStatus';

const DownloadTransactions = () => {
  const { 
    isConnected, 
    loading, 
    error,
    getAllProducerTransactions,
    getProductStateString,
    formatTimestamp
  } = useBlockchain();

  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const downloadTransactions = async () => {
    try {
      setDownloadLoading(true);
      setDownloadError(null);
      
      const transactions = await getAllProducerTransactions();
      
      if (transactions.length === 0) {
        alert('No transactions found for your products.');
        return;
      }
      
      // Create CSV content
      const csvContent = [
        'Product ID,From State,To State,Actor,Timestamp,Location,Date',
        ...transactions.map(tx => [
          tx.productId,
          getProductStateString(tx.fromState),
          getProductStateString(tx.toState),
          tx.actor,
          tx.timestamp,
          tx.location,
          formatTimestamp(tx.timestamp)
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `producer_transactions_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Error downloading transactions:', error);
      setDownloadError(error.message || 'Failed to download transactions. Please try again.');
    } finally {
      setDownloadLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Download Transactions</h1>
          <WalletConnection />
        </div>
        <div className="bg-[#1F2937] rounded-lg p-6 text-center">
          <p className="text-gray-400">Please connect your wallet to download transaction data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Download Transactions</h1>
        <WalletConnection />
      </div>

      <BlockchainStatus />

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {downloadError && (
        <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-md">
          {downloadError}
        </div>
      )}

      {/* Download Section */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Export Transaction Data</h3>
        <p className="text-gray-400 mb-6">
          Download a CSV file containing all transaction history for products you have produced. 
          This includes state changes, actors, timestamps, and locations.
        </p>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={downloadTransactions}
            disabled={downloadLoading || loading}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center"
          >
            {downloadLoading ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Downloading...
              </>
            ) : (
              <>
                <span className="material-icons text-sm mr-2">download</span>
                Download CSV
              </>
            )}
          </button>
          
          {downloadLoading && (
            <p className="text-gray-400 text-sm">
              Fetching transaction data from blockchain...
            </p>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-[#1F2937] rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">What's Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-white font-medium">Transaction Data</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Product ID</li>
              <li>• State transitions (From → To)</li>
              <li>• Actor (who performed the action)</li>
              <li>• Timestamp (Unix timestamp)</li>
              <li>• Location</li>
              <li>• Formatted date</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-medium">File Format</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• CSV format for easy import</li>
              <li>• UTF-8 encoding</li>
              <li>• Sorted by timestamp (newest first)</li>
              <li>• Includes all your products</li>
              <li>• Date in filename for organization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadTransactions;
