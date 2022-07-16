//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IERCMintable.sol";
import "hardhat/console.sol";

contract Farming {
    uint256 public poolId;

    struct pool {
        address token;
        address lpTokenAddress;
        uint256 lastBlock;
        uint256 tokensPerLPToken;
        uint256 tokensPerBlock;
    }

    struct user {
        uint256 userReward;
        uint256 amount;
    }

    mapping(uint256 => pool) public Pools;
    mapping(address => mapping(uint256 => user)) public Users;

    function addPool(
        address _token,
        address _lp_token_address,
        uint256 _tokensPerBlock
    ) public {
        poolId += 1;
        Pools[poolId].tokensPerBlock = _tokensPerBlock;
        Pools[poolId].token = _token;
        Pools[poolId].lpTokenAddress = _lp_token_address;
    }

    function deposit(uint256 _lp_tokens, uint256 _poolId) public {
        updatePool(_poolId);
        uint256 pending = (Users[msg.sender][_poolId].amount *
            Pools[_poolId].tokensPerLPToken) /
            1e12 -
            Users[msg.sender][_poolId].userReward;
        IERC20Mintable _revenue_token = IERC20Mintable(Pools[_poolId].token);
        IERC20 _lpToken = IERC20(Pools[_poolId].lpTokenAddress);
        _lpToken.transferFrom(msg.sender, address(this), _lp_tokens);
        Users[msg.sender][_poolId].amount += _lp_tokens;
        uint256 _user_reward = (Users[msg.sender][_poolId].amount *
            Pools[_poolId].tokensPerLPToken) / 1e12;
        Users[msg.sender][_poolId].userReward = _user_reward;
    }

    function withdraw(uint256 _lp_tokens, uint256 _poolId) public {
        updatePool(_poolId);
        uint256 pending = (Users[msg.sender][_poolId].amount *
            Pools[_poolId].tokensPerLPToken) /
            1e12 -
            Users[msg.sender][_poolId].userReward;
        IERC20Mintable _revenue_token = IERC20Mintable(Pools[_poolId].token);
        _revenue_token.mint(msg.sender, pending);
        IERC20 _lp_token_instance = IERC20(Pools[_poolId].lpTokenAddress);
        _lp_token_instance.transfer(msg.sender, _lp_tokens);
    }

    function updatePool(uint256 _poolId) internal {
        uint256 lpTokenTotal = IERC20(Pools[_poolId].lpTokenAddress).balanceOf(
            address(this)
        );

        if (lpTokenTotal == 0) {
            Pools[_poolId].lastBlock = block.number;
            return;
        }

        uint256 blocks = block.number - Pools[_poolId].lastBlock;
        uint256 _tokensForPay = blocks * Pools[_poolId].tokensPerBlock;
        uint256 _tokensPerLPToken = Pools[_poolId].tokensPerLPToken +
            ((_tokensForPay * 1e12) / lpTokenTotal);
        Pools[_poolId].lastBlock = block.number;
        Pools[_poolId].tokensPerLPToken = _tokensPerLPToken;
    }

    function pendingTokensPerUser(address _address, uint256 _poolId)
        public
        view
        returns (uint256)
    {
        uint256 blocks = block.number - Pools[_poolId].lastBlock;
        uint256 lpTokenTotal = IERC20(Pools[_poolId].lpTokenAddress).balanceOf(
            address(this)
        );
        uint256 _current_tokens_per_lp = Pools[_poolId].tokensPerLPToken +
            (((blocks * Pools[_poolId].tokensPerBlock) / lpTokenTotal) * 1e12);
        return
            (Users[_address][_poolId].amount * _current_tokens_per_lp) /
            1e12 -
            Users[_address][_poolId].userReward;
    }
}
