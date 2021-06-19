const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      networkCheckTimeout: 1000000000,
      network_id: "*"
    },
    bsc_testnet: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://data-seed-prebsc-1-s1.binance.org:8545/"),
      network_id: 97,
      //gasPrice: 1000000000,
      skipDryRun: true
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/v3/b4cd6e382efc48358ab09ec51e55166a"),
      network_id: 3,
    },
    bsc: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://bsc-dataseed4.ninicoin.io/"),
      network_id: 56,
      gasPrice: 6000000000
    },
    ftm: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://rpcapi.fantom.network/"),
      network_id: 250,
      gasPrice: 2000000000,
      gas: 6700000,
      networkCheckTimeout: 1000000000,
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: process.env.BSCSCAN_API_KEY,
    ftmscan: process.env.FTMSCAN_API_KEY,
    etherscan: process.env.ETHCAN_API_KEY,
  },
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}