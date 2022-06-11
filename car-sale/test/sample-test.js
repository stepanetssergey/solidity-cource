const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Add owner test", async function () {
    const TradeToken = await ethers.getContractFactory("TradeToken");
    const tradeToken = await TradeToken.deploy();
    await tradeToken.deployed();
    const CarTradeDiscont = await ethers.getContractFactory("CarTradeDiscont");
    const carTradeDiscont = await CarTradeDiscont.deploy(tradeToken.address);
    await carTradeDiscont.deployed();
    const TrxAddOwner = await carTradeDiscont.addOwner(
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    );
    await TrxAddOwner.wait();
    expect(
      await carTradeDiscont.Owners("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
    ).to.equal(true);
  });
  // add Administrators
  // add Disconts
  // add Users
  // add Disconts to user
});
