pragma solidity 0.4.18;

import './InfiniteCappedCrowdsale.sol';
import './STEAK.sol';

contract ICS is InfiniteCappedCrowdsale {

    uint256 public constant TOTAL_SUPPLY = 975220000000;
    uint256 public constant ARBITRARY_VALUATION_IN_ETH = 33;
    // ^ arbitrary valuation of ~$10k
    uint256 public constant ETH_TO_WEI = (10 ** 18);
    uint256 public constant TOKEN_RATE = (TOTAL_SUPPLY / ARBITRARY_VALUATION_IN_ETH);
    // ^ 2.9552121212e+28 grains per wei == 2.955e10 $TEAK per eth == 2.955e-8 per wei


    function ICS(address _wallet)
        InfiniteCappedCrowdsale(ARBITRARY_VALUATION_IN_ETH * ETH_TO_WEI, TOKEN_RATE, _wallet)
        public
    {

    }

    function createTokenContract() internal returns (StandardToken) {
        return new STEAK(TOTAL_SUPPLY);
    }
}
