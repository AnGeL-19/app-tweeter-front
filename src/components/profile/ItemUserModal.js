import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUnFollowFollowing } from '../../action/userAction';
import { fetchApi, fetchGetApi } from '../../helpers/fetch';
import { useFetch } from '../../hooks/useFetch';
import { ComponentBtn } from '../ComponentBtn'
import { UserInfoBasic } from '../UserInfoBasic'

export const ItemUserModal = ({user, isFollowers}) => {

    const dispatch = useDispatch();

    const usersF = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);

    const { data, doFetch } = useFetch(token);

    const [follow, setFollow] = useState(usersF.following)

    useEffect(() => {

        if(data.ok){
            dispatch(followUnFollowFollowing(user.uid, usersF.following))
        }
        
    }, [data])

    // REALIZAR TAREA DE SEGUIR Y NO SEGUIR
    // /followUnfollow/:id data, label, method,token

    const followUnFollow = async() => {

        doFetch(`user/followUnfollow/${user.uid}`,{},'PUT')

        if (follow.includes(user.uid)) {
            setFollow( follow.filter( f => f !== user.uid ) )
        }else{
            setFollow([...follow, user.uid])
        }
    }

    return (
        <div className="container_user_profile_basic">

            <div className="user_profile_btn">

                <UserInfoBasic  img={user.imgUser} 
                                name={user.name}
                                followers={user.followers.length} 
                                uid={user.uid}/>

                {
                    <ComponentBtn
                        normal 
                        txtBtn={`${(follow.includes(user.uid)) ? 'Unfollow': 'Follow'}`}
                        addicon={(follow.includes(user.uid)) ? 'person_remove': 'person_add'}
                        functionBtn={followUnFollow}
                    />
 
                }
                
            </div>

            <div className="user_biography">
                <p className="biography">
                    {user.bio}
                </p>
            </div>           
        </div>
    )
}
