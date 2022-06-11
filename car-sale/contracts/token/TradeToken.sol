// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.4;

import "./ERC20.sol";

contract TradeToken is ERC20 {
    constructor() ERC20("Trade Token", "TTC") {
        _mint(msg.sender, 100 ether);
    }
}
