import React, { useState, useEffect } from 'react';
import { useBlockchain } from '../contexts/BlockchainContext';
import type { ProductTransaction } from '../services/blockchainService';

interface ProductDetailsModalProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ 
  productId, 
  isOpen, 
  onClose 
}) => {
  const { getProductHistory, getProductStateString, formatTimestamp } = useBlockchain();
  const [history, setHistory] = useState<ProductTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && productId) {
      loadProductHistory();
    }
  }, [isOpen, productId]);

  const loadProductHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const productHistory = await getProductHistory(productId);
      setHistory(productHistory);
    } catch (err: any) {
      setError(err.message || 'Failed to load product history');
    } finally {
      setLoading(false);
    }
  };

  const getStateColor = (state: number) => {
    switch (state) {
      case 0: return 'bg-blue-100 text-blue-800'; // PRODUCED
      case 1: return 'bg-yellow-100 text-yellow-800'; // IN_TRANSIT
      case 2: return 'bg-orange-100 text-orange-800'; // IN_WAREHOUSE
      case 3: return 'bg-green-100 text-green-800'; // DISTRIBUTED
      case 4: return 'bg-purple-100 text-purple-800'; // IN_STORE
      case 5: return 'bg-red-100 text-red-800'; // SOLD
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Product #{productId} History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-2">Loading history...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-600 mb-2">Error loading history</div>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No history found for this product</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((transaction, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded text-sm ${getStateColor(transaction.fromState)}`}>
                        {getProductStateString(transaction.fromState)}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className={`px-2 py-1 rounded text-sm ${getStateColor(transaction.toState)}`}>
                        {getProductStateString(transaction.toState)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatTimestamp(transaction.timestamp)}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><strong>Actor:</strong> {transaction.actor}</p>
                    {transaction.location && (
                      <p><strong>Location:</strong> {transaction.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
