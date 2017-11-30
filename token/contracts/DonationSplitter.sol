pragma solidity 0.4.18;

import 'zeppelin-solidity/contracts/payment/SplitPayment.sol';

contract DonationSplitter is SplitPayment {
    function DonationSplitter (address[] _payees, uint256[] _shares)
        SplitPayment(_payees, _shares)
        public
    {

    }

    // accept ether
    function () public payable {}
}
