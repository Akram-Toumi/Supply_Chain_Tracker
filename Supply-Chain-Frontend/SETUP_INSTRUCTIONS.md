# Setup Instructions for Blockchain Supply Chain

## 🚀 **Quick Setup Guide**

### 1. **Start Ganache (Local Blockchain)**
Make sure Ganache is running on port 7545 with the default settings.

### 2. **Configure MetaMask**
1. Open MetaMask
2. Click on the network dropdown (usually shows "Ethereum Mainnet")
3. Click "Add Network" → "Add a network manually"
4. Enter the following details:
   - **Network Name**: `Ganache Local`
   - **RPC URL**: `http://127.0.0.1:7545`
   - **Chain ID**: `5777`
   - **Currency Symbol**: `ETH`
   - **Block Explorer URL**: (leave empty)

### 3. **Import Account**
1. In MetaMask, click on the account icon (top right)
2. Click "Import Account"
3. Select "Private Key"
4. Use one of these private keys from Ganache:
   - **Account 1** (Owner/Producer): `0xFF87103fc5B3163e89B5e238e7fB70f4ef8fbdb8`
   - **Account 2**: `0x42638a3E02561Af8E7762b3ce7614350D1dc94E4`
   - **Account 3**: `0x777882C7297Dd766A82272b255A2212bf74Cb87b`
   - (Or any other account from the Ganache list)

### 4. **Switch to Ganache Network**
1. In MetaMask, select the "Ganache Local" network
2. Make sure you're using Account 1 (the owner account) for full functionality

### 5. **Test the Application**
1. Open the frontend: `http://localhost:5173`
2. Navigate to the Producer Dashboard
3. Click "Connect Wallet"
4. You should see the connection status and contract info
5. Try creating a product!

## 🔧 **Troubleshooting**

### **Issue: "Contract not accessible"**
- Make sure Ganache is running
- Check that you're on the correct network (Chain ID: 5777)
- Verify the contract address in the debug info

### **Issue: "Transaction failed"**
- Make sure you're using Account 1 (the owner account)
- Check that you have sufficient ETH (should have 100 ETH in Ganache)
- Try refreshing the page

### **Issue: "Failed to create product"**
- Ensure you're connected to the correct account
- Check the browser console for detailed error messages
- Verify the contract is deployed and accessible

## 📋 **Account Information**

**Owner Account (Recommended):**
- Address: `0xFF87103fc5B3163e89B5e238e7fB70f4ef8fbdb8`
- Role: Owner + Producer (can create products)
- Balance: 100 ETH

**Other Accounts:**
- These are regular accounts without special permissions
- They can view products but cannot create them
- To give them producer access, the owner needs to call `addProducer()`

## 🎯 **What You Can Do**

### **As Owner/Producer:**
- ✅ Connect wallet
- ✅ View all products
- ✅ Create new products
- ✅ View product history
- ✅ Add other accounts as producers

### **As Regular User:**
- ✅ Connect wallet
- ✅ View all products
- ✅ View product history
- ❌ Cannot create products (need producer role)

## 🔄 **Contract Details**

- **Address**: `0x397F1Edab67DCa41095e7abF455dC41c633eAeAA`
- **Network**: Ganache Local (Chain ID: 5777)
- **Owner**: `0xFF87103fc5B3163e89B5e238e7fB70f4ef8fbdb8`
- **Product States**: PRODUCED → IN_TRANSIT → IN_WAREHOUSE → DISTRIBUTED → IN_STORE → SOLD

## 🚨 **Important Notes**

1. **Use Account 1** for full functionality
2. **Keep Ganache running** while using the application
3. **Don't close Ganache** or you'll lose all data
4. **Each restart** of Ganache creates a fresh blockchain state

## 🎉 **Success Indicators**

When everything is working correctly, you should see:
- ✅ Green connection status
- ✅ Contract address displayed
- ✅ "Contract accessible" message
- ✅ Ability to create products
- ✅ Products list updates after creation
