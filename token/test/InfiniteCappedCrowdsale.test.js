const expect = require('chai').expect
const BigNumber = require('bignumber.js')

const InfiniteCappedCrowdsale = artifacts.require('InfiniteCappedCrowdsale')

describe('InfiniteCappedCrowdsale', async () => {

  let instance
  let wallet
  before(async () => {
    accounts = await new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })

    contributor = accounts[1]
    wallet = accounts[2]

    instance = await InfiniteCappedCrowdsale.new(20, web3.toWei(1), wallet)
  })

  // contructor
  it('deploys correctly', async () => {
    expect(instance).to.exist
    expect(instance.address).to.exist
  })

  // operation
  it('has a start time of 0', async () => {
    return expect(
      await instance.startTime()
    ).to.be.bignumber.equal(0)
  })

  it('has an end time of basically infinity', async () => {
    return expect(
      await instance.endTime()
    ).to.be.bignumber.equal(
      (new BigNumber(2)).toPower(256).sub(1)
    )
  })
})
