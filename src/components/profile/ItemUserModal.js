import React from 'react'
import { ComponentBtn } from '../ComponentBtn'
import { UserInfoBasic } from '../UserInfoBasic'

export const ItemUserModal = ({user,isFollowers}) => {


    // const user = {
    //     img: 'https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1',
    //     name: 'Mikael Stanley',
    //     other: '230k followers',
    // }

    return (
        <div className="container_user_profile_basic">

            <div className="user_profile_btn">

                <UserInfoBasic  img={user.img} 
                                name={user.name}
                                followers={user.followers.length} 
                                uid={user.uid}/>

                {
                    isFollowers
                    ?
                    <ComponentBtn
                        normal 
                        txtBtn={`${isFollowers ? 'unFollow': 'follow'}`}
                    />
                    :
                    <ComponentBtn
                        normal 
                        txtBtn={`${isFollowers ? 'unFollow': 'follow'}`}
                        addicon='person_add'
                    />

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
