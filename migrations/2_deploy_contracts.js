var Verifier = artifacts.require("../contracts/Verifier.sol");
module.exports = function(deployer) {
  deployer.deploy(Verifier);
};
