import React, { useContext } from "react";
import Web3 from "web3";
import Config from "../config";
import DataContext from '../context/data/DataContext'
const IDOContractABI = require("../contracts/IDOContract.json").abi;

export default function useIDOContract() {
  const [data, setData] = React.useState();
  const {setCurrentRate} = useContext(DataContext) 

  const contract = React.useMemo(() => {
    console.log(Config().BLOCKCHAIN_NODE);
    const web3 = new Web3(Config().BLOCKCHAIN_NODE);
    try {
      var IDOContract = new web3.eth.Contract(
        IDOContractABI,
        Config().IDO_CONTRACT
      );
      return IDOContract;
    } catch (e) {
      return {};
    }
  }, []);

  const getIDOdata = React.useCallback(async () => {
    console.log(contract);
    //try {
      var RoundID = await contract.methods.RoundID().call(); //get round id
      var roundList = [];
      var currentRoundDataItem;
      var CurrentRound = await contract.methods.getCurrentRound().call()
      for (var i = 1; i <= RoundID; i++) {
        currentRoundDataItem = await contract.methods.Rounds(i).call(); //get round id
        roundList.push(currentRoundDataItem)
      }
    setCurrentRate(roundList[parseInt(CurrentRound)-1].usdt_price/1000)
    setData({ RoundID: RoundID, roundData: roundList, currentRound: parseInt(CurrentRound)});
   // } catch (e) {
   //   console.log(e)
   //   setData({});
   // }
  }, [setData, contract]);

  React.useEffect(() => {
    getIDOdata();
  }, [getIDOdata]);

  return data;
}
