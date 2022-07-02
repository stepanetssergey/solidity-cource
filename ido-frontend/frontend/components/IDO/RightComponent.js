import React, { useContext } from "react";
import Image from "next/image";
import web3 from 'web3'
import ModalContext from '../../context/modals/ModalContext'
import DataContext from '../../context/data/DataContext' 
import PaymentModal from '../Modal/PaymentModal'
import { useWeb3React } from '@web3-react/core';
import Config from '../../config'
import SelectWalletModal from '../Modal/SelectWalletModal'


const RightComponent = () => {
  const [upliner, setUplinerForm] = React.useState("");
  const [usdtAmount, setUsdtAmount] = React.useState(0);
  const [walrumAmount, setWalrumAmount] = React.useState(0);
  const [addressError, setAddressError] = React.useState('')
  const [limitError, setLimitError] = React.useState('')
  const {openModal} = useContext(ModalContext);
  const {rate, setUSDTAmount, setUpliner} = useContext(DataContext)
  const context = useWeb3React();
  const {  account, active } = context;

  const handlEnterUpliner = (e) => {
    var check = web3.utils.isAddress(e.target.value)
    if (check && active) {
      setUplinerForm(e.target.value);
      setUpliner(e.target.value);
      setAddressError('')
    } else {
      setAddressError('Address is not correct or wallet is not connected')
    }
  };
  const handlEnterUSDT = (e) => {
    if (!active) {
      openModal({
          title:'Select Wallet',
          children: <SelectWalletModal />,
      })
    } 
    if (e.target.value < 100) {
      setLimitError('limit - not less than 100')
    } else {
      setLimitError('')
    }
    setWalrumAmount(e.target.value/rate)
    setUsdtAmount(parseFloat(e.target.value));
    setUSDTAmount(parseFloat(e.target.value))
  };
  const handlEnterWalrum = (e) => {
    if (!active) return
    setUsdtAmount(e.target.value*rate)
    setUSDTAmount(e.target.value*rate)
    setWalrumAmount(parseFloat(e.target.value));
  };
  const handlIDOClick = (e) => {
       if (upliner == '')
        {
          setUpliner(Config().ADMIN_ADDRESS)
          setUplinerForm(Config().ADMIN_ADDRESS)
        }
        openModal({
            title:'Buy WALRUM Tokens',
            children: <PaymentModal />,
        })
  };
  return (
    <div className="ido_right_container">
      <div className="ido_right_header">Buy tokens</div>
      <div className="input_fields_container">
        <div className="ido_upliner">
          <input
            name="upliner"
            placeholder="Upliner address"
            type="text"
            onChange={(e) => handlEnterUpliner(e)}
            defaultValue={upliner}
            style={addressError == ''?{
              width: "100%",
              paddingLeft: "10px",
              border: "transparent",
              zIndex: '10000'
            }:{
              width: "100%",
              paddingLeft: "10px",
              border: "transparent",
              zIndex: '10000',
              border: '1px solid red'
            }}
            className="ido_input"
          />
          <div style={{height:'10px',color:'red',fontSize:'10px'}}>{addressError}</div>
        </div>
        <div className="ido_input_lable">From:</div>
        <div className="ido_input_raw">
          <div style={{display:'flex', 'flexDirection':'column', width:'65%'}}>
          <input
            name="usdt"
            type="number"
            placeholder="0"
            onChange={handlEnterUSDT}
            value={usdtAmount.toString()}
          style={{ width: "100",
            paddingLeft: "10px",
            zIndex: '10000',
            border: "transparent" }}
            className="ido_input"
          />
          <div style={limitError != ''?{height:'10px',color:'red',fontSize:'10px'}:{display:'none'}}>{limitError}</div>
        </div>
          <div className="ido_token_lable">
            <Image
              src="/static/img/tether-usdt.svg"
              width="20"
              height="20"
              alt=""
            />
            <div className="ido_coin_symbol">USDT</div>
          </div>
        </div>
        <div className="ido_input_lable">To:</div>
        <div className="ido_input_raw">
          <input
            name="usdt"
            type="number"
            placeholder="0"
            onChange={handlEnterWalrum}
            value={walrumAmount.toString()}
          style={{ width: "65%",
                   paddingLeft: "10px",
            border: "transparent",
            zIndex: '10000'
          }}
            className="ido_input"
          />
          <div className="ido_token_lable">
            <Image
              src="/static/img/walrum-token.png"
              width="20"
              height="20"
              alt=""
            />
            <div className="ido_coin_symbol">Walrum</div>
          </div>
        </div>
        <div className="ido_button_container">
          <button onClick={handlIDOClick} className="ido_buy_button" disabled={usdtAmount == 0 || !active} style={usdtAmount == 0 || !active ?{opacity:'0.5',cursor:'unset'}:{}}>
            Buy
          </button>
        </div> 
      </div>
    </div>
  );
};

export default RightComponent;
