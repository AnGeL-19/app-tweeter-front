import React from 'react'

import {
    NavLink
  } from "react-router-dom";

export const MenuHeader = () => {
    return (
        <div className="menu_profile">
            <div className="items_menu">
                <NavLink to="/profile" 
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
                <NavLink to="/" 
                        className="nav_item"
                        activeClassName="selected">
                    <span className="material-icons logout">
                        logout
                    </span>
                    <span className="txt logout">Logout</span>
                </NavLink>
            </div>
        </div>
    )
}
