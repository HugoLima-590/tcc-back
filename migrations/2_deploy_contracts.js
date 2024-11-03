const DocumentStore = artifacts.require("DocumentStore");

module.exports = function (deployer) {
  deployer.deploy(DocumentStore);
};
