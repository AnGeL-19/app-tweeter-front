import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
    NavLink,
    useRouteMatch
  } from "react-router-dom";

import LogoTweeter from '../../static/tweeter.svg';
import LogoTweeterSmall from '../../static/tweeter-small.svg';

import { MenuHeader } from './MenuHeader';

const PATHS = {
    home: '/home',
    explore: '/explore',
    bookmarks: '/bookmarks',
    profile: '/profile/:id',
}

export const HeaderTweeter = React.memo(() => {

    const match = useRouteMatch()

    const user = useSelector(state => state.user);

    const [showMenu, setShowMenu] = useState(false);

    const showMenuHeader = useCallback(() => {
        setShowMenu(!showMenu)
    },[showMenu])
    
    console.log('Rederizado header');

    return (
        <div>
            <header className="header__nav">
                <div className="header__nav__divs">
                    <NavLink to="/home" 
                             className='nav_logo'>
                        {
                            <>
                                <img src={LogoTweeterSmall} className="logoSmall" alt='Logo Tweeter Small'/>
                                <img src={LogoTweeter} className="logo" alt='Logo Tweeter'/>
                            </>
                        }
                        
                    </NavLink>
                    <div className="nav__list">
                        
                        <ul className="nav__list__ul">

                            <li className="item__li" >
                                <NavLink to="/home" 
                                         className="nav_item show"
                                         activeClassName="selected"
                                         >Home</NavLink>

                                <NavLink to="/home" 
                                         className="nav_item none"
                                         activeClassName="selected"
                                         >
                                        <span className="material-icons">
                                            home
                                        </span>
                                </NavLink>

                                <div className={`underline__nav ${match.path === PATHS.home || match.path === PATHS.profile  ? 'active': ''}`}></div>
                            </li>

                            <li className="item__li" >
                                <NavLink to="/explore" 
                                         className="nav_item show"
                                         activeClassName="selected"
                                         >
                                            Explore
                                </NavLink>

                                <NavLink to="/explore" 
                                         className="nav_item none"
                                         activeClassName="selected"
                                         >
                                        <span className="material-icons">
                                            explore
                                        </span>
                                </NavLink>
                                <div className={`underline__nav ${match.path === PATHS.explore ? 'active': ''}`}></div>
                            </li>

                            <li className="item__li">  
                                <NavLink to="/bookmarks" 
                                         className="nav_item show"
                                         activeClassName="selected"
                                         >Bookmarks</NavLink>

                                <NavLink to="/bookmarks" 
                                         className="nav_item none"
                                         activeClassName="selected"
                                         >
                                        <span className="material-icons">
                                            bookmarks
                                        </span>
                                </NavLink>
                                <div className={`underline__nav ${match.path === PATHS.bookmarks ? 'active': ''}`}></div>
                            </li>
                        </ul>
                    </div>
                    <div className="div__profile_user">
                        <div className="img_user">
                            <img src={user.imgUser} alt="userimg" />
                        </div>
                        <span className="span__user_name">{user.name}</span>
                        <button className="menu"
                                onClick={showMenuHeader}>
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
})