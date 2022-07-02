import React, {useContext} from 'react';
import ModalContext from '../../context/modals/ModalContext'
import Config from '../../config'


const SuccessBuy = () => {
  const {closeModal} = useContext(ModalContext)
  const handleClose = () => {
    closeModal()
  }
  return (
    <div className="ido_wallet_container">
      <div style={{justifyContent:'center',gap:'2rem', alignItems: 'center', display:'flex', flexDirection:'column'}}>
        <p style={{textAlign:'center'}}>SUCCESS! Please check your account. Token address: {Config().WALRUM_TOKEN}</p>
          <button className="header__btn btn" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessBuy;
