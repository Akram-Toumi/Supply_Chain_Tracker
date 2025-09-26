# Customer Dashboard

The Customer Dashboard allows customers to browse products available in retail stores and verify their authenticity using blockchain technology.

## Features

### 1. Store Products Overview (`/customer`)
- View all products available in retail stores
- Search and filter products by name, ID, or status
- See product details including producer information
- View product categories and statistics
- Expandable product cards with detailed information

### 2. Product Scanner (`/customer/scan`)
- Scan or manually enter product IDs
- Real-time blockchain verification
- View complete product information
- Display supply chain history
- Authenticity verification status

### 3. Product History (`/customer/history`)
- Search for any product by ID
- View complete supply chain timeline
- See all actors involved in the product's journey
- Track state changes and locations
- Chronological transaction history

### 4. Product Authenticity Verification (`/customer/verify`)
- Comprehensive authenticity verification
- Multiple blockchain-based checks:
  - Blockchain verification
  - Supply chain integrity
  - State progression validation
  - Producer verification
  - Timestamp validation
- Authenticity score and confidence level
- Detailed verification report

## How It Works

1. **Product Discovery**: Customers can browse products that are currently in stores or have been sold
2. **QR Code Scanning**: Customers can scan QR codes or manually enter product IDs
3. **Blockchain Verification**: The system queries the blockchain to verify product authenticity
4. **History Tracking**: Complete supply chain history is displayed with all actors and locations
5. **Authenticity Scoring**: Multiple verification checks provide an authenticity percentage

## Technical Implementation

- **React Components**: Modular dashboard with separate pages for different functions
- **Blockchain Integration**: Uses the existing `BlockchainContext` for smart contract interactions
- **Real-time Verification**: Direct blockchain queries for up-to-date information
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Error Handling**: Comprehensive error handling for blockchain operations

## User Experience

- **Intuitive Interface**: Clean, modern design following the existing app theme
- **Real-time Feedback**: Immediate verification results and status updates
- **Comprehensive Information**: Detailed product information and supply chain transparency
- **Easy Navigation**: Simple sidebar navigation between different functions
- **Mobile Responsive**: Works on all device sizes

## Security Features

- **Blockchain Verification**: All data comes directly from the immutable blockchain
- **No Data Tampering**: Supply chain history cannot be modified
- **Producer Validation**: Verified producer addresses
- **Timestamp Validation**: Chronological verification of all transactions
- **State Progression Checks**: Validates proper supply chain flow

## Usage

1. Navigate to `/customer` from the landing page
2. Connect your wallet to access blockchain data
3. Browse available products or use the scanner
4. Verify product authenticity and view complete history
5. Share verification results or download reports

The Customer Dashboard provides complete transparency and trust in the supply chain, allowing customers to make informed decisions about the products they purchase.
