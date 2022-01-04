import React from 'react'
import { ComponentBtn } from '../ComponentBtn'
import { UserInfoBasic } from '../UserInfoBasic'

export const ItemWTFollow = () => {

    const user = {
        img: 'https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1',
        name: 'Mikael Stanley',
        other: '230k followers',
    }


    return (
        <div className="populate__user">

            <div className="div__user_btn">
                <UserInfoBasic  img={user.img} 
                                name={user.name} 
                                other={user.other} />

                
                <ComponentBtn normal txtBtn="Follow" addicon="person_add"/> 
            </div>
            <div className="div__info_desc__imgB">
                <p className="info_desc">
                    Photographer & Filmmaker based in 
                    Copenhagen, Denmark ✵ 🇩🇰
                </p>

                <div className="div_imgBackground">
                    <img  src="https://www.highdefwallpaper.com/wp-content/uploads/2017/06/a-screenshot-from-space-engine.jpg" />
                </div>
            </div>
          
        </div>
    )
}
