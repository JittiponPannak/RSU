// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract SimpleBank {
    mapping(address => uint256) balances;
    bool entry = false;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function withdraw(uint256 amount) reEntrancyGuard public {
        require(balances[msg.sender] >= amount, "Not enough balance");
        
        balances[msg.sender] -= amount;
        
        // payable(msg.sender).transfer(amount);
        
        (bool success, ) = msg.sender.call{value: amount}("");
        
        require(success, "Failed");
    }

    modifier reEntrancyGuard() {
        require(entry);

        entry = true;
        
        _;

        entry = false;
    }
}
