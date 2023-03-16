import React, {  useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { useDispatch, useSelector } from 'react-redux';
import { followUnFollowFollowing } from '../../action/userAction';
import { ComponentBtn } from '../ComponentBtn'
import { UserInfoBasic } from '../UserInfoBasic'
import { fetcherPut } from '../../helpers/fetch';

const ItemWTFollow = React.forwardRef(({user}, ref) => {

    const dispatch = useDispatch();

    const { trigger, isMutating } = useSWRMutation(`user/followUnfollow/${user.uid}`, fetcherPut)
    const usersF = useSelector(state => state.user);

    const [follow, setFollow] = useState(usersF.following)

    const followUnFollow = async() => {

        try {

            const result = await trigger({}, /* options */)

            if (!result.ok) throw new Error('Error', result)

            dispatch(followUnFollowFollowing(user.uid, usersF.following))

            console.log(result);
            if (follow.includes(user.uid)) {
                setFollow( follow.filter( f => f !== user.uid ) )
            }else{
                setFollow([...follow, user.uid])
            }

          } catch (e) {
            console.log(e);
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