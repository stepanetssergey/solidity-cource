import React from 'react';

const WalletConnectNoMetamaskError = () => {
  return (
    <div className="ido_wallet_container">
      <div style={{justifyContent:'center',gap:'2rem', marginTop:'40px', display:'flex', flexDirection:'column'}}>
        <p style={{textAlign:'center'}}>For wallet selection click button!</p>
          <button className="header__btn btn">How install wallet?</button>
      </div>
    </div>
  );
};

export default WalletConnectNoMetamaskError;
