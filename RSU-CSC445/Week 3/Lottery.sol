pragma solidity ^0.8.30;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }    
    
    function enter() public payable {
        require(msg.value >= 0.001 ether, "PLEASE ENTER MORE THAN 0.001 ETHER");
        
        for (uint index = 0; index < players.length; index++) 
        {
            require(players[index] != msg.sender, "YOU CANNOT ENTER MORE THAN ONCE");
        }

        players.push(msg.sender);
    }
    function pickWinner() public {
        require(msg.sender == manager, "MANAGER ONLY");
        
        uint index = random() % players.length;
        
        (bool success, ) = players[index].call{value: (address(this).balance)} ("");
 	    require(success, "TRANSFER FAILED.");
        
        players = new address [](0);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function random() private view returns (uint) { return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players))); }
}