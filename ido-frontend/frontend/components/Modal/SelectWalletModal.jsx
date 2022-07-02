import React, { useState, useContext } from "react";
import Image from "next/image";
import {
  InjectedConnector,
  NoEthereumProviderError,
} from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useWeb3React } from "@web3-react/core";
import Config from "../../config";
import ModalContext from "../../context/modals/ModalContext";
import WalletConnectChainError from "./WalletConnectChainError";
import WalletConnectNoMetamaskError from "./WalletConnectNoMetamaskError";

export const injected = new InjectedConnector({
  supportedChainIds: [Config().CHAIN_ID],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { [Config().CHAIN_ID]: Config().BLOCKCHAIN_NODE },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000,
});

const SelectWalletModal = () => {
  const { closeModal, openModal } = useContext(ModalContext);
  const [currentError, setError] = useState("");
  const context = useWeb3React();
  const { library, account, chainId, activate, deactivate, active } = context;

  const handlSelectWallet = async (event) => {
    if (event.currentTarget === null) {
      return;
    }
    var error;
    if (event.currentTarget?.id == "metamask") {
      if (!active) {
        await activate(injected, (e) => {
          error = e.message;
          if (error?.indexOf("Unsupported chain id") !== -1) {
            deactivate();
            openModal({
              title: "Not correct chain!",
              children: <WalletConnectChainError />,
              small: true,
            });
            return;
          } else if (error?.indexOf("No Ethereum provider") !== -1) {
            openModal({
              title: "You have to use wallet!",
              children: <WalletConnectNoMetamaskError />,
              small: true,
            });
            return;
          } else {
            closeModal();
          }
        });
        console.log(error);
      }
    }

    if (event.currentTarget?.id == "walletconnect") {
      var walletconnectNow = new WalletConnectConnector({
        rpc: { [Config().CHAIN_ID]: Config().BLOCKCHAIN_NODE },
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
        pollingInterval: 12000,
      });
      await activate(walletconnectNow, (e) => {
        error = e.message;
      });
    }
    if (error === "" || error === undefined) {
      closeModal();
      setError({ walletType: "walletconnect", error: "" });
    } else {
      setError({ walletType: event.currentTarget?.id, error: error });
      openModal({
        title: "Not correct chain!",
        children: <WalletConnectChainError />,
        small: true,
      });
      return;
    }
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <div className="ido_wallet_container">
        <div className="ido_wallet_item">
          <div
            className="ido_wallet_name"
            id="metamask"
            onClick={handlSelectWallet}
          >
            MetaMask
          </div>
        </div>
        <div
          className="ido_wallet_item"
          id="walletconnect"
          onClick={handlSelectWallet}
        >
          <div className="ido_wallet_name">WalletConnect</div>
        </div>
      </div>
    </div>
  );
};

export default SelectWalletModal;
