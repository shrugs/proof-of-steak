pragma solidity 0.4.18;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

// heavily inspired by https://github.com/RequestNetwork/RequestTokenSale/blob/master/contracts/RequestToken.sol
contract STEAK is StandardToken {

    uint256 public initialSupply;
    // the original supply, just for posterity, since totalSupply
    //  will decrement on burn

    string public constant name   = "$TEAK";
    string public constant symbol = "$TEAK";
    // ^ whether or not to include the `$` here will probably be contested
    //   but it's more important to me that the joke is obvious, even if it's overdone
    //   by displaying as `$$TEAK`
    uint8 public constant decimals = 18;
    //  (^ can we please get around to standardizing on 18 decimals?)

    address public tokenSaleContract;

    modifier validDestination(address to)
    {
        require(to != address(this));
        _;
    }

    function STEAK(uint tokenTotalAmount)
    public
    {
        initialSupply = tokenTotalAmount * (10 ** uint256(decimals));
        totalSupply = initialSupply;

        // Mint all tokens to crowdsale.
        balances[msg.sender] = totalSupply;
        Transfer(address(0x0), msg.sender, totalSupply);

        tokenSaleContract = msg.sender;
    }

    /**
     * @dev override transfer token for a specified address to add validDestination
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transfer(address _to, uint _value)
        public
        validDestination(_to)
        returns (bool)
    {
        return super.transfer(_to, _value);
    }

    /**
     * @dev override transferFrom token for a specified address to add validDestination
     * @param _from The address to transfer from.
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transferFrom(address _from, address _to, uint _value)
        public
        validDestination(_to)
        returns (bool)
    {
        return super.transferFrom(_from, _to, _value);
    }

    event Burn(address indexed _burner, uint _value);

    /**
     * @dev burn tokens
     * @param _value The amount to be burned.
     * @return always true (necessary in case of override)
     */
    function burn(uint _value)
        public
        returns (bool)
    {
        balances[msg.sender] = balances[msg.sender].sub(_value);
        totalSupply = totalSupply.sub(_value);
        Burn(msg.sender, _value);
        Transfer(msg.sender, address(0x0), _value);
        return true;
    }

    /**
     * @dev burn tokens on the behalf of someone
     * @param _from The address of the owner of the token.
     * @param _value The amount to be burned.
     * @return always true (necessary in case of override)
     */
    function burnFrom(address _from, uint256 _value)
        public
        returns(bool)
    {
        assert(transferFrom(_from, msg.sender, _value));
        return burn(_value);
    }
}
