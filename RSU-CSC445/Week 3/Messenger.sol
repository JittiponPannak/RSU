pragma solidity ^0.8.30;

import "./HelloWorld.sol";

contract Messenger {
    HelloWorld public hello;

    constructor(address helloAddress) {
        hello = HelloWorld(helloAddress);
    }

    function readMessage() public view returns (string memory) {
        return hello.getMessage();
    }
    function updateMessage(string memory new_message) public {
        hello.setMessage(new_message);
    }

}