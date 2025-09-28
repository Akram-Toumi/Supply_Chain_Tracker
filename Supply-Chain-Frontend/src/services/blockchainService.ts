import { ethers } from 'ethers';

// Contract ABI - extracted from the compiled contract
const SUPPLY_CHAIN_ABI = [
  {
    "inputs": [],
    "name": "productCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "producer",
        "type": "address"
      },
      {
        "internalType": "enum SupplyChain.ProductState",
        "name": "currentState",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "currentOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastUpdated",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "createProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      }
    ],
    "name": "getProductHistory",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "productId",
            "type": "uint256"
          },
          {
            "internalType": "enum SupplyChain.ProductState",
            "name": "fromState",
            "type": "uint8"
          },
          {
            "internalType": "enum SupplyChain.ProductState",
            "name": "toState",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "actor",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "location",
            "type": "string"
          }
        ],
        "internalType": "struct SupplyChain.Transaction[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "shipProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      }
    ],
    "name": "getProductState",
    "outputs": [
      {
        "internalType": "enum SupplyChain.ProductState",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      }
    ],
    "name": "getProductInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "producer",
            "type": "address"
          },
          {
            "internalType": "enum SupplyChain.ProductState",
            "name": "currentState",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "currentOwner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lastUpdated",
            "type": "uint256"
          }
        ],
        "internalType": "struct SupplyChain.Product",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "receiveInTransit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "receiveInWarehouse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "deliverToWarehouse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "shipToDistributor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "receiveByDistributor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "deliverToRetailer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "receiveByRetailer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "sellProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "purchaseProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isProducer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isCarrier",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isWarehouse",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isDistributor",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isRetailer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract address - loaded from environment variables
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x17864E042aC345b139b4052b8076d9E4DF2Be3BB';

// Product states enum - must match contract
export const ProductState = {
  PRODUCED: 0,
  IN_TRANSIT: 1,
  IN_WAREHOUSE: 2,
  DISTRIBUTED: 3,
  IN_STORE: 4,
  SOLD: 5
} as const;

export type ProductState = typeof ProductState[keyof typeof ProductState];

// Product interface
export interface BlockchainProduct {
  id: number;
  name: string;
  producer: string;
  currentState: number;
  createdAt: number;
}

// Transaction interface
export interface ProductTransaction {
  productId: number;
  fromState: number;
  toState: number;
  actor: string;
  timestamp: number;
  location: string;
}

