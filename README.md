# Supply Chain Tracker

A blockchain-based supply chain tracking system built with Ethereum, Truffle, and React.

## 🚀 Features

- **Product Tracking**: Track products through the entire supply chain
- **Role-Based Access**: Secure access control for different stakeholders
- **Real-Time Updates**: Live blockchain updates for product status
- **Transparent History**: Complete audit trail of product movements
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## 🏗️ Architecture

### Smart Contract
- **SupplyChain.sol**: Main contract managing product lifecycle
- **Role Management**: Producer, Carrier, Warehouse, Distributor, Retailer
- **State Tracking**: PRODUCED → IN_TRANSIT → IN_WAREHOUSE → DISTRIBUTED → IN_STORE → SOLD

### Frontend
- **React + TypeScript**: Modern frontend framework
- **Tailwind CSS**: Utility-first CSS framework
- **Ethers.js**: Ethereum blockchain interaction
- **React Router**: Client-side routing

## 🛠️ Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Environment Configuration

1. **Copy the environment template**:
   ```bash
   cp env.example .env
   ```

2. **Configure your environment variables** in `.env`:
   ```bash
   # Blockchain Configuration
   VITE_CONTRACT_ADDRESS=
   VITE_RPC_URL=http://127.0.0.1:7545
   VITE_RPC_URL_BACKUP=http://127.0.0.1:8545
   VITE_CHAIN_ID=1337
   VITE_CHAIN_NAME=Ganache Local

   # Truffle Configuration
   TRUFFLE_HOST=127.0.0.1
   TRUFFLE_PORT=7545
   TRUFFLE_NETWORK_ID=*
   ```

3. **For the frontend**, also copy the frontend environment template:
   ```bash
   cd Supply-Chain-Frontend
   cp env.example .env.local
   ```
- Ganache or local Ethereum node
- MetaMask browser extension

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Supply_Chain_Tracker
   ```

2. **Install dependencies**
   ```bash
   # Install smart contract dependencies
   npm install
   
   # Install frontend dependencies
   cd Supply-Chain-Frontend
   npm install
   cd ..
   ```

3. **Start Ganache**
   - Open Ganache GUI
   - Create a new workspace
   - Note the RPC URL (usually `http://127.0.0.1:7545`)

4. **Deploy smart contracts**
   ```bash
   truffle migrate --reset
   ```

5. **Start the frontend**
   ```bash
   npm run dev
   ```

## 📱 Usage

### 1. Connect Wallet
- Open the application in your browser
- Click "Connect Wallet" to connect MetaMask
- Ensure you're on the correct network (Ganache)

### 2. Create Product (Producer)
- Navigate to Producer Dashboard
- Click "Create Product"
- Enter product details
- Product starts in "PRODUCED" state

### 3. Ship Product (Producer)
- Select a product in "PRODUCED" state
- Click "Ship Product"
- Enter destination location
- Product moves to "IN_TRANSIT" state

### 4. Receive in Transit (Carrier)
- Select a product in "IN_TRANSIT" state
- Click "Receive in Transit"
- Enter current location
- Product remains in "IN_TRANSIT" state

### 5. Deliver to Warehouse (Carrier)
- Select a product in "IN_TRANSIT" state
- Click "Deliver to Warehouse"
- Enter warehouse location
- Product moves to "IN_WAREHOUSE" state

### 6. Continue Supply Chain Flow
- Follow similar steps for warehouse, distributor, and retailer operations
- Each role can only perform specific actions based on product state

## 🔧 Development

### Smart Contract Development
```bash
# Compile contracts
truffle compile

# Run tests
truffle test

# Deploy to network
truffle migrate --network <network-name>
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
```

## 📁 Project Structure

```
Supply_Chain_Tracker/
├── contracts/                 # Smart contracts
│   ├── Migrations.sol
│   └── SupplyChain.sol
├── migrations/               # Deployment scripts
│   ├── 1_initial_migration.js
│   ├── 2_deploy_contracts.js
│   └── 3-7_add_roles.js
├── build/                    # Compiled contracts
├── Supply-Chain-Frontend/    # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # Blockchain services
│   │   └── types/          # TypeScript types
│   └── public/             # Static assets
└── truffle-config.js       # Truffle configuration
```

## 🔐 Security

- **Role-Based Access Control**: Only authorized users can perform specific actions
- **State Validation**: Products can only transition through valid states
- **Ownership Verification**: Users can only modify products they own
- **Input Validation**: All inputs are validated before blockchain transactions

## 🚀 Deployment

### Local Development
1. Start Ganache
2. Deploy contracts: `truffle migrate --reset`
3. Start frontend: `npm run dev`

### Production Deployment
1. Deploy contracts to mainnet/testnet
2. Update contract address in frontend
3. Build frontend: `npm run build`
4. Deploy to hosting service


## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

---

