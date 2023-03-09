import React from 'react'
import useSWR from 'swr'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetcher } from '../../helpers/fetch';
import { LoadingComponent } from '../LoadingComponent';
import { NotDataComponent } from '../NotDataComponent';
import { ItemUserModal } from './ItemUserModal'

export const ModalFollow = ({isFollowers, setShowModal}) => {

    const user = useSelector(state => state.user);

    const param = useParams();

    const { data: usersF, isLoading, error } = useSWR(!isFollowers ? 
                                                        `user/followers/${param.id}`:
                                                        `user/following/${param.id}`, 
                                                        fetcher)

    return (
        <div className="container_modal">

            <div className="modal_main">

                <div className="user__btn_exit">
                    <div className="div_name_user">
                        <span className="name_user_following">{user.name} is {isFollowers ? 'Following':'Followers'}</span>
                    </div>
                    <div className="btn_exit">
                        <button onClick={() => setShowModal(false)}>
                            <span className="material-icons">
                                close
                            </span>
                        </button>
                    </div>
                </div>
                
                <div className="users_followers">

                    {
                        
                            (isLoading)
                            ? <LoadingComponent />
                            :
                                (usersF.data.length === 0) 
                                ? <NotDataComponent text={'No hay followers'} />
                                : 
                                usersF.data.map((userf,index) => (
                                    <>
                                        <div className="line"></div>
                                        <ItemUserModal key={userf.uid+index} user={userf}  />
                                    </>
                                ))
   
                    }
                    
                </div>                

            </div>
            
        </div>
    )
}
