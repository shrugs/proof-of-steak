var DonationSplitter = artifacts.require('./DonationSplitter')
var ICS = artifacts.require('./ICS')

const addresses = [
  '0x23e0619E5339184cF21Ad78a3fEdE6C4D12Bc467', // The Ethereum Foundation (notes below)
  '0xEF9ab8658F145319e97ce96ecd7B3903B3480128', // The Doge-Eth Bridge Art Project
  '0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8', // MyEtherWallet
  '0x9AE80465047dc67876B8F95bd17B187e3A4a482A'  // CryptoKitties
]
const amounts = [
  10, // Ethereum Foundation
  50, // Doge-Eth
  35, // MyEtherWallet
  5   // CryptoKitties
]

/**
 * The Ethereum Foundation address is 0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359
 *   but it requires a congres to execute arbitrary transactions, and
 *   requiring a congress for the 33 * 0.1 === 3.3 ETH
 *   that we're sending their way is a little unnecesary.
 *
 * So instead I'll be accepting the funds to a separate, personal address
 *   and then forwarding them onwards to the Ethereum Foundation. This also makes it
 *   possible for me to obtain a Unicorn token to an address I control
 *   (rather than the DontationSplitter contract obtaining the token and
 *    me needing to write custom logic to transfer it to an address I control).
 *
 * Anyway, I'm aware that this defeats the purpose of smart contracts by
 *   putting a human in the middle, but it's the most reasonable decision
 *   given the circumstances.
 *
 * And the only people who care are the people who might be reading this code (hi!)
 *
 * So for personal accountability, my name is Matt Condon, and you can find me on
 *   twtter at @mattgcondon and various websites around the web as @shrugs.
 *
 * I plan on having a long-lasting and valuable career in blockchain tech,
 *   so burning that on 3.3 ETH would be a little silly 😜
 */

module.exports = async (deployer, network, accounts) => {
  try {
    await deployer.deploy(DonationSplitter, addresses, amounts)

    await deployer.deploy(ICS, DonationSplitter.address)
  } catch (error) {
    console.error(error)
  }
}
