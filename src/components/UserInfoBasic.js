import React from 'react'
import { NavLink } from 'react-router-dom'
import { dateFormat } from '../helpers/formatDate'

export const UserInfoBasic = ({img, name, followers, uid, date, addDate}) => {

    return (
        <div className="div__info_basic">
            
            <div className="div__img_user">
                <NavLink to={`/profile/${uid}`}>
                    <img src={img} alt={name}/>
                </NavLink>
            </div>
            <div className="div__info">
                <NavLink to={`/profile/${uid}`}>
                    <span className="user_name">
                        {name}
                    </span>  
                </NavLink>
                <span className="other_info">
                    { addDate ? dateFormat(date) : `${followers} followers` } 
                </span>
            </div>

        </div>
    )
}
