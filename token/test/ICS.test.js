const expect = require('./utils/chai').expect
const BigNumber = require('bignumber.js')
const ICS = artifacts.require('ICS')
const STEAK = artifacts.require('STEAK')

describe('ICS', async () => {
  let instance
  let wallet
  let contributor

  before(async () => {
    accounts = await new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })

    contributor = accounts[1]
    wallet = accounts[2]
  })

  context('in normal operation', () => {
    before(async () => {
      instance = await ICS.new(wallet)
    })

    it('deploys correctly', async () => {
      expect(instance).to.exist
      expect(instance.address).to.exist
    })

    it('deploys a steak token contract', async () => {
      const token = STEAK.at(await instance.token())

      return expect(
        token.name()
      ).to.eventually.equal('$TEAK')
    })

    it('has the correct rate', async () => {
      const rate = await instance.rate()

      expect(
        rate
      ).to.be.bignumber.equal(
        web3.toWei(new BigNumber('2.9552121212e+10'))
      )
    })

  })
})
