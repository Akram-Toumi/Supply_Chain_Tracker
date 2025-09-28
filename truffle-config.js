require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: process.env.TRUFFLE_HOST || "127.0.0.1",
      port: parseInt(process.env.TRUFFLE_PORT) || 7545,
      network_id: process.env.TRUFFLE_NETWORK_ID || "*" 
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};