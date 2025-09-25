# Blockchain Integration Guide

This document explains how the Supply Chain Frontend integrates with the blockchain smart contract.

## Overview

The frontend now connects to the SupplyChain smart contract deployed at address `0x397F1Edab67DCa41095e7abF455dC41c633eAeAA` on the blockchain network.

## Features Implemented

### 1. Wallet Connection
- **MetaMask Integration**: Users can connect their MetaMask wallet to interact with the blockchain
- **Account Management**: Display connected wallet address and connection status
- **Error Handling**: Proper error messages for connection issues

### 2. Product Management
- **View Products**: Display all products from the blockchain
- **Create Products**: Add new products to the blockchain
- **Product History**: View detailed transaction history for each product
- **Real-time Updates**: Products list updates after creating new products

### 3. Blockchain Service
- **Contract Interaction**: Direct communication with the smart contract
- **Type Safety**: TypeScript interfaces for all blockchain data
- **Error Handling**: Comprehensive error handling for blockchain operations

## Files Added/Modified

### New Files
- `src/services/blockchainService.ts` - Core blockchain interaction service
- `src/contexts/BlockchainContext.tsx` - React context for blockchain state management
- `src/components/WalletConnection.tsx` - Wallet connection component
- `src/components/ProductDetailsModal.tsx` - Product details and history modal
- `src/types/ethereum.d.ts` - TypeScript declarations for MetaMask

### Modified Files
- `src/App.tsx` - Added BlockchainProvider wrapper
- `src/pages/producer/ProductsList.tsx` - Integrated with blockchain data

## Smart Contract Functions Used

### View Functions
- `productCount()` - Get total number of products
- `products(uint256)` - Get product details by ID
- `getProductHistory(uint256)` - Get transaction history for a product

### Write Functions
- `createProduct(string)` - Create a new product

## Product States

The smart contract defines the following product states:
- `0` - CREATED
- `1` - SHIPPED
- `2` - IN_TRANSIT
- `3` - RECEIVED
- `4` - SOLD

## Usage Instructions

### 1. Prerequisites
- MetaMask browser extension installed
- MetaMask connected to the correct network (where the contract is deployed)
- Sufficient ETH for gas fees

### 2. Connecting Wallet
1. Click "Connect Wallet" button
2. MetaMask will prompt for connection
3. Approve the connection
4. Wallet address will be displayed

### 3. Creating Products
1. Ensure wallet is connected
2. Click "Add Product" button
3. Enter product name
4. Click "Create Product"
5. Confirm transaction in MetaMask
6. Product will appear in the list after confirmation

### 4. Viewing Product Details
1. Click the eye icon next to any product
2. View detailed transaction history
3. See state changes and actors involved

## Error Handling

The integration includes comprehensive error handling for:
- Wallet connection failures
- Transaction rejections
- Network errors
- Contract interaction failures

## Security Considerations

- All transactions require user approval in MetaMask
- Private keys are never exposed to the frontend
- Contract interactions are read-only unless explicitly authorized by user

## Future Enhancements

Potential future features:
- Product state transitions (ship, receive, sell)
- Batch operations
- Event listening for real-time updates
- Multi-signature support
- Gas optimization

## Troubleshooting

### Common Issues

1. **"MetaMask not installed"**
   - Install MetaMask browser extension
   - Refresh the page

2. **"Transaction failed"**
   - Check if you have sufficient ETH for gas
   - Ensure you're on the correct network
   - Try increasing gas limit

3. **"Contract not found"**
   - Verify contract address is correct
   - Check if contract is deployed on current network

4. **"Products not loading"**
   - Check network connection
   - Verify contract address
   - Check browser console for errors

## Development

To extend the blockchain integration:

1. Add new functions to `blockchainService.ts`
2. Update the ABI with new contract functions
3. Add corresponding UI components
4. Update the context with new state management

## Contract Address

```
0x397F1Edab67DCa41095e7abF455dC41c633eAeAA
```

This address should be updated if the contract is redeployed.
