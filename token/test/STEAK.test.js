const expect = require('./utils/chai').expect
const STEAK = artifacts.require('STEAK')

describe('ICS', async () => {
  const supply = 20

  context('in normal operation', () => {
    before(async () => {
      instance = await STEAK.new(supply)
    })

    it('deploys correctly', async () => {
      expect(instance).to.exist
      expect(instance.address).to.exist
    })

    it('has the correct initialSupply and totalSupply', async () => {
      const initialSupply = await instance.initialSupply.call()
      const totalSupply = await instance.totalSupply.call()

      expect(
        initialSupply
      ).to.be.bignumber.equal(
        web3.toWei(supply)
      )

      expect(
        totalSupply
      ).to.be.bignumber.equal(
        web3.toWei(supply)
      )
    })

  })
})
