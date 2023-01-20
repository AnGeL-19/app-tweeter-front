import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    NavLink,
    useRouteMatch
  } from "react-router-dom";

import LogoTweeter from '../../static/tweeter.svg';
import { MenuHeader } from './MenuHeader';

const PATHS = {
    home: '/home',
    explore: '/explore',
    bookmarks: '/bookmarks',
    profile: '/profile/:id',
}

export const HeaderTweeter = () => {

    const match = useRouteMatch()

    const {user} = useSelector(state => state.auth);
    const [path, setPath] = useState('');

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        setPath(match.path);
    }, [match])

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
                            <img src={user.imgUser} alt="userimg" />
                        </div>
                        <span className="span__user_name">{user.name}</span>
                        <button className="menu"
                                onClick={()=> setShowMenu(!showMenu)}>
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
                </div>
            </header>
        </div>
    )
}
