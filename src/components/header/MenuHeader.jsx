import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    NavLink
  } from "react-router-dom";
import { logoutUser } from '../../action/authAction';


export const MenuHeader = memo(() => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <div className="menu_profile">
            <div className="items_menu">
                <NavLink to={`/profile/${user.uid}/tweets`} 
                        className="nav_item"
                        activeClassName="selected">
                    <span className="material-icons gray2Color">
                        account_circle
                    </span>
                    <span className="txt gray2Color">My Profile</span>
                </NavLink>
            </div>
            <div className="items_menu">
                <NavLink to="/" 
                        className="nav_item"
                        activeClassName="selected">
                    <span className="material-icons gray2Color">
                        people
                    </span>
                    <span className="txt gray2Color">Group Chat</span>
                </NavLink>
            </div>
            <div className="items_menu ">
                <NavLink to="/" 
                        className="nav_item"
                        activeClassName="selected">
                    <span className="material-icons gray2Color">
                        settings
                    </span>
                    <span className="txt gray2Color">Settings</span>
                </NavLink>
            </div>

            <div className="line"></div>

            <div className="items_menu logoutHover">
                <div className="nav_item" onClick={handleLogout}>
                    <span className="material-icons logout">
                        logout
                    </span>
                    <span className="txt logout" >Logout</span>
                </div>
            </div>
        </div>
    )
})
