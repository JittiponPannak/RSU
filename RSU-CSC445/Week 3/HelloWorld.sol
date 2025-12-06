pragma solidity ^0.8.30;

contract HelloWorld {
    string private message;

    constructor() {
        message = "HelloWorld";
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
    function setMessage(string memory new_message) public virtual {
        message = new_message;
    }
}