var signs = artifacts.require("Signs");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(signs);
};