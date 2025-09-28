import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { blockchainService } from '../services/blockchainService';
import type { BlockchainProduct, ProductState } from '../services/blockchainService';

interface BlockchainContextType {
  isConnected: boolean;
  currentAccount: string | null;
  products: BlockchainProduct[];
  loading: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  refreshProducts: () => Promise<void>;
  createProduct: (name: string) => Promise<void>;
  shipProduct: (productId: number, location: string) => Promise<void>;
  receiveInTransit: (productId: number, location: string) => Promise<void>;
  deliverToWarehouse: (productId: number, location: string) => Promise<void>;
  receiveInWarehouse: (productId: number, location: string) => Promise<void>;
  receiveByDistributor: (productId: number, location: string) => Promise<void>;
  deliverToRetailer: (productId: number, location: string) => Promise<void>;
  receiveByRetailer: (productId: number, location: string) => Promise<void>;
  shipToDistributor: (productId: number, location: string) => Promise<void>;
  sellProduct: (productId: number, location: string) => Promise<void>;
  purchaseProduct: (productId: number, location: string) => Promise<void>;
  getProductState: (productId: number) => Promise<number>;
  getProductInfo: (productId: number) => Promise<any>;
  getProductHistory: (productId: number) => Promise<any[]>;
  getAllProducerTransactions: () => Promise<any[]>;
  getProductStateString: (state: number) => string;
  formatTimestamp: (timestamp: number) => string;
  // Role checking functions
  isProducer: (address?: string) => Promise<boolean>;
  isCarrier: (address?: string) => Promise<boolean>;
  isWarehouse: (address?: string) => Promise<boolean>;
  isDistributor: (address?: string) => Promise<boolean>;
  isRetailer: (address?: string) => Promise<boolean>;
  getUserRoles: (address?: string) => Promise<{
    isProducer: boolean;
    isCarrier: boolean;
    isWarehouse: boolean;
    isDistributor: boolean;
    isRetailer: boolean;
  }>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

interface BlockchainProviderProps {
  children: ReactNode;
}

export const BlockchainProvider: React.FC<BlockchainProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [products, setProducts] = useState<BlockchainProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (blockchainService.isConnected()) {
        const account = await blockchainService.getCurrentAccount();
        setCurrentAccount(account);
        setIsConnected(true);
        await refreshProducts();
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.initialize();
      const account = await blockchainService.getCurrentAccount();
      
      setCurrentAccount(account);
      setIsConnected(true);
      await refreshProducts();
    } catch (error: any) {
      setError(error.message || 'Failed to connect wallet');
      console.error('Error connecting wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setCurrentAccount(null);
    setProducts([]);
    setError(null);
  };

  const refreshProducts = async () => {
    if (!isConnected) {
      console.log('Not connected, skipping product refresh');
      return;
    }
    
    try {
      console.log('Starting product refresh...');
      setLoading(true);
      setError(null);
      
      const allProducts = await blockchainService.getAllProducts();
      console.log('Products fetched in context:', allProducts);
      setProducts(allProducts);
    } catch (error: any) {
      console.error('Error fetching products in context:', error);
      setError(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (name: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    // Ensure blockchain service is initialized
    if (!blockchainService.isConnected()) {
      console.log('Blockchain service not connected, attempting to reconnect...');
      try {
        await blockchainService.initialize();
      } catch (initError) {
        throw new Error('Failed to initialize blockchain connection. Please try connecting your wallet again.');
      }
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.createProduct(name);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to create product');
      console.error('Error creating product:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const shipProduct = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    // Ensure blockchain service is initialized
    if (!blockchainService.isConnected()) {
      console.log('Blockchain service not connected, attempting to reconnect...');
      try {
        await blockchainService.initialize();
      } catch (initError) {
        throw new Error('Failed to initialize blockchain connection. Please try connecting your wallet again.');
      }
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.shipProduct(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to ship product');
      console.error('Error shipping product:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const receiveInTransit = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.receiveInTransit(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to receive product in transit');
      console.error('Error receiving product in transit:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deliverToWarehouse = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.deliverToWarehouse(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to deliver product to warehouse');
      console.error('Error delivering product to warehouse:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const receiveByDistributor = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.receiveByDistributor(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to receive product by distributor');
      console.error('Error receiving product by distributor:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deliverToRetailer = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.deliverToRetailer(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to deliver product to customer');
      console.error('Error delivering product to customer:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const receiveByRetailer = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.receiveByRetailer(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to receive product by retailer');
      console.error('Error receiving product by retailer:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const shipToDistributor = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.shipToDistributor(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to ship product to distributor');
      console.error('Error shipping product to distributor:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sellProduct = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.sellProduct(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to sell product');
      console.error('Error selling product:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const purchaseProduct = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.purchaseProduct(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to purchase product');
      console.error('Error purchasing product:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProductState = async (productId: number): Promise<number> => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      return await blockchainService.getProductState(productId);
    } catch (error: any) {
      console.error('Error getting product state:', error);
      throw error;
    }
  };

  const getProductInfo = async (productId: number) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      return await blockchainService.getProductInfo(productId);
    } catch (error: any) {
      console.error('Error getting product info:', error);
      throw error;
    }
  };

  const getProductHistory = async (productId: number) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      return await blockchainService.getProductHistory(productId);
    } catch (error: any) {
      console.error('Error getting product history:', error);
      throw error;
    }
  };

  const getAllProducerTransactions = async () => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      return await blockchainService.getAllProducerTransactions();
    } catch (error: any) {
      console.error('Error getting all producer transactions:', error);
      throw error;
    }
  };

  const getProductStateString = (state: ProductState): string => {
    return blockchainService.getProductStateString(state);
  };

  const formatTimestamp = (timestamp: number): string => {
    return blockchainService.formatTimestamp(timestamp);
  };

  // Role checking functions
  const isProducer = async (address?: string): Promise<boolean> => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    return await blockchainService.isProducer(address);
  };

  const isCarrier = async (address?: string): Promise<boolean> => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    return await blockchainService.isCarrier(address);
  };

  const isWarehouse = async (address?: string): Promise<boolean> => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    return await blockchainService.isWarehouse(address);
  };

  const isDistributor = async (address?: string): Promise<boolean> => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    return await blockchainService.isDistributor(address);
  };

  const isRetailer = async (address?: string): Promise<boolean> => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    return await blockchainService.isRetailer(address);
  };

  const getUserRoles = async (address?: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }
    return await blockchainService.getUserRoles(address);
  };

  const receiveInWarehouse = async (productId: number, location: string) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      setError(null);
      
      await blockchainService.receiveInWarehouse(productId, location);
      await refreshProducts(); // Refresh the products list
    } catch (error: any) {
      setError(error.message || 'Failed to receive product in warehouse');
      console.error('Error receiving product in warehouse:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: BlockchainContextType = {
    isConnected,
    currentAccount,
    products,
    loading,
    error,
    connectWallet,
    disconnectWallet,
    refreshProducts,
    createProduct,
    shipProduct,
    receiveInTransit,
    deliverToWarehouse,
    receiveInWarehouse,
    receiveByDistributor,
    deliverToRetailer,
    receiveByRetailer,
    shipToDistributor,
    sellProduct,
    purchaseProduct,
    getProductState,
    getProductInfo,
    getProductHistory,
    getAllProducerTransactions,
    getProductStateString,
    formatTimestamp,
    isProducer,
    isCarrier,
    isWarehouse,
    isDistributor,
    isRetailer,
    getUserRoles,
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};
