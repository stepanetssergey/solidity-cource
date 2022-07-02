//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interfaces/IERC20.sol";

contract IDOContract {
    address public ido_token_address;
    address public usdt_address;
    address public adminAddress;

    constructor(address _ido_token_address, address _usdt_address) {
        ido_token_address = _ido_token_address;
        usdt_address = _usdt_address;
        adminAddress = msg.sender;
    }

    struct round {
        string name;
        uint256 start;
        uint256 end;
        uint256 total;
        uint256 roundAmount;
        uint256 rate;
        uint256 _rate;
    }

    uint256 public roundId;

    mapping(uint256 => round) public Rounds;

    function addRound(
        string memory _name,
        uint256 _start,
        uint256 _end,
        uint256 _roundAmount,
        uint256 _rate
    ) public {
        require(getActiveRound() == 0, "You have active round");
        roundId += 1;
        Rounds[roundId].name = _name;
        Rounds[roundId].start = _start;
        Rounds[roundId].end = _end;
        Rounds[roundId].roundAmount = _roundAmount;
        Rounds[roundId].rate = _rate;
    }

    function getActiveRound() public view returns (uint256) {
        uint256 _roundId;
        for (uint256 i = 1; i <= roundId; i++) {
            if (
                Rounds[i].start < block.timestamp &&
                Rounds[i].end > block.timestamp
            ) {
                _roundId = i;
            }
        }
        return _roundId;
    }

    function IDOExchange(uint256 _usdt_amount) public {
        IERC20 _usdt_token = IERC20(usdt_address);
        IERC20 _ido_token = IERC20(ido_token_address);
        uint256 _roundId = getActiveRound();
        require(_roundId != 0, "Don't have active rounds");
        _usdt_token.transferFrom(msg.sender, adminAddress, _usdt_amount);
        _ido_token.transfer(msg.sender, Rounds[_roundId].rate * _usdt_amount);
    }
}
