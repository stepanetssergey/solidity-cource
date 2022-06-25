// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const accounts = await hre.ethers.getSigners();
  // We get the contract to deploy
  const UniswapV2Factory = await hre.ethers.getContractFactory(
    "UniswapV2Factory"
  );
  const uniswapV2Factory = await UniswapV2Factory.deploy(accounts[0].address);

  await uniswapV2Factory.deployed();

  console.log("Uniswap factory address:", uniswapV2Factory.address);

  // We get the contract to deploy
  const WETH = await hre.ethers.getContractFactory("WETH");
  const weth = await WETH.deploy(accounts[0].address);

  await weth.deployed();

  console.log("WETH contract address:", weth.address);

  const UniswapV2Router = hre.ethers.getContractFactory("UniswapV2Router02");
  const uniswapV2Router = UniswapV2Router.deploy(
    UniswapV2Factory.address,
    weth.address
  );
  await uniswapV2Router.deployed();

  console.log("Router:", uniswapV2Router.address);
  const USDT = await hre.ethers.getContractFactory("USDT");
  const usdt = await USDT.deploy();
  await usdt.deployed();

  const USDC = await hre.ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();
  await usdc.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
