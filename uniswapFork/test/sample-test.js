const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Uniswap Fork", function () {
  it("Should return the new greeting once it's changed", async function () {
    const accounts = await ethers.getSigners();
    const UniswapV2Factory = await ethers.getContractFactory(
      "UniswapV2Factory"
    );
    const uniswapV2Factory = await UniswapV2Factory.deploy(accounts[0].address);

    await uniswapV2Factory.deployed();
    const WETH = await ethers.getContractFactory("WETH");
    const weth = await WETH.deploy(accounts[0].address);

    await weth.deployed();

    console.log("WETH contract address:", weth.address);

    const UniswapV2Router = ethers.getContractFactory("UniswapV2Router02");
    const uniswapV2Router = UniswapV2Router.deploy(
      UniswapV2Factory.address,
      weth.address
    );
    await uniswapV2Router.deployed();

    console.log("Router:", uniswapV2Router.address);
    const USDT = await ethers.getContractFactory("USDT");
    const usdt = await USDT.deploy();
    await usdt.deployed();

    const USDC = await ethers.getContractFactory("USDC");
    const usdc = await USDC.deploy();
    await usdc.deployed();
    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
