import "../styles/globals.css";
import ModalProvider from "../context/modals/ModalProvider";
import DataProvider from "../context/data/DataProvider";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <DataProvider>
        <ModalProvider>
          <div id="modal" />
          <Component {...pageProps} />
        </ModalProvider>
      </DataProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
