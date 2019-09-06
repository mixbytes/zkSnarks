var Verifier = artifacts.require("verifier.sol");
module.exports = function(deployer) {
  deployer.deploy(Verifier);
};
