// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract SimpleBank2 {
    mapping(address => uint256) balances;
    address[] accounts;

    uint rate = 3;
    
    address public owner; 
    bool entry = false;

    constructor() {
        owner = msg.sender;
    }

    function calculateInterest(address user, uint interestRate) private view returns (uint) {
        uint interest = balances[user] * interestRate / 100.0;
        return interest;
    }
    function totalInterestPerYear() public view returns (uint) {
        uint total = 0;

        for (uint i = 0; i < accounts.length; i++) {
            address account = accounts[i];
            uint interest = calculateInterest(account, rate);

            total += interest;
        }

        return total;
    }
    function payDividendsPerYear() public payable onlyOwner {
        uint total = 0;

        for (uint i = 0; i < accounts.length; i++) {
            address account = accounts[i];
            uint interest = calculateInterest(account, rate);

            total += interest;
            balances[account] += interest;
        }

        require(msg.value == total, "Not Enough!!!");
    }

    function deposit() public payable {
        if (0 == balances[msg.sender]) {
            accounts.push(msg.sender);
        }
        
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough balance");
        
        balances[msg.sender] -= amount;
        
        // payable(msg.sender).transfer(amount);
        
        (bool success, ) = msg.sender.call{value: amount}("");
        
        require(success, "Failed");
    }

    function systemBalance() public view returns (uint256) {
        return address(this).balance;
    }
    function systemDeposit() public onlyOwner payable returns (uint256) {
        return systemBalance();
    }
    function systemWithdraw(uint256 amount) public onlyOwner returns (uint256) {
        require(systemBalance() >= amount, "Not enough balance");
        
        balances[msg.sender] -= amount;
        
        // payable(msg.sender).transfer(amount);
        
        (bool success, ) = msg.sender.call{value: amount}("");
        
        require(success, "Failed");

        return systemBalance();
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Owner's only");
        
        _;
    }
    modifier reEntrancyGuard() {
        require(entry, "Nuh uh");

        entry = true;
        
        _;

        entry = false;
    }
}