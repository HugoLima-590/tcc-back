const path = require('path');
//const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  // Compilador Solidity
  compilers: {
    solc: {
      version: "0.8.21", // ou a versão que você estiver usando
    },
  },
  networks: {
    development: {
      host: "127.0.0.1", // Ganache CLI padrão
      port: 7545,        // Ganache CLI padrão
      network_id: "*",   // Conecta a qualquer rede
    },
  },
  // Configurações do caminho
  contracts_build_directory: path.join(__dirname, "build/contracts"),
};
