import React from 'react'

export const Modal = ({children,setShowModal,title}) => {
  return (
    <>
    <div className="blur-modal"
        onClick={() => setShowModal(false)}>
    </div>

    <div className="container_modal">

 
        <div className="modal">

            <div className='modal_main'>

                <div className="btn__title">
                    <div className="btn_exit">
                        <button onClick={() => setShowModal(false)}>
                            <span className="material-icons">
                                close
                            </span>
                        </button>
                    </div>
                    
                    <h3 className="title_modal">{title}</h3>
                </div>
                

                <div className="container_main">
                    {children}
                </div>

            </div>
    
        </div>
    </div>   
    </>
  )
}
