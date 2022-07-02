// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IDOToken is ERC20 {
    constructor() ERC20("IDOToken", "ITN") {
        _mint(msg.sender, 1000000 ether);
    }
}
