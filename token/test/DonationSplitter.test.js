const expect = require('./utils/chai').expect

const DonationSplitter = artifacts.require('DonationSplitter')

const getEthBalance = async (owner) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(owner, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

describe('DonationSplitter', () => {

  let accounts
  let owner, acc1, acc2
  before(async () => {
    accounts = await new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })

    owner = accounts[0]
    acc1 = accounts[1]
    acc2 = accounts[2]
    adversary = accounts[3]
  })

  let instance

  describe('happy path', () => {
    before(async () => {
      instance = await DonationSplitter.new([acc1, acc2], [50, 50], { from: owner })
    })

    const donation = web3.toWei(1.0)

    it('deploys normally', async () => {
      expect(instance).to.exist
      expect(instance.address).to.exist
    })

    it('accepts ether to the fallback function', async () => {
      return expect(
        instance.sendTransaction({ value: donation, from: owner })
      ).to.be.fulfilled
    })

    it('should have correct balance', async () => {
      const balance = await getEthBalance(instance.address)
      expect(
        balance
      ).to.be.bignumber.equal(donation)
    })

    it('allows first address to claim 50%', async () => {

      const initialBalance = await getEthBalance(acc1)

      await expect(
        instance.claim({ from: acc1 })
      ).to.be.fulfilled

      const newBalance = await getEthBalance(acc1)

      expect(
        newBalance
      ).to.be.bignumber
        .greaterThan(initialBalance.add(donation / 2.0).sub(web3.toWei(0.01)))
    })
  })

  describe('constructor catches', () => {
    it('reverts on 0x0 address', async () => {
      return expect(
        DonationSplitter.new(['0x0', '0x0'], [50, 50], { from: owner })
      ).to.be.rejected
    })

    it('reverts on un-parallel arrays', async () => {
      return expect(
        DonationSplitter.new([acc1], [50, 50], { from: owner })
      ).to.be.rejected
    })
  })


  // adversarial
  describe('in adversarial conditions', () => {
    before(async () => {
      instance = await DonationSplitter.new([acc1, acc2], [50, 50], { from: owner })
    })

    it('does not allow normal accounts to claim', async () => {
      return expect(
        instance.claim({ from: adversary })
      ).to.be.rejected
    })
  })
})
