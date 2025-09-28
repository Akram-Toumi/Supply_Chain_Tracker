# Supply Chain Tracker - Frontend

A modern, responsive React application for blockchain-based supply chain management. This frontend provides role-based dashboards and tools for different stakeholders in the supply chain ecosystem.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Environment Configuration](#-environment-configuration)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Role-Based Access](#-role-based-access)
- [Development](#-development)
- [Building & Deployment](#-building--deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

This frontend application enables comprehensive supply chain management with role-based access for different stakeholders. It provides transparent tracking of products from production to delivery, ensuring authenticity verification and efficient logistics management using blockchain technology.

## ✨ Features

### 🔐 Authentication & Security
- **Role-Based Authentication**: Secure login and signup with role-specific access control
- **Protected Routes**: Role-based routing ensures users only access authorized pages
- **Wallet Integration**: MetaMask integration for blockchain interactions

### 👥 Role-Specific Dashboards
- **🏭 Producer Dashboard**: Manage products, batches, certifications, and analytics
- **🚚 Distributor Dashboard**: Handle inventory, orders, verification, and analytics
- **🚛 Transporter Dashboard**: Track shipments, routes, reports, and real-time tracking
- **🏪 Warehouse Dashboard**: Manage storage, shipments, and inventory overview
- **🛒 Consumer Dashboard**: Scan products for authenticity, view history, and overview

### 🎨 User Experience
- **Responsive Design**: Modern UI with sidebar navigation, navbar, and footer
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **Real-Time Updates**: Live blockchain updates for product status changes
- **Product Lifecycle Tracking**: End-to-end visibility from production to consumer

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (fast development and building)
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API
- **Routing**: React Router with protected routes
- **Blockchain Integration**: Ethers.js for Ethereum interactions
- **Code Quality**: ESLint with TypeScript support
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MetaMask** browser extension
- **Git** (for version control)

## 🚀 Quick Start

### 1. Clone the Repository
   ```bash
   git clone https://github.com/Akram-Toumi/Supply_Chain_Tracker.git
   cd Supply-Chain-Frontend
   ```

### 2. Install Dependencies
   ```bash
   npm install
   ```

### 3. Environment Setup
```bash
# Copy environment template
cp env.example .env.local
```

### 4. Start Development Server
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## ⚙️ Environment Configuration

Configure the following variables in `.env.local`:

```bash
# Blockchain Configuration
VITE_CONTRACT_ADDRESS=your_contract_address_here
VITE_RPC_URL=http://127.0.0.1:7545
VITE_RPC_URL_BACKUP=http://127.0.0.1:8545
VITE_CHAIN_ID=1337
VITE_CHAIN_NAME=Ganache Local

# API Configuration (if needed)
VITE_API_URL=http://localhost:3001/api

# Development Configuration
VITE_APP_PORT=5173
```

### Environment Variables Explained

- **VITE_CONTRACT_ADDRESS**: The deployed smart contract address
- **VITE_RPC_URL**: Primary RPC URL for blockchain connection
- **VITE_RPC_URL_BACKUP**: Backup RPC URL for failover
- **VITE_CHAIN_ID**: Blockchain network chain ID (1337 for Ganache)
- **VITE_CHAIN_NAME**: Human-readable network name
- **VITE_API_URL**: Backend API URL (if using external API)

## 📁 Project Structure

```
src/
├── App.tsx                    # Main application component with routing
├── main.tsx                   # Application entry point
├── App.css                    # Global application styles
├── index.css                  # Tailwind CSS imports and global styles
├── vite-env.d.ts             # Vite TypeScript declarations
├── assets/                    # Static images and assets
│   ├── react.svg
│   └── vite.svg
├── components/                # Reusable UI components
│   ├── BlockchainStatus.tsx   # Blockchain connection status
│   ├── DashboardSidebar.tsx   # Main navigation sidebar
│   ├── Logo.tsx              # Application logo component
│   ├── NetworkChecker.tsx    # Network validation component
│   ├── ProductDetailsModal.tsx # Product details modal
│   ├── RoleBasedRoute.tsx    # Protected route wrapper
│   └── WalletConnection.tsx  # Wallet connection component
├── contexts/                  # React contexts for state management
│   └── BlockchainContext.tsx # Blockchain state management
├── layouts/                   # Page layout components
│   ├── Footer.tsx            # Application footer
│   ├── Layout.tsx            # Main layout wrapper
│   ├── Navbar.tsx            # Top navigation bar
│   └── Sidebar.tsx           # Sidebar layout component
├── pages/                     # Route-specific pages
│   ├── Landing.tsx           # Landing page
│   ├── CustomerDashboard.tsx # Customer dashboard
│   ├── DistributorDashboard.tsx # Distributor dashboard
│   ├── ProducerDashboard.tsx # Producer dashboard
│   ├── RetailerDashboard.tsx # Retailer dashboard
│   ├── TransporterDashboard.tsx # Transporter dashboard
│   ├── WarehouseDashboard.tsx # Warehouse dashboard
│   ├── customer/             # Customer-specific pages
│   │   ├── CustomerOverview.tsx
│   │   └── ProductAuthenticity.tsx
│   ├── distributor/          # Distributor-specific pages
│   │   ├── DistributorInventory.tsx
│   │   └── DistributorOverview.tsx
│   ├── producer/             # Producer-specific pages
│   │   ├── ProducerOverview.tsx
│   │   └── ProductsList.tsx
│   ├── retailer/             # Retailer-specific pages
│   │   ├── ProductScanner.tsx
│   │   └── RetailerOverview.tsx
│   ├── transporter/          # Transporter-specific pages
│   │   ├── TransporterOverview.tsx
│   │   └── TransporterReceive.tsx
│   └── warehouse/            # Warehouse-specific pages
│       ├── WarehouseOverview.tsx
│       ├── WarehouseReceive.tsx
│       └── WarehouseShipments.tsx
├── services/                  # Business logic services
│   └── blockchainService.ts  # Blockchain interaction service
└── types/                     # TypeScript type definitions
    ├── auth.ts               # Authentication types
    ├── ethereum.d.ts         # Ethereum type declarations
    └── producer.ts           # Producer-related types
```

## 📱 Usage Guide

### 1. Authentication
- Navigate to the application in your browser
- Click "Connect Wallet" to connect MetaMask
- Ensure you're on the correct network (Ganache)
- Switch to the correct network if prompted

### 2. Role-Based Navigation
- **Producers**: Access product creation, batch management, and analytics
- **Distributors**: Manage inventory, orders, and verification processes
- **Transporters**: Track shipments, create routes, and monitor deliveries
- **Warehouses**: Handle storage, incoming/outgoing shipments
- **Retailers**: Manage store inventory and product scanning
- **Consumers**: Verify product authenticity and view purchase history

### 3. Key Workflows

#### Producer Workflow
1. **Create Products**: Add new products with detailed information
2. **Manage Batches**: Organize products into batches for tracking
3. **Track Analytics**: Monitor production metrics and performance

#### Distributor Workflow
1. **Verify Shipments**: Validate incoming products from producers
2. **Manage Inventory**: Track stock levels and product availability
3. **Process Orders**: Handle distribution to retailers

#### Transporter Workflow
1. **Create Routes**: Plan delivery routes and schedules
2. **Track Shipments**: Monitor real-time shipment status
3. **Update Locations**: Provide location updates during transit

#### Warehouse Workflow
1. **Receive Products**: Accept and log incoming shipments
2. **Manage Storage**: Organize and track stored products
3. **Process Shipments**: Prepare products for distribution

#### Retailer Workflow
1. **Scan Products**: Use QR codes to verify product authenticity
2. **Manage Inventory**: Track store stock and sales
3. **Process Sales**: Complete customer transactions

#### Consumer Workflow
1. **Verify Authenticity**: Scan products to confirm legitimacy
2. **View History**: Access complete product journey information
3. **Track Purchases**: Monitor personal purchase history

## 🔐 Role-Based Access

The application implements comprehensive role-based access control:

- **RoleBasedRoute.tsx**: Protects routes based on user role from AuthContext
- **Automatic Redirects**: Users are redirected to appropriate dashboards upon login
- **Unauthorized Access**: Unauthorized access attempts redirect to login or landing page
- **Context Management**: BlockchainContext manages user authentication state

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking (if configured)
npm run type-check
```

### Development Guidelines

- **Tailwind Configuration**: Customize styles in `tailwind.config.js`
- **Vite Configuration**: Modify `vite.config.ts` for plugins or server options
- **TypeScript**: Strict mode enabled; extend types in `src/types/`
- **Component Structure**: Follow the established component organization
- **State Management**: Use React Context for global state management

### Code Quality

- **ESLint**: Configured with TypeScript support for code quality
- **TypeScript**: Strict type checking enabled
- **Component Organization**: Logical grouping of components by functionality
- **Naming Conventions**: Consistent naming for components, files, and functions

## 🚀 Building & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
   ```bash
   npm run build
   ```
   Output will be in the `dist/` directory.

### Deployment Options

1. **Static Hosting**: Deploy the `dist/` folder to services like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

2. **Environment Variables**: Configure production environment variables in your hosting platform

3. **Domain Configuration**: Set up custom domain and HTTPS

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests if applicable
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and structure
- Add comments for complex logic
- Write tests for new features
- Update documentation as needed
- Ensure TypeScript types are properly defined

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for transparent supply chain management**

For support or questions, open an issue on [GitHub](https://github.com/Akram-Toumi/Supply_Chain_Tracker).