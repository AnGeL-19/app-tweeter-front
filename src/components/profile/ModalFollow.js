import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGetApi } from '../../helpers/fetch';
import { ItemUserModal } from './ItemUserModal'

export const ModalFollow = ({isFollowers, setShowModal}) => {

    const user = useSelector(state => state.user);

    const {token} = useSelector(state => state.auth);

    const params = useParams();

    const [data, setData] = useState({})

    useEffect(() => {

        console.log(token); 
        const url = !isFollowers ? `user/followers/${params.id}`:`user/following/${params.id}`
        const follow = async () => {
            const rest = await fetchGetApi(url,token)
            const restData = await rest.json()
            console.log(restData);
            setData(restData);
        } 

        follow()
        return () => {
            console.log("salir");
        }
    }, [isFollowers])

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
                        (data.data?.length === 0 || !data.data) 
                        ? <span>No hay followers</span>
                        : 
                        data.data.map((userf,index) => (
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
