//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// import IERC20

contract CarTradeDiscont {
    address public TradeTokenAddress;
    mapping(address => bool) public Owners; // call Owners(address) => true or false
    mapping(address => bool) public Administrators;

    struct discont {
        uint256 start;
        uint256 end;
        string discont_name;
        uint256 discont_amount;
        uint256 discont_rate;
        bool active;
    }

    struct user {
        string vin_code;
        uint256 userId;
        uint256[] disconts; // we can get length
    }

    // user ----> discont1
    //     |_____> discont2

    mapping(address => user) public Users;
    uint256 public userId;
    mapping(uint256 => discont) public Disconts; // [(1, discont), (2, discont)]
    uint256 public discontId;

    // 4.2 Vin code
    // 4.3 Discont start date
    // 4.4 Discont end date
    // 4.5 Discont exchange rate (tokens to dollars)

    constructor(address _trade_token_address) {
        Owners[msg.sender] = true;
        TradeTokenAddress = _trade_token_address;
    }

    modifier onlyOwner() {
        require(Owners[msg.sender] == true, "Only owner");
        _;
    }

    modifier onlyAdmin() {
        require(Administrators[msg.sender] == true, "Only admin");
        _;
    }

    function addOwner(address _address) public onlyOwner {
        Owners[_address] = true;
    }

    function addAdmin(address _address) public onlyAdmin {
        Administrators[_address] = true;
    }

    function addUser(address _address, string memory _vin_code)
        public
        onlyAdmin
    {
        Users[_address].vin_code = _vin_code;
    }

    function addDiscontToUser(address _address, uint256 _discont_id)
        public
        onlyAdmin
    {
        Users[_address].disconts.push(_discont_id);
        userId += 1;
        // 1. in process of adding discont to user pls send amount of token to this user;
        // create instance IERC20 _token = .....
        // read information from cicrle for discont in user struct
        // if check if this discont is active
        // send tokens to user amount of tokens = discont_amount
    }

    function addDiscont(
        uint256 _start,
        uint256 _end,
        string memory _discont_name,
        uint256 _discont_amount,
        uint256 _discont_rate
    ) public onlyAdmin {
        discontId += 1;
        Disconts[discontId].start = _start;
        Disconts[discontId].end = _end;
        Disconts[discontId].discont_name = _discont_name;
        Disconts[discontId].discont_amount = _discont_amount;
        Disconts[discontId].discont_rate = _discont_rate;
    }
}
