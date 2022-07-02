
import React, {useContext,  useCallback, useEffect, useState} from 'react'
import ModalContext from '../../context/modals/ModalContext'
import Image from 'next/image'

export default function Modal(props) {

    const {children, title, small } = props;
    const { closeModal } = useContext(ModalContext)
    

    const handlCloseModal = () => {
          closeModal();
    }
    
    

    const escFunction = useCallback((event) => {
        if(event.keyCode === 27) {
            closeModal();
        }
      }, [closeModal]);
    
      useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    
        return () => {
          document.removeEventListener("keydown", escFunction, false);
        };
      }, [escFunction]);

    return (
        <div className="modal_backarea" onClick={ handlCloseModal } >
          <div className={!small?"modal_container":"modal_container_small"} onClick={(e) => e.stopPropagation()} >
            <div className="modal_header">
              <div className="close_icon_div"><Image 
              src="/static/img/close.svg" 
              className="close_icon" 
              onClick={handlCloseModal} width="15" height="15" alt=""/></div>
            </div>
            <div className="header_text">{ title }</div>
            
               { children }
            
            </div>
        </div>
    )
}
