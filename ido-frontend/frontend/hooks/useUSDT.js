import React from "react";
import Web3 from "web3";
import Config from "../config";
const UsdtABI= require("../contracts/USDT.json").abi;

export default function useIDOContract(_address) {
  const [data, setData] = React.useState();

  const contract = React.useMemo(() => {
    console.log(Config().BLOCKCHAIN_NODE);
    const web3 = new Web3(Config().BLOCKCHAIN_NODE);
    try {
      var USDTContract = new web3.eth.Contract(
        UsdtABI,
        Config().USDT_TOKEN
      );
      return USDTContract;
    } catch (e) {
      return {};
    }
  }, []);

  const getUSDT = React.useCallback(async () => {
    //try {
    if (_address == undefined) {
      var balance = await contract.methods.balanceOf(_address).call(); //get round id
      setData({ balance: balance });
    }
   // } catch (e) {
   //   console.log(e)
   //   setData({});
   // }
  }, [setData, contract]);

  React.useEffect(() => {
    getUSDT();
  }, [getUSDT]);

  return data;
}
