
// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;


import "./interfaces/IWalrum.sol";
import "./libraries/SafeMath.sol";
import "./libraries/Address.sol";

contract IDOContract {

    using Address for address;  
    using SafeMath for uint256;

    address public usdtAddress;
    address public walrumAddress;
    address public owner;
    address public withdrawOneAddress;
    address public withdrawTwoAddress;
    uint public RoundTrID;
    uint public RoundID;
    uint public UserID;
    uint public CurrentRound;
    bool public haveActiveRound;
    uint public usdt2walrum;
    uint public refPercent;
    uint public withdrawOne;
    uint public withdrawTwo;

    constructor (address _usdt_address,
                 address _walrum_address,
                 address _withdraw_one_address,
                 address _withdraw_two_address) public {
       owner = msg.sender;
       usdtAddress = _usdt_address;
       walrumAddress = _walrum_address;
       withdrawOneAddress = _withdraw_one_address;
       withdrawTwoAddress = _withdraw_two_address;
       refPercent = 7;
       withdrawOne = 20;
       withdrawTwo = 80;
    }
    
    struct user {
        address userAddress;
        address refAddress;
        uint userID;
    }

    struct round {
        uint start;
        uint end;
        bool active;
        uint totalForSale;
        uint totalUSDTAmount;
        uint totalSaledWalrumAmount;
        uint maxBuy;
        uint minBuy;
        uint sales;
        uint lockDate;
        uint usdt_price;
        string round_name;
    }


    mapping(uint => round) public Rounds;
    mapping(address => user) public Users;
    mapping(address => bool) public Admins;
    mapping(uint => address) public UserIDs;

    modifier onlyOwner() {
        require((owner == msg.sender || Admins[msg.sender] == true), "Only owner has access");
        _;
    }

    function setWithdrawOneAddress(address _withdraw) public onlyOwner {
        withdrawOneAddress = _withdraw;
    }
    
    function setWithdrawTwoAddress(address _withdraw) public onlyOwner {
        withdrawTwoAddress = _withdraw;
    }
    
    function setAdmin(address _address, bool _active) public onlyOwner {
      Admins[_address] = _active;
    }

    function setUSDTAddress(address _usdt) public onlyOwner {
        usdtAddress = _usdt;
    }

    function setWalrumTokenAddress(address _walrum) public onlyOwner {
        walrumAddress = _walrum;
    }

    function addUser(address _user) internal {
        if (Users[_user].userAddress == address(0)) {
            UserID = UserID.add(1);
            Users[_user].userAddress = _user;
            UserIDs[UserID] = _user;
        }
    }

    function setCurrentRound(uint _round) public onlyOwner {
      require(RoundID >= _round, "not correct round");
      CurrentRound = _round;
      haveActiveRound = true;
    }

    function addRound(uint _start, uint _end, uint _total_amount, 
                         uint _max_one_buy, uint _min_one_buy, 
                         uint lockDate, uint _usdt_price,
                         string memory _round_name) public onlyOwner {
        require(haveActiveRound == false, "Present active round");
        RoundID = RoundID.add(1);
        Rounds[RoundID].start = _start;
        Rounds[RoundID].end = _end;
        Rounds[RoundID].totalForSale = _total_amount;
        Rounds[RoundID].maxBuy = _max_one_buy;
        Rounds[RoundID].minBuy = _min_one_buy;
        Rounds[RoundID].lockDate = lockDate;
        Rounds[RoundID].usdt_price= _usdt_price;
        Rounds[RoundID].round_name = _round_name; 

    }
    
    function changeRound(uint _roundId, uint _start, uint _end, uint _total_amount, 
                         uint _max_one_buy, uint _min_one_buy, 
                         uint lockDate, uint _usdt_price,
                         string memory _round_name) public onlyOwner {
        Rounds[_roundId].start = _start;
        Rounds[_roundId].end = _end;
        Rounds[_roundId].totalForSale = _total_amount;
        Rounds[_roundId].maxBuy = _max_one_buy;
        Rounds[_roundId].minBuy = _min_one_buy;
        Rounds[_roundId].lockDate = lockDate;
        Rounds[_roundId].usdt_price= _usdt_price;
        Rounds[_roundId].round_name = _round_name; 

    }


    function getCurrentRound() public view returns(uint) {
      uint _roundId;
      for (uint i=1; i<=RoundID; i++) {
         if(Rounds[i].start <= block.timestamp && Rounds[i].end >= block.timestamp) {
           _roundId= i;
         }
      }
      return _roundId;
    }

   

    function safeTransferFrom(
          IERC20 token,
          address from,
          address to,
          uint256 value
      ) internal {
          _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    function _callOptionalReturn(IERC20 token, bytes memory data) private {
          // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
          // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
          // the target address contains contract code and also asserts for success in the low-level call.

          bytes memory returndata = address(token).functionCall(data, "SafeERC20: low-level call failed");
          if (returndata.length > 0) {
              // Return data is optional
              require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
          }
      }


    function usdtWalrumExchange(uint _amount_usdt, address _ref) public {
        uint _currentRound = getCurrentRound();
        require(_currentRound != 0,"No active rounds");
        require(_ref != address(0), "Referal is not setting");
        require(Rounds[_currentRound].minBuy <= _amount_usdt, "Min buy error");
        uint _ref_tokens;
        if (Rounds[_currentRound].maxBuy > 0) {
          require(Rounds[_currentRound].maxBuy >= _amount_usdt ,"Not Correct max buy");
        }
        uint _amount_walrum;
        _amount_walrum = _amount_usdt.mul(1e18).div(Rounds[_currentRound].usdt_price).div(1e3);
        _ref_tokens = _amount_walrum.mul(1e18).mul(refPercent).div(1e20);
        uint _withdraw_one;
        uint _withdraw_two;
        _withdraw_one = _amount_usdt.mul(1e18).mul(withdrawOne).div(1e20);
        _withdraw_two = _amount_usdt.mul(1e18).mul(withdrawTwo).div(1e20);
        addUser(msg.sender);
        IWalrum _walrum = IWalrum(walrumAddress);
        IWalrum _usdt = IWalrum(usdtAddress);
        Rounds[_currentRound].totalSaledWalrumAmount = Rounds[_currentRound].totalSaledWalrumAmount.add(_amount_walrum);
        Rounds[_currentRound].totalUSDTAmount = Rounds[_currentRound].totalUSDTAmount.add(_amount_usdt);
        Rounds[_currentRound].sales = Rounds[_currentRound].sales.add(1);
        uint _block_to = Rounds[_currentRound].lockDate;
        // withdraw usdt
        //_usdt.transferFrom(msg.sender, withdrawOneAddress, _withdraw_one);
        //_usdt.transferFrom(msg.sender, withdrawTwoAddress, _withdraw_two);
        
        safeTransferFrom(_usdt, msg.sender, withdrawOneAddress, _withdraw_one);
        safeTransferFrom(_usdt, msg.sender, withdrawTwoAddress, _withdraw_two);
        _walrum.transfer(msg.sender, _amount_walrum);
        _walrum.transfer(_ref, _ref_tokens);
        if (_block_to != 0) {
           _walrum.freezeToken(msg.sender, _block_to, _amount_walrum);
           _walrum.freezeToken(_ref, _block_to, _ref_tokens);
        }
    }

    function withdrawWalrum(uint _amount) public onlyOwner {
        IWalrum _walrum = IWalrum(walrumAddress);
        _walrum.transfer(owner, _amount);
    }
}
