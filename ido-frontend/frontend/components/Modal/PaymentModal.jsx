import React, { useState,useContext } from 'react'
import DataContext from '../../context/data/DataContext'
import ModalContext from '../../context/modals/ModalContext'
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts'
import Config from '../../config'
import Spiner from '../common/Spiner'
import Success from '../Modal/Success'
//var fs = require('fs')
import  usdtABI from '../../contracts/USDT.json'
import  idoContractABI from '../../contracts/IDOContract.json'
import Error from './Error'


const PaymentModal = () => {
  const [approve, setApprove] = useState(true)
  const [buy, setBuy] = useState(false)
  const [approveLoading, setApproveLoading] = useState(false)
  const [idoLoading, setIDOLoading] = useState(false)
  const {usdt, rate, upliner} = useContext(DataContext)
  const {closeModal, openModal} = useContext(ModalContext)
  //const usdtABI = JSON.parse(fs.readFileSync('/data/USDT.json').toString());
  //const idoContractABI = JSON.parse(fs.readFileSync('/data/IDOcontract.json').toString());

  const context = useWeb3React();
  const { account, activate, deactivate, active, library } = context;

  const handleSignApprove = async () => {
    setApprove(false)
    const tokenContract = new Contract(Config().USDT_TOKEN, 
                                      usdtABI.abi, 
                                      library.getSigner(account).connectUnchecked())
    
    const allowed = await tokenContract.allowance(account, Config().IDO_CONTRACT)
    if (parseInt(allowed.toString()) >= usdt * 10 ** 6) {
      setBuy(true)
    } else {
      const trx = await tokenContract.approve(Config().IDO_CONTRACT, parseInt(usdt * 10 ** 6).toString())
      setApproveLoading(true)
      const resultTrx = await trx.wait()
      setApproveLoading(false)
      setBuy(true)
    }
  }

  const handleSignBuy = async () => {
    setBuy(false)
    var currentUpliner = ''
    if (upliner == '') {
       currentUpliner = Config().ADMIN_ADDRESS 
    } else {
       currentUpliner = upliner
    }
    const IDOContractInstance = new Contract(Config().IDO_CONTRACT, 
                                      idoContractABI.abi, 
                                      library.getSigner(account).connectUnchecked())
    //    try {
      const trx = await IDOContractInstance.usdtWalrumExchange(parseInt(usdt * 10 ** 6).toString(), currentUpliner)
      setIDOLoading(true)
      const resultTrx = await trx.wait()
      openModal({
       title: "SUCCESS",
       children: <Success />,
       small: true,
      })
    //   } catch(e) {
    // console.log(e)
      //      openModal({
      //        title: "Transaction error",
      //        children: <Error error={e.error.message} />,
      //        small: true,
      //      }) 
    // }
  }

  return (<div style={{width:'80%',margin:'0 auto' }}>
    <div className="ido_wallet_container">
      <div className="ido_wallet_name" style={{fontSize:'16px'}} >
        {`You'll buy ${usdt / rate} WALRUM tokens`} 
      </div>
      <div className="ido_wallet_item">
        <div className="ido_wallet_name" style={{fontSize:'14px',fontWaight:'normal'}} >
         Approve USDT token 
        </div>
        <button
          onClick={handleSignApprove}
          className="ido_buy_button"
          style={!approve ? {opacity:'0.5',cursor:'unset', display:'flex',justifyContent:'center',alignItems:'center'}:{}}
          disabled={!approve}><div>Sign In</div> {!approve && approveLoading && <Spiner/>}</button>
      </div>
      <div className="ido_wallet_item">
        <div className="ido_wallet_name"  style={{fontSize:'14px',fontWaight:'normal'}} >
         Buy WALRUM tokens 
        </div>
        <button
           onClick={handleSignBuy}
           className="ido_buy_button"
           style={!buy ? {opacity:'0.5',cursor:'unset', display:'flex',justifyContent:'center',alignItems:'center'}:{}}
          disabled={!buy}><div>Sign In</div> {!buy && idoLoading && <Spiner/>}</button>
      </div>
    </div>
    </div>)
}

export default PaymentModal
