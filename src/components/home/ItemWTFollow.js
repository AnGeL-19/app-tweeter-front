import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUnFollowFollowing } from '../../action/userAction';
import { useFetch } from '../../hooks/useFetch';
import { ComponentBtn } from '../ComponentBtn'
import { UserInfoBasic } from '../UserInfoBasic'

const ItemWTFollow = React.forwardRef(({user}, ref) => {

    const dispatch = useDispatch();
    const usersF = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);
    const [follow, setFollow] = useState(usersF.following)
    
    const {data, doFetch, loading} = useFetch(token);


    useEffect(() => {

        if(data.ok){
            dispatch(followUnFollowFollowing(user.uid, usersF.following))
        }
        
    }, [data])
    

    const followUnFollow = () => {
        
        doFetch(`user/followUnfollow/${user.uid}`,{},'PUT')

        if (follow.includes(user.uid)) {
            setFollow( follow.filter( f => f !== user.uid ) )
        }else{
            setFollow([...follow, user.uid])
        }

    }

    return (
        <div className="populate__user"
             ref={ref}>

            <div className="div__user_btn">
                <UserInfoBasic  uid={user.uid}
                                img={user.imgUser} 
                                name={user.name} 
                                followers={user.followers.length || 0} />

                
                <ComponentBtn   type={'button'}
                                normal 
                                txtBtn={`${(follow.includes(user.uid)) ? 'Unfollow': 'Follow'}`}
                                addicon={(follow.includes(user.uid)) ? 'person_remove': 'person_add'}
                                functionBtn={followUnFollow}
                /> 

            </div>
            <div className="div__info_desc__imgB">
                <p className="info_desc">
                    { 
                        user.bio 
                    }
                </p>

                <div className="div_imgBackground">
                    <img  src={`${user.imgUserBackground}`} alt='imagen'/>
                </div>
            </div>
          
        </div>
    )
})

export default ItemWTFollow