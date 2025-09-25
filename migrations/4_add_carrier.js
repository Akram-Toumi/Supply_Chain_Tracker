const SupplyChain = artifacts.require("SupplyChain");

module.exports = async function (deployer, network, accounts) {
  const supplyChain = await SupplyChain.deployed();
  const owner = accounts[0];

  console.log("Contract owner:", owner);
  console.log("Available accounts:", accounts);

  // Add the owner as a carrier
  try {
    await supplyChain.addCarrier(owner);
    console.log("Successfully added owner as carrier");
  } catch (error) {
    console.error("Error adding carrier:", error);
  }
};


