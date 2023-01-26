import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUnFollowFollowing } from '../../action/userAction';
import { fetchApi, fetchGetApi } from '../../helpers/fetch';
import { ComponentBtn } from '../ComponentBtn'
import { UserInfoBasic } from '../UserInfoBasic'

export const ItemUserModal = ({user, isFollowers}) => {

    const dispatch = useDispatch();
    const { user: usersF, token } = useSelector(state => state.auth);
    const [follow, setFollow] = useState(usersF.following)
    // console.log(usersF.following);

    // const user = {
    //     img: 'https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1',
    //     name: 'Mikael Stanley',
    //     other: '230k followers',
    // }

    // REALIZAR TAREA DE SEGUIR Y NO SEGUIR
    // /followUnfollow/:id data, label, method,token
    const followUnFollow = async() => {
        const rest = await fetchApi({},`user/followUnfollow/${user.uid}`,'PUT',token)
        const restData = await rest.json()
        console.log(restData);
        // if(restData.ok){
        //     dispatch(followUnFollowFollowing(user.uid, usersF.following))
        //     console.log(usersF.following); 
        // }
        if (follow.includes(user.uid)) {
            setFollow( follow.filter( f => f !== user.uid ) )
        }else{
            setFollow([...follow, user.uid])
        }
        
        console.log('amonos');
    }

    return (
        <div className="container_user_profile_basic">

            <div className="user_profile_btn">

                <UserInfoBasic  img={user.img} 
                                name={user.name}
                                followers={user.followers.length} 
                                uid={user.uid}/>

                {
                    <ComponentBtn
                        normal 
                        txtBtn={`${(follow.includes(user.uid)) ? 'unFollow': 'follow'}`}
                        functionBtn={followUnFollow}
                    />
                    // :
                    // <ComponentBtn
                    //     normal 
                    //     txtBtn={`${isFollowers ? 'unFollow': 'follow'}`}
                    //     addicon='person_add'
                    //     functionBtn={followUnFollow}
                    // />

                }
                
            </div>

            <div className="user_biography">
                <p className="biography">
                    {user.bio}
                    {/* @jjonthan on Instagram
                    **Over a decade as a lifestyle, adventure, and studio photographer. 
                    Traveling with my wife @travelfoodlove on instagram. 
                    PLEASE LINK ALL PHOTOS TO jonathangallegos.com -- not required but 
                    much appreciated! */}
                </p>
            </div>           
        </div>
    )
}
