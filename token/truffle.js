module.exports = {
  mocha: {
    useColors: true
  },
  networks: {
    testrpc: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    dev: {
      host: 'localhost',
      port: 7545,
      network_id: '*'
    },
    test: {
      host: 'localhost',
      port: 7545,
      network_id: '*'
    }
  }
};
