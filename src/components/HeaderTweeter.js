import React, { useEffect, useRef, useState } from 'react';

import {
    NavLink,
    useLocation
  } from "react-router-dom";

import LogoTweeter from '../static/tweeter.svg';

const PATHS = {
    home: '/home',
    explore: '/explore',
    bookmarks: '/bookmarks',
    profile: '/profile',
}

export const HeaderTweeter = () => {

    let location = useLocation();
    const [path, setPath] = useState('');

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        setPath(location.pathname);
    }, [location])

    return (
        <div>
            <header className="header__nav">
                <div className="header__nav__divs">
                    <div>
                        <img src={LogoTweeter} alt='Logo Tweeter'/>
                    </div>
                    <div className="nav__list">
                        
                        <ul className="nav__list__ul">

                            <li className="item__li" >
                                <NavLink to="/home" 
                                         className="nav_item"
                                         activeClassName="selected"
                                         >Home</NavLink>
                                <div className={`underline__nav ${path === PATHS.home || path === PATHS.profile  ? 'active': ''}`}></div>
                            </li>

                            <li className="item__li" >
                                <NavLink to="/explore" 
                                         className="nav_item"
                                         activeClassName="selected"
                                         >Explore</NavLink>
                                <div className={`underline__nav ${path === PATHS.explore ? 'active': ''}`}></div>
                            </li>

                            <li className="item__li">  
                                <NavLink to="/bookmarks" 
                                         className="nav_item"
                                         activeClassName="selected"
                                         >Bookmarks</NavLink>
                                <div className={`underline__nav ${path === PATHS.bookmarks ? 'active': ''}`}></div>
                            </li>
                        </ul>
                    </div>
                    <div className="div__profile_user">
                        <div className="img_user">
                            <img src="https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1" alt="userimg" />
                        </div>
                        <span className="span__user_name">Xanthe Neal</span>
                        <button className="menu"
                                onClick={()=> setShowMenu(!showMenu)}>
                            <span className={`material-icons ${showMenu ? 'menuActive' : ''} `}>
                                {`arrow_drop_${!showMenu ? 'down' : 'up'}`}
                            </span>
                        </button>

                        {
                            showMenu
                            && 
                            (

                            <div className="menu_profile">
                                <div className="items_menu">
                                    <span className="material-icons gray2Color">
                                        account_circle
                                    </span>
                                    <span className="txt gray2Color">My Profile</span>
                                </div>
                                <div className="items_menu">
                                    <span className="material-icons gray2Color">
                                        people
                                    </span>
                                    <span className="txt gray2Color">Group Chat</span>
                                </div>
                                <div className="items_menu ">
                                    <span className="material-icons gray2Color">
                                        settings
                                    </span>
                                    <span className="txt gray2Color">Settings</span>
                                </div>

                                <div className="line"></div>

                                <div className="items_menu logoutHover">
                                    <span className="material-icons logout">
                                        logout
                                    </span>
                                    <span className="txt logout">Logout</span>
                                </div>
                            </div>

                            )
                        }
                        
                    </div>
                </div>
            </header>
        </div>
    )
}
