//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmingToken is ERC20 {
    mapping(address => bool) public isMinter;
    address public owner;

    constructor() ERC20("Farming Token", "FARMT") {
        owner = msg.sender;
    }

    modifier onlyMinter() {
        require(isMinter[msg.sender] == true, "only minter");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    function addMinter(address _address, bool _state) public onlyOwner {
        isMinter[_address] = _state;
    }

    function mint(address _address, uint256 _amount) public onlyMinter {
        _mint(_address, _amount);
    }
}
