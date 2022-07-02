const { expect } = require("chai");
const { ethers } = require("hardhat");

// provider

describe("IDO Contract test", function () {
  let accounts, idoContract, usdt, idoToken;
  before(async function () {
    accounts = await ethers.getSigners();
    const USDT = await ethers.getContractFactory("USDT");
    usdt = await USDT.deploy();
    await usdt.deployed();
    const IDOToken = await ethers.getContractFactory("IDOToken");
    idoToken = await IDOToken.deploy();
    await idoToken.deployed();
    const IdoContract = await ethers.getContractFactory("IDOContract");
    idoContract = await IdoContract.deploy(idoToken.address, usdt.address);
    await idoContract.deployed();
  });

  it("Test add round", async () => {
    const currentDateObj = new Date();
    const startTimestamp = parseInt(currentDateObj.getTime() / 1000);
    const trxAddRound = await idoContract.addRound(
      "PRESALE",
      startTimestamp,
      startTimestamp + 10000,
      (10 * 10 ** 18).toString(),
      10
    );
    await trxAddRound.wait();
    expect(await idoContract.getActiveRound()).to.equal(1);
  });
});
