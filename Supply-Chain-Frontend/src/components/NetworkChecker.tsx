import React, { useState, useEffect } from 'react';
import { useBlockchain } from '../contexts/BlockchainContext';

interface NetworkInfo {
  name: string;
  chainId: string;
  contractAddress: string;
}

interface ContractInfo {
  exists: boolean;
  productCount?: string;
  error?: string;
}

const NetworkChecker: React.FC = () => {
  const { isConnected } = useBlockchain();
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x7Ec09D73227fD4aa173860b8Fb85E9CDd404277a';

  useEffect(() => {
    if (isConnected && window.ethereum) {
      checkNetwork();
    }
  }, [isConnected]);

  const checkNetwork = async () => {
    setIsLoading(true);
    try {
      const provider = new (window as any).ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      
      setNetworkInfo({
        name: network.name,
        chainId: network.chainId.toString(),
        contractAddress: CONTRACT_ADDRESS
      });

      // Check if contract exists
      await checkContract(provider);
    } catch (error) {
      console.error('Network check failed:', error);
      setContractInfo({
        exists: false,
        error: 'Failed to connect to network'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkContract = async (provider: any) => {
    try {
      const contract = new (window as any).ethers.Contract(
        CONTRACT_ADDRESS,
        [
          {
            "inputs": [],
            "name": "productCount",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
          }
        ],
        provider
      );
      
      const productCount = await contract.productCount();
      setContractInfo({
        exists: true,
        productCount: productCount.toString()
      });
    } catch (error: any) {
      setContractInfo({
        exists: false,
        error: error.message || 'Contract not found'
      });
    }
  };

  if (!isConnected) return null;

  return (
    <div className="bg-yellow-900/20 border border-yellow-700/50 text-yellow-300 px-4 py-3 rounded-lg mb-4 glass-effect">
      <h4 className="font-semibold mb-2 flex items-center">
        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
        Network Status
      </h4>
      
      {isLoading ? (
        <div className="text-sm text-yellow-200">Checking network...</div>
      ) : (
        <>
          {networkInfo && (
            <div className="text-sm space-y-1 mb-2">
              <p><strong>Network:</strong> {networkInfo.name} (Chain ID: {networkInfo.chainId})</p>
              <p><strong>Contract:</strong> {networkInfo.contractAddress.slice(0, 6)}...{networkInfo.contractAddress.slice(-4)}</p>
            </div>
          )}
          
          {contractInfo && (
            <div className="text-sm">
              {contractInfo.exists ? (
                <p className="text-green-300 flex items-center">
                  <span className="mr-1">✅</span>
                  Contract accessible - Products: {contractInfo.productCount}
                </p>
              ) : (
                <p className="text-red-300 flex items-center">
                  <span className="mr-1">❌</span>
                  Contract error: {contractInfo.error}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NetworkChecker;
