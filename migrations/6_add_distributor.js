const SupplyChain = artifacts.require("SupplyChain");

module.exports = async function (deployer, network, accounts) {
  const supplyChain = await SupplyChain.deployed();
  const owner = accounts[0];

  console.log("Contract owner:", owner);
  console.log("Available accounts:", accounts);

  // Add the owner as a distributor
  try {
    await supplyChain.addDistributor(owner);
    console.log("Successfully added owner as distributor");
  } catch (error) {
    console.error("Error adding distributor:", error);
  }
};
