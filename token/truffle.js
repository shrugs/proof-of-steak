require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')

const provider = network => () => {
  return new HDWalletProvider(
    process.env.MNEMONIC,
    `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
  )
}

module.exports = {
  mocha: {
    useColors: true
  },
  networks: {
    mainnet: {
      provider: provider('mainnet'),
    },
    ropsten: {
      provider: provider('ropsten'),
    },
    testrpc: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '*'
    }
  }
};
