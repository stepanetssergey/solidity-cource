import React, { useContext } from "react";
import SelectWalletModal from '../Modal/SelectWalletModal'
import ModalContext from '../../context/modals/ModalContext'
import { useWeb3React } from '@web3-react/core';


const SelectWalletButton = ({ fill }) => {
  const {openModal} = useContext(ModalContext)
  const context = useWeb3React();
  const { library, account, chainId, activate, deactivate, active } = context;
  const handlSelectWallet = () => {
    openModal({
        title:'Select Wallet',
        children: <SelectWalletModal />,
    })
  }
  return (
    <button className={fill ? "header__btn btn" : "btn btn--trans"} onClick={handlSelectWallet}>
      {!active ? 'Select Wallet' : account.substring(0,4)+'...'+account.substring(38,42)} 
    </button>
  );
};

export default SelectWalletButton
