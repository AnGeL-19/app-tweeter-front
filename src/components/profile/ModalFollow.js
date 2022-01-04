import React, { useContext, useEffect } from 'react'
import { ContextShowModal } from '../../pages/ProfilePage';
import { ItemUserModal } from './ItemUserModal'

export const ModalFollow = () => {

    const {handleShowModalFollowers,handleShowModalFollowing} = useContext(ContextShowModal);

    useEffect(() => {
        console.log("hola");
        return () => {
            console.log("salir");
        }
    }, [])

    return (
        <div className="container_modal">

            

            <div className="modal_main">

                <div className="user__btn_exit">
                    <div className="div_name_user">
                        <span className="name_user_following">Daniel Jensen is following</span>
                    </div>
                    <div className="btn_exit">
                        <button onClick={handleShowModalFollowers || handleShowModalFollowing}>
                            <span className="material-icons">
                                close
                            </span>
                        </button>
                    </div>
                </div>
                
                <div className="users_followers">

                    <div className="line"></div>
                    <ItemUserModal />

                    <div className="line"></div>
                    <ItemUserModal />
                    
                    <div className="line"></div>
                    <ItemUserModal />

                    <div className="line"></div>
                    <ItemUserModal />

                </div>                

            </div>
            
        </div>
    )
}
