// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./IERC20.sol";

interface IWalrum is IERC20 {

    function freezeToken(address _freeze_owner, uint _block_date, uint _amount) external;

}
