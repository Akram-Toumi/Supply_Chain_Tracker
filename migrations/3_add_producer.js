const SupplyChain = artifacts.require("SupplyChain");

module.exports = async function (deployer, network, accounts) {
  const supplyChain = await SupplyChain.deployed();
  
  // Get the first account (the one that deployed the contract)
  const owner = accounts[0];
  
  console.log("Contract owner:", owner);
  console.log("Available accounts:", accounts);
  
  // Add the owner as a producer (they can create products)
  try {
    await supplyChain.addProducer(owner);
    console.log("Successfully added owner as producer");
  } catch (error) {
    console.error("Error adding producer:", error);
  }
  
  // You can add more accounts as producers here if needed
  // await supplyChain.addProducer(accounts[1]);
  // await supplyChain.addProducer(accounts[2]);
};

