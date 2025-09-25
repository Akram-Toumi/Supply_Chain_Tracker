const SupplyChain = artifacts.require("SupplyChain");

module.exports = async function (deployer, network, accounts) {
  const supplyChain = await SupplyChain.deployed();
  const owner = accounts[0];

  console.log("Contract owner:", owner);
  console.log("Available accounts:", accounts);

  // Add the owner to all roles for testing purposes
  const roles = [
    { name: 'Producer', method: 'addProducer' },
    { name: 'Carrier', method: 'addCarrier' },
    { name: 'Warehouse', method: 'addWarehouse' },
    { name: 'Distributor', method: 'addDistributor' },
    { name: 'Retailer', method: 'addRetailer' }
  ];

  for (const role of roles) {
    try {
      await supplyChain[role.method](owner);
      console.log(`Successfully added owner as ${role.name}`);
    } catch (error) {
      console.error(`Error adding ${role.name}:`, error);
    }
  }

  console.log("All roles assigned to owner account");
};
