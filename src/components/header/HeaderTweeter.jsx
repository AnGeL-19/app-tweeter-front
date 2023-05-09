import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
    NavLink,
    useLocation
  } from "react-router-dom";

import LogoTweeter from '../../static/tweeter.svg';
import LogoTweeterSmall from '../../static/tweeter-small.svg';

import { MenuHeader } from './MenuHeader';

const PATHS = {
    home: '/home',
    explore: '/explore',
    bookmarks: '/bookmarks',
    profile: '/profile',
}

export const HeaderTweeter = React.memo(() => {

    const route = useLocation()

    const user = useSelector(state => state.user);
    const [showMenu, setShowMenu] = useState(false);
    const path = `/${route.pathname.split('/')[1]}`


    return (

        <header className="header__nav">
            <nav className="header__nav__divs">
                <NavLink to="/home" 
                            className='nav_logo'>
                    {
                        <>
                            <img src={LogoTweeterSmall} className="logoSmall" alt='Logo Tweeter Small'/>
                            <img src={LogoTweeter} className="logo" alt='Logo Tweeter'/>
                        </>
                    }
                    
                </NavLink>
                <div className="nav__list none">
                    
                    <ul className="nav__list__ul " >

                        <li className="item__li" >
                            <NavLink to="/home" 
                                        className="nav_item"
                                        activeClassName="selected"
                                        >Home</NavLink>


                            <div className={`underline__nav  ${path === PATHS.home || path === PATHS.profile  ? 'active': ''}`}></div>
                        </li>

                        <li className="item__li" >
                            <NavLink to="/explore" 
                                        className="nav_item"
                                        activeClassName="selected"
                                        >
                                        Explore
                            </NavLink>


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
                        <NavLink to={`/profile/${user.uid}`}>
                            <img src={user.imgUser} alt="userimg" />
                        </NavLink>  
                    </div>
                    <span className="span__user_name">{user.name}</span>
                    <button className="menu"
                            onClick={() => setShowMenu(!showMenu)}>
                        <span className={`material-icons ${showMenu ? 'menuActive' : ''} `}>
                            {`arrow_drop_${!showMenu ? 'down' : 'up'}`}
                        </span>
                    </button>

                    {
                        showMenu
                            && 
                        <MenuHeader />
                    }
                    
                </div>
            </nav>
        </header>
    )
})
