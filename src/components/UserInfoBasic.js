import React from 'react'

export const UserInfoBasic = ({img, name, other}) => {

    return (
        <div className="div__info_basic">
            <div className="div__img_user">
                <img src={img} alt={name}/>
            </div>
            <div className="div__info">
                <span className="user_name">
                    {name}
                </span>
                <span className="other_info">
                    {other}
                </span>
            </div>
        </div>
    )
}
