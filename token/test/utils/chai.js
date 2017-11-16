const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const ChaiBigNumber = require('chai-bignumber')

chai.config.includeStack = false
chai.use(chaiAsPromised)
chai.use(ChaiBigNumber())

module.exports = chai
