import React from 'react'
import { ComponentBtn } from '../ComponentBtn'
import { UserInfoBasic } from '../UserInfoBasic'

export const ItemWTFollow = ({user}) => {

    // const user = {
    //     img: 'https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1',
    //     name: 'Mikael Stanley',
    //     other: '230k followers',
    // }


    return (
        <div className="populate__user">

            <div className="div__user_btn">
                <UserInfoBasic  uid={user.uid}
                                img={user.imgUser} 
                                name={user.name} 
                                followers={user.followers.length} />

                
                <ComponentBtn normal txtBtn="Follow" addicon="person_add"/> 
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
}
