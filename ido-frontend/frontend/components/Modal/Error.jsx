import React, {useContext} from 'react';
import ModalContext from '../../context/modals/ModalContext'


const Error = ({error}) => {
  const {closeModal} = useContext(ModalContext)
  const handleClose = () => {
    closeModal()
  }
  return (
    <div className="ido_wallet_container">
      <div style={{justifyContent:'center',gap:'2rem', alignItems: 'center', display:'flex', flexDirection:'column'}}>
        <p style={{textAlign:'center',color:'red'}}>{error}</p>
          <button className="header__btn btn" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Error;
