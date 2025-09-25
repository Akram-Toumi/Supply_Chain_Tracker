const SupplyChain = artifacts.require("SupplyChain");

module.exports = async function (deployer, network, accounts) {
  const supplyChain = await SupplyChain.deployed();
  const owner = accounts[0];

  console.log("Contract owner:", owner);
  console.log("Available accounts:", accounts);

  // Add the owner as a warehouse
  try {
    await supplyChain.addWarehouse(owner);
    console.log("Successfully added owner as warehouse");
  } catch (error) {
    console.error("Error adding warehouse:", error);
  }
};