class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private contract: ethers.Contract | null = null;

  // Initialize the blockchain connection
  async initialize() {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to use this application.');
      }

      // Create provider
      this.provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access
      await this.provider.send("eth_requestAccounts", []);
      
      // Get signer
      this.signer = await this.provider.getSigner();
      
      // Get network info
      const network = await this.provider.getNetwork();
      console.log('Connected to network:', {
        name: network.name,
        chainId: network.chainId.toString(),
        contractAddress: CONTRACT_ADDRESS
      });

      // Ensure we're on the local development network (Ganache/Truffle: Chain ID 1337)
      const expectedChainId = parseInt(import.meta.env.VITE_CHAIN_ID || '1337');
      try {
        if (network.chainId !== BigInt(expectedChainId)) {
          console.warn(`Detected chainId ${network.chainId.toString()} - attempting to switch to ${expectedChainId} (Ganache/Truffle)`);
          // Try to switch to the expected chain
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
          });

          // Recreate provider/signer after switch
          this.provider = new ethers.BrowserProvider(window.ethereum);
          this.signer = await this.provider.getSigner();
        }
      } catch (switchError: any) {
        // If the chain has not been added to MetaMask, prompt to add
        if (switchError?.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${expectedChainId.toString(16)}`,
                chainName: import.meta.env.VITE_CHAIN_NAME || 'Ganache Local',
                nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                rpcUrls: [
                  import.meta.env.VITE_RPC_URL || 'http://127.0.0.1:7545',
                  import.meta.env.VITE_RPC_URL_BACKUP || 'http://127.0.0.1:8545'
                ],
              }],
            });
          } catch (addError) {
            console.warn('User rejected adding chain or failed to add. You must switch network manually to Chain ID 1337.');
          }
        } else {
          console.warn('Network switch rejected or failed. You must switch network manually to Chain ID 1337.');
        }
      }
      
      // Create contract instance
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, SUPPLY_CHAIN_ABI, this.signer);
      
      // Test contract connection
      try {
        const productCount = await this.contract.productCount();
        console.log('Contract connection successful. Product count:', productCount.toString());
      } catch (contractError) {
        console.error('Contract connection test failed:', contractError);
        const currentNetwork = await this.provider.getNetwork();
        throw new Error(`Contract not accessible on this network. Expected Chain ID 1337 with contract ${CONTRACT_ADDRESS}. Detected Chain ID ${currentNetwork.chainId}. Please switch MetaMask to your local Ganache/Truffle network and retry.`);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to initialize blockchain connection:', error);
      throw error;
    }
  }

  // Get the current account address
  async getCurrentAccount(): Promise<string> {
    if (!this.signer) {
      throw new Error('Blockchain not initialized');
    }
    return await this.signer.getAddress();
  }

  // Get total number of products
  async getProductCount(): Promise<number> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    try {
      const count = await this.contract.productCount();
      return Number(count);
    } catch (error) {
      console.error('Error getting product count:', error);
      throw error;
    }
  }

  // Get a specific product by ID
  async getProduct(productId: number): Promise<BlockchainProduct> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const product = await this.contract.products(productId);
      return {
        id: Number(product.id),
        name: product.name,
        producer: product.producer,
        currentState: Number(product.currentState),
        createdAt: Number(product.createdAt)
      };
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  }

  // Get all products
  async getAllProducts(): Promise<BlockchainProduct[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const count = await this.getProductCount();
      console.log('Total product count from contract:', count);
      
      const products: BlockchainProduct[] = [];

      for (let i = 1; i <= count; i++) {
        try {
          console.log(`Fetching product ${i}...`);
          const product = await this.getProduct(i);
          console.log(`Product ${i} fetched:`, product);
          products.push(product);
        } catch (error) {
          console.warn(`Product ${i} not found or error occurred:`, error);
        }
      }

      console.log('Final products array:', products);
      return products;
    } catch (error) {
      console.error('Error getting all products:', error);
      throw error;
    }
  }

  // Create a new product
  async createProduct(name: string): Promise<void> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      console.log('Creating product with name:', name);
      
      // First, let's check if the function exists and estimate gas
      try {
        const gasEstimate = await this.contract.createProduct.estimateGas(name);
        console.log('Gas estimate:', gasEstimate.toString());
      } catch (gasError: any) {
        console.error('Gas estimation failed:', gasError);
        throw new Error(`Failed to estimate gas for createProduct. This might indicate the contract function doesn't exist or has different parameters. Error: ${gasError.message}`);
      }
      
      const tx = await this.contract.createProduct(name, {
        gasLimit: 500000 // Set a reasonable gas limit
      });
      console.log('Transaction sent:', tx.hash);
      
      const receipt = await tx.wait();
      console.log('Product created successfully:', {
        hash: tx.hash,
        blockNumber: receipt?.blockNumber,
        gasUsed: receipt?.gasUsed?.toString()
      });
    } catch (error: any) {
      console.error('Error creating product:', error);
      
      // Provide more specific error messages
      if (error.code === 'CALL_EXCEPTION') {
        throw new Error(`Contract call failed. This usually means the contract is not deployed at this address or the function doesn't exist. Please check the contract address and network.`);
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
      } else if (error.code === 'USER_REJECTED') {
        throw new Error('Transaction was rejected by user.');
      } else {
        throw new Error(`Failed to create product: ${error.message}`);
      }
    }
  }

  // Get product history
  async getProductHistory(productId: number): Promise<ProductTransaction[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const history = await this.contract.getProductHistory(productId);
      return history.map((tx: any) => ({
        productId: Number(tx.productId),
        fromState: Number(tx.fromState),
        toState: Number(tx.toState),
        actor: tx.actor,
        timestamp: Number(tx.timestamp),
        location: tx.location
      }));
    } catch (error) {
      console.error('Error getting product history:', error);
      throw error;
    }
  }

  // Get all transactions for a producer
  async getAllProducerTransactions(): Promise<ProductTransaction[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const productCount = await this.contract.productCount();
      const allTransactions: ProductTransaction[] = [];

      // Get all products and their transaction histories
      for (let i = 1; i <= productCount; i++) {
        try {
          const product = await this.contract.products(i);
          const producer = product.producer;
          
          // Check if current user is the producer of this product
          if (this.signer && producer.toLowerCase() === (await this.signer.getAddress()).toLowerCase()) {
            const history = await this.getProductHistory(i);
            allTransactions.push(...history);
          }
        } catch (error) {
          // Skip products that don't exist or can't be accessed
          console.warn(`Could not access product ${i}:`, error);
          continue;
        }
      }

      // Sort transactions by timestamp (newest first)
      return allTransactions.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error getting all producer transactions:', error);
      throw error;
    }
  }

  // Ship product (Producer only)
  async shipProduct(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check product state before attempting to ship
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be PRODUCED (state 0) to ship`);
        
        if (productState !== 0) {
          throw new Error(`Product must be in PRODUCED state (0) to ship. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Shipping product ${productId} to ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.shipProduct.estimateGas(productId, location);
          console.log('Gas estimate for shipProduct:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for shipProduct:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.shipProduct(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Ship transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product shipped successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error shipping product (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for shipProduct');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to ship product. You may not be authorized as a producer or the product doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to ship product after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Get product state
  async getProductState(productId: number): Promise<number> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const state = await this.contract.getProductState(productId);
      return Number(state);
    } catch (error) {
      console.error('Error getting product state:', error);
      throw error;
    }
  }

  // Get detailed product info
  async getProductInfo(productId: number): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const productInfo = await this.contract.getProductInfo(productId);
      return {
        id: Number(productInfo.id),
        name: productInfo.name,
        currentState: Number(productInfo.currentState),
        producer: productInfo.producer,
        currentOwner: productInfo.currentOwner,
        createdAt: Number(productInfo.createdAt),
        lastUpdated: Number(productInfo.lastUpdated)
      };
    } catch (error) {
      console.error('Error getting product info:', error);
      throw error;
    }
  }

  // Receive product in transit (Carrier only)
  async receiveInTransit(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check if user is authorized as carrier
        const isCarrier = await this.isCarrier();
        if (!isCarrier) {
          throw new Error('Only carriers can receive products in transit. Please ensure your account has carrier permissions.');
        }

        // Check product state before attempting to receive
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be IN_TRANSIT (state 1) to receive in transit`);
        
        if (productState !== 1) {
          throw new Error(`Product must be in IN_TRANSIT state (1) to receive in transit. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Receiving product ${productId} in transit at ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.receiveInTransit.estimateGas(productId, location);
          console.log('Gas estimate for receiveInTransit:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for receiveInTransit:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.receiveInTransit(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Receive in transit transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product received in transit successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error receiving product in transit (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for receiveInTransit');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to receive product in transit. You may not be authorized as a carrier or the product doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to receive product in transit after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Deliver product to warehouse (Carrier only)
  async deliverToWarehouse(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check if user is authorized as carrier
        const isCarrier = await this.isCarrier();
        if (!isCarrier) {
          throw new Error('Only carriers can deliver products to warehouses. Please ensure your account has carrier permissions.');
        }

        // Check product state before attempting delivery
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be IN_TRANSIT (state 1) to deliver to warehouse`);
        
        if (productState !== 1) {
          throw new Error(`Product must be in IN_TRANSIT state (1) to deliver to warehouse. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Delivering product ${productId} to warehouse at ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.deliverToWarehouse.estimateGas(productId, location);
          console.log('Gas estimate for deliverToWarehouse:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for deliverToWarehouse:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.deliverToWarehouse(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Deliver to warehouse transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product delivered to warehouse successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error delivering product to warehouse (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for deliverToWarehouse');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to deliver product to warehouse. You may not be authorized as a carrier or the product doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to deliver product to warehouse after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Receive product by retailer (Retailer only)
  async receiveByRetailer(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check if user is authorized as retailer
        const isRetailer = await this.isRetailer();
        if (!isRetailer) {
          throw new Error('Only retailers can receive products. Please ensure your account has retailer permissions.');
        }

        // Check product state before attempting to receive
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be DISTRIBUTED (state 3) to receive by retailer`);
        
        if (productState !== 3) {
          throw new Error(`Product must be in DISTRIBUTED state (3) to receive by retailer. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Receiving product ${productId} by retailer at ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.receiveByRetailer.estimateGas(productId, location);
          console.log('Gas estimate for receiveByRetailer:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for receiveByRetailer:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.receiveByRetailer(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Receive by retailer transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product received by retailer successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error receiving product by retailer (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for receiveByRetailer');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to receive product by retailer. You may not be authorized as a retailer or the product doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to receive product by retailer after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Receive product by distributor (Distributor only)
  async receiveByDistributor(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check if user is authorized as distributor
        const isDistributor = await this.isDistributor();
        if (!isDistributor) {
          throw new Error('Only distributors can receive products. Please ensure your account has distributor permissions.');
        }

        // Check product state before attempting to receive
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be DISTRIBUTED (state 3) to receive by distributor`);
        
        if (productState !== 3) {
          throw new Error(`Product must be in DISTRIBUTED state (3) to receive by distributor. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Receiving product ${productId} by distributor at ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.receiveByDistributor.estimateGas(productId, location);
          console.log('Gas estimate for receiveByDistributor:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for receiveByDistributor:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.receiveByDistributor(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Receive by distributor transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product received by distributor successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error receiving product by distributor (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for receiveByDistributor');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to receive product by distributor. You may not be authorized as a distributor or the product doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to receive product by distributor after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Deliver product to customer (Distributor only)
  async deliverToRetailer(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check if user is authorized as distributor
        const isDistributor = await this.isDistributor();
        if (!isDistributor) {
          throw new Error('Only distributors can deliver products to retailers. Please ensure your account has distributor permissions.');
        }

        // Check product state before attempting to deliver
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be DISTRIBUTED (state 3) to deliver to retailer`);
        
        if (productState !== 3) {
          throw new Error(`Product must be in DISTRIBUTED state (3) to deliver to retailer. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Delivering product ${productId} to customer at ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.deliverToRetailer.estimateGas(productId, location);
          console.log('Gas estimate for deliverToRetailer:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for deliverToRetailer:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.deliverToRetailer(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Deliver to customer transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product delivered to customer successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error delivering product to customer (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for deliverToRetailer');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to deliver product to customer. You may not be authorized as a distributor or the product doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to deliver product to customer after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Ship product to distributor (Warehouse only)
  async shipToDistributor(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check if user is authorized as warehouse
        const isWarehouse = await this.isWarehouse();
        if (!isWarehouse) {
          throw new Error('Only warehouses can ship products to distributors. Please ensure your account has warehouse permissions.');
        }

        // Check product state before attempting to ship
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be IN_WAREHOUSE (state 2) to ship to distributor`);
        
        if (productState !== 2) {
          throw new Error(`Product must be in IN_WAREHOUSE state (2) to ship to distributor. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Shipping product ${productId} to distributor at ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.shipToDistributor.estimateGas(productId, location);
          console.log('Gas estimate for shipToDistributor:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for shipToDistributor:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.shipToDistributor(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Ship to distributor transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product shipped to distributor successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error shipping product to distributor (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for shipToDistributor');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to ship product to distributor. You may not be authorized as a warehouse or the product doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to ship product to distributor after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Receive product in warehouse (Warehouse only)
  async receiveInWarehouse(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check if user is authorized as warehouse
        const isWarehouse = await this.isWarehouse();
        if (!isWarehouse) {
          throw new Error('Only warehouses can receive products. Please ensure your account has warehouse permissions.');
        }

        // Check product state before attempting to receive
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be IN_WAREHOUSE (state 2) to receive in warehouse`);
        
        if (productState !== 2) {
          throw new Error(`Product must be in IN_WAREHOUSE state (2) to receive in warehouse. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Receiving product ${productId} in warehouse at ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.receiveInWarehouse.estimateGas(productId, location);
          console.log('Gas estimate for receiveInWarehouse:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for receiveInWarehouse:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.receiveInWarehouse(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Receive in warehouse transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product received in warehouse successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error receiving product in warehouse (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for receiveInWarehouse');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to receive product in warehouse. You may not be authorized as a warehouse or the product doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to receive product in warehouse after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Purchase product (Customer)
  async purchaseProduct(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check product state before attempting to purchase
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be IN_STORE (state 4) to purchase`);
        
        if (productState !== 4) {
          throw new Error(`Product must be in IN_STORE state (4) to purchase. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Purchasing product ${productId} at ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.purchaseProduct.estimateGas(productId, location);
          console.log('Gas estimate for purchaseProduct:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for purchaseProduct:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.purchaseProduct(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Purchase product transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product purchased successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error purchasing product (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for purchaseProduct');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to purchase product. The product may not be available for purchase or doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to purchase product after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Sell product to customer (Retailer only)
  async sellProduct(productId: number, location: string): Promise<void> {
    if (!this.contract) {
      console.error('Contract not initialized. Provider:', this.provider, 'Signer:', this.signer, 'Contract:', this.contract);
      throw new Error('Contract not initialized. Please ensure your wallet is connected and try refreshing the page.');
    }

    // Retry mechanism for intermittent network issues
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Check if user is authorized as retailer
        const isRetailer = await this.isRetailer();
        if (!isRetailer) {
          throw new Error('Only retailers can sell products. Please ensure your account has retailer permissions.');
        }

        // Check product state before attempting to sell
        const productState = await this.getProductState(productId);
        console.log(`Product ${productId} current state: ${productState} (${this.getProductStateString(productState)})`);
        console.log(`Product ${productId} must be IN_STORE (state 4) to sell`);
        
        if (productState !== 4) {
          throw new Error(`Product must be in IN_STORE state (4) to sell. Current state: ${productState} (${this.getProductStateString(productState)})`);
        }

        console.log(`Selling product ${productId} to customer at ${location} (attempt ${attempt}/${maxRetries})`);
        
        // First, let's check if the function exists and estimate gas
        try {
          const gasEstimate = await this.contract.sellProduct.estimateGas(productId, location);
          console.log('Gas estimate for sellProduct:', gasEstimate.toString());
        } catch (gasError: any) {
          console.error('Gas estimation failed for sellProduct:', gasError);
          // Continue with transaction even if gas estimation fails
        }
        
        const tx = await this.contract.sellProduct(productId, location, {
          gasLimit: 500000 // Set a reasonable gas limit
        });
        console.log('Sell product transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Product sold successfully:', {
          hash: tx.hash,
          blockNumber: receipt?.blockNumber,
          gasUsed: receipt?.gasUsed?.toString()
        });
        
        // If we get here, the transaction was successful
        return;
        
      } catch (error: any) {
        console.error(`Error selling product (attempt ${attempt}/${maxRetries}):`, error);
        lastError = error;
        
        // Don't retry for certain errors
        if (error.code === 'CALL_EXCEPTION' || 
            error.code === 'INSUFFICIENT_FUNDS' || 
            error.code === 'USER_REJECTED') {
          break;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    console.error('All retry attempts failed for sellProduct');
    
    if (lastError.code === 'CALL_EXCEPTION') {
      throw new Error(`Failed to sell product. You may not be authorized as a retailer or the product doesn't exist.`);
    } else if (lastError.code === 'INSUFFICIENT_FUNDS') {
      throw new Error('Insufficient funds for gas. Please add more ETH to your wallet.');
    } else if (lastError.code === 'USER_REJECTED') {
      throw new Error('Transaction was rejected by user.');
    } else if (lastError.code === 'UNPREDICTABLE_GAS_LIMIT') {
      throw new Error('Unable to estimate gas. The transaction may fail. Please try again.');
    } else if (lastError.message && lastError.message.includes('Internal JSON-RPC error')) {
      throw new Error('Network error occurred after multiple attempts. Please try again later.');
    } else {
      throw new Error(`Failed to sell product after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  // Check if user is connected
  isConnected(): boolean {
    return this.contract !== null && this.signer !== null;
  }

  // Get product state as string
  getProductStateString(state: number): string {
    switch (state) {
      case ProductState.PRODUCED:
        return 'Produced';
      case ProductState.IN_TRANSIT:
        return 'In Transit';
      case ProductState.IN_WAREHOUSE:
        return 'In Warehouse';
      case ProductState.DISTRIBUTED:
        return 'Distributed';
      case ProductState.IN_STORE:
        return 'In Store';
      case ProductState.SOLD:
        return 'Sold';
      default:
        return 'Unknown';
    }
  }

  // Format timestamp to readable date
  formatTimestamp(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }

  // Role checking functions
  async isProducer(address?: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const checkAddress = address || await this.getCurrentAccount();
      return await this.contract.isProducer(checkAddress);
    } catch (error) {
      console.error('Error checking producer role:', error);
      return false;
    }
  }

  async isCarrier(address?: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const checkAddress = address || await this.getCurrentAccount();
      return await this.contract.isCarrier(checkAddress);
    } catch (error) {
      console.error('Error checking carrier role:', error);
      return false;
    }
  }

  async isWarehouse(address?: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const checkAddress = address || await this.getCurrentAccount();
      return await this.contract.isWarehouse(checkAddress);
    } catch (error) {
      console.error('Error checking warehouse role:', error);
      return false;
    }
  }

  async isDistributor(address?: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const checkAddress = address || await this.getCurrentAccount();
      return await this.contract.isDistributor(checkAddress);
    } catch (error) {
      console.error('Error checking distributor role:', error);
      return false;
    }
  }

  async isRetailer(address?: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const checkAddress = address || await this.getCurrentAccount();
      return await this.contract.isRetailer(checkAddress);
    } catch (error) {
      console.error('Error checking retailer role:', error);
      return false;
    }
  }

  // Get user roles
  async getUserRoles(address?: string): Promise<{
    isProducer: boolean;
    isCarrier: boolean;
    isWarehouse: boolean;
    isDistributor: boolean;
    isRetailer: boolean;
  }> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const checkAddress = address || await this.getCurrentAccount();
      const [isProducer, isCarrier, isWarehouse, isDistributor, isRetailer] = await Promise.all([
        this.contract.isProducer(checkAddress),
        this.contract.isCarrier(checkAddress),
        this.contract.isWarehouse(checkAddress),
        this.contract.isDistributor(checkAddress),
        this.contract.isRetailer(checkAddress)
      ]);

      return {
        isProducer,
        isCarrier,
        isWarehouse,
        isDistributor,
        isRetailer
      };
    } catch (error) {
      console.error('Error getting user roles:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const blockchainService = new BlockchainService();

// All interfaces and enums are already exported above
