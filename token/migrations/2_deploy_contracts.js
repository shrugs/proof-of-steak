var DonationSplitter = artifacts.require('./DonationSplitter')
var ICS = artifacts.require('./ICS')

module.exports = async (deployer, network, accounts) => {
  try {
    await deployer.deploy(DonationSplitter,
      [accounts[1], accounts[2]],
      [50, 50]
    )

    await deployer.deploy(ICS, DonationSplitter.address)
  } catch (error) {
    console.error(error)
  }
}
