# Supply Chain Tracker

A blockchain-based supply chain tracking system built with Ethereum, Truffle, and React that provides transparent, immutable tracking of products through the entire supply chain lifecycle.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Environment Configuration](#-environment-configuration)
- [Usage Guide](#-usage-guide)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## 🚀 Features

- **🔍 Product Tracking**: Track products through the entire supply chain from production to sale
- **👥 Role-Based Access**: Secure access control for different stakeholders (Producer, Carrier, Warehouse, Distributor, Retailer)
- **⚡ Real-Time Updates**: Live blockchain updates for product status changes
- **📜 Transparent History**: Complete audit trail of product movements and state changes
- **🎨 Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **🔒 Immutable Records**: All transactions are recorded on the blockchain for transparency

## 🏗️ Architecture

### Smart Contract Layer
- **SupplyChain.sol**: Main contract managing product lifecycle and state transitions
- **Role Management**: Secure role-based access control for different stakeholders
- **State Machine**: Products follow a defined state flow: `PRODUCED → IN_TRANSIT → IN_WAREHOUSE → DISTRIBUTED → IN_STORE → SOLD`

### Frontend Layer
- **React + TypeScript**: Modern frontend framework with type safety
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Ethers.js**: Ethereum blockchain interaction and wallet integration
- **React Router**: Client-side routing for different user roles

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Ganache** (for local blockchain development)
- **MetaMask** browser extension
- **Git** (for version control)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Supply_Chain_Tracker
```

### 2. Install Dependencies
```bash
# Install smart contract dependencies
npm install

# Install frontend dependencies
cd Supply-Chain-Frontend
npm install
cd ..
```

### 3. Environment Setup
```bash
# Copy environment templates
cp env.example .env
cd Supply-Chain-Frontend
cp env.example .env.local
cd ..
```

### 4. Start Development Environment
```bash
# Start Ganache (GUI or CLI)
# Note the RPC URL (usually http://127.0.0.1:7545)

# Deploy smart contracts
truffle migrate --reset

# Start the frontend development server
npm run dev
```

The application will be available at `http://localhost:5173`.

## ⚙️ Environment Configuration

### Backend Configuration (`.env`)
```bash
# Blockchain Configuration
VITE_CONTRACT_ADDRESS=your_contract_address_here
VITE_RPC_URL=http://127.0.0.1:7545
VITE_RPC_URL_BACKUP=http://127.0.0.1:8545
VITE_CHAIN_ID=1337
VITE_CHAIN_NAME=Ganache Local

# Truffle Configuration
TRUFFLE_HOST=127.0.0.1
TRUFFLE_PORT=7545
TRUFFLE_NETWORK_ID=*
```

### Frontend Configuration (`.env.local`)
```bash
# Blockchain Configuration
VITE_CONTRACT_ADDRESS=your_contract_address_here
VITE_RPC_URL=http://127.0.0.1:7545
VITE_RPC_URL_BACKUP=http://127.0.0.1:8545
VITE_CHAIN_ID=1337
VITE_CHAIN_NAME=Ganache Local

# API Configuration (if needed)
VITE_API_URL=http://localhost:3001/api
```

## 📱 Usage Guide

### 1. Wallet Connection
- Open the application in your browser
- Click "Connect Wallet" to connect MetaMask
- Ensure you're on the correct network (Ganache)
- Switch to the correct network if prompted

### 2. Producer Workflow
- Navigate to **Producer Dashboard**
- **Create Product**: Enter product details and create new products
- **Ship Product**: Move products from "PRODUCED" to "IN_TRANSIT" state
- **Track Products**: Monitor all products you've created

### 3. Carrier Workflow
- Navigate to **Transporter Dashboard**
- **Receive in Transit**: Accept products in "IN_TRANSIT" state
- **Update Location**: Track current location during transport
- **Deliver to Warehouse**: Move products to "IN_WAREHOUSE" state

### 4. Warehouse Workflow
- Navigate to **Warehouse Dashboard**
- **Receive Products**: Accept products from carriers
- **Manage Inventory**: Track products in storage
- **Ship to Distributor**: Move products to "DISTRIBUTED" state

### 5. Distributor Workflow
- Navigate to **Distributor Dashboard**
- **Receive Products**: Accept products from warehouses
- **Manage Distribution**: Track distribution to retailers
- **Update Status**: Move products to "IN_STORE" state

### 6. Retailer Workflow
- Navigate to **Retailer Dashboard**
- **Receive Products**: Accept products from distributors
- **Manage Sales**: Track products in store
- **Complete Sale**: Move products to "SOLD" state

## 🔧 Development

### Smart Contract Development
```bash
# Compile contracts
truffle compile

# Run tests
truffle test

# Deploy to specific network
truffle migrate --network <network-name>

# Reset and redeploy
truffle migrate --reset
```

### Frontend Development
```bash
cd Supply-Chain-Frontend

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Testing
```bash
# Test smart contracts
truffle test

# Test frontend (if test suite exists)
cd Supply-Chain-Frontend
npm test
```

## 📁 Project Structure

```
Supply_Chain_Tracker/
├── contracts/                    # Smart contracts
│   ├── Migrations.sol           # Truffle migration contract
│   └── SupplyChain.sol          # Main supply chain contract
├── migrations/                   # Deployment scripts
│   ├── 1_initial_migration.js
│   ├── 2_deploy_contracts.js
│   └── 3-7_add_roles.js         # Role assignment scripts
├── build/                        # Compiled contracts (auto-generated)
├── Supply-Chain-Frontend/        # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── BlockchainStatus.tsx
│   │   │   ├── NetworkChecker.tsx
│   │   │   └── WalletConnection.tsx
│   │   ├── pages/              # Page components
│   │   │   ├── producer/       # Producer-specific pages
│   │   │   ├── transporter/    # Transporter-specific pages
│   │   │   ├── warehouse/      # Warehouse-specific pages
│   │   │   ├── distributor/    # Distributor-specific pages
│   │   │   └── retailer/       # Retailer-specific pages
│   │   ├── contexts/           # React contexts
│   │   │   └── BlockchainContext.tsx
│   │   ├── services/           # Business logic services
│   │   │   └── blockchainService.ts
│   │   └── types/              # TypeScript type definitions
│   ├── public/                 # Static assets
│   └── package.json           # Frontend dependencies
├── env.example                 # Environment variables template
├── truffle-config.js          # Truffle configuration
└── package.json               # Project dependencies
```

## 🔐 Security

- **🔑 Role-Based Access Control**: Only authorized users can perform specific actions based on their role
- **✅ State Validation**: Products can only transition through valid states according to business rules
- **👤 Ownership Verification**: Users can only modify products they own or have permission to handle
- **🛡️ Input Validation**: All inputs are validated before blockchain transactions to prevent malicious data
- **🔒 Immutable Records**: All transactions are permanently recorded on the blockchain

## 🚀 Deployment

### Local Development
1. Start Ganache (GUI or CLI)
2. Deploy contracts: `truffle migrate --reset`
3. Start frontend: `npm run dev`
4. Access application at `http://localhost:5173`

### Production Deployment
1. **Deploy Smart Contracts**:
   - Deploy contracts to mainnet/testnet
   - Update contract address in environment variables
   - Verify contract deployment

2. **Deploy Frontend**:
   - Build frontend: `npm run build`
   - Deploy to hosting service (Vercel, Netlify, etc.)
   - Configure environment variables in hosting platform

3. **Configure Domain**:
   - Set up custom domain (optional)
   - Configure HTTPS
   - Update MetaMask network settings

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests if applicable
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

- 📖 **Check the documentation** in this README
- 🔍 **Review the code comments** for implementation details
- 🐛 **Open an issue** on GitHub with detailed information
- 💬 **Join our community** discussions

---

**Made with ❤️ for transparent supply chain management**

---