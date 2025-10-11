// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.4.0
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Permit {
    uint unitExchange = 20;

    event Buy(address indexed from, address indexed to, uint token);

    constructor()
        ERC20("Jittipon", "JIT")
        ERC20Permit("Jittipon")
    {
        _mint(address(this), 1000000 * 10 ** decimals());
    }

    function buy() payable public {
        require(msg.value >= 100, "Require at least 100 wei");
        
        uint amount = msg.value * unitExchange;
        _transfer(address(this), msg.sender, amount);
        emit Buy(address(this), msg.sender, amount);
    }
}
