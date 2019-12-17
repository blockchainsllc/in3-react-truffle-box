// In this Truffle Box sample, for simplicity, a deployment of a smart contract is not included.
//  However, you can simply uncomment the commented code and create a solidity Smart Contract for example at ./SmartContractCode.sol

// var SmartContractArtifacts = artifacts.require("./SmartContractCode.sol");

module.exports = function(deployer) {
  console.log("Nothing to deploy in this sample.");
  
  console.log("The purpose of this sample is to show how to get trusted information, from Ethereum network, without the need to run a full Ethereum Node.");

  console.log("Feel free to add and deploy your contracts if needed.");

  // deployer.deploy(SmartContractArtifacts);
};
