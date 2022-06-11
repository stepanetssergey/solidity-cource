const hre = require("hardhat");

async function main() {
  const TradeToken = await hre.ethers.getContractFactory("TradeToken");
  const tradetoken = await TradeToken.deploy();
  await tradetoken.deployed();

  const CarTradeDiscont = await hre.ethers.getContractFactory(
    "CarTradeDiscont"
  );

  const carTradeDiscont = await CarTradeDiscont.deploy(tradetoken.address);
  await carTradeDiscont.deployed();
  console.log("CarTradeDiscont address:", carTradeDiscont.address);
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");
  //
  // await greeter.deployed();
  //
  // console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
