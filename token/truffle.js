module.exports = {
  mocha: {
    useColors: true
  },
  networks: {
    ropsten: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
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
