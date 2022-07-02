import React from 'react';

const WalletConnectChainError = () => {
  return (
    <div className="ido_wallet_container">
      <div style={{justifyContent:'center',gap:'2rem', marginTop:'40px', display:'flex', flexDirection:'column'}}>
        <p style={{textAlign:'center'}}>Please select correct chain (Ethereum main network)</p>
        <a
          href="https://levelup.gitconnected.com/how-to-connect-metamask-to-any-network-9805f42c687f"
          target="_blank"
          rel="noreferrer"
          style={{textAlign:'center'}}
        >
          <button className="header__btn btn">How?</button>
        </a>
      </div>
    </div>
  );
};

export default WalletConnectChainError;
