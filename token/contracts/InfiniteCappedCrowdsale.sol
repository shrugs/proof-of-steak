pragma solidity 0.4.18;

import './StandardCrowdsale.sol';
import './CappedCrowdsale.sol';

/**
    InfiniteCappedCrowdsale is a crowdsale that lasts until either
        1) All tokens up to _cap have been distributed, or
        2) The inevitable heat death of the universe,
    whichever comes first.
 */
contract InfiniteCappedCrowdsale is StandardCrowdsale, CappedCrowdsale {
    using SafeMath for uint256;

    /**
        @param _cap the maximum number of tokens
        @param _rate tokens per wei received
        @param _wallet the wallet that receives the funds
     */
    function InfiniteCappedCrowdsale(uint256 _cap, uint256 _rate, address _wallet)
        CappedCrowdsale(_cap)
        StandardCrowdsale(0, uint256(int256(-1)), _rate, _wallet)
        public
    {

    }
}
