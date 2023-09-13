import React from 'react';
import { Switch } from 'react-router'
import { Route, Redirect } from 'react-router-dom';
import { BookmarksPage } from '../pages/BookmarksPage';
import { ExplorePage } from '../pages/ExplorePage';
import { HomePage } from '../pages/HomePage';
import { ProfilePage } from '../pages/ProfilePage';
import { NotFound404 } from '../pages/NotFound404';
import { HeaderTweeter } from '../components/header/HeaderTweeter';
import { Menu } from '../components/menu/Menu';



export const TweeterRouter = () => {
    return (
        <div className="container" >

            <HeaderTweeter />

            <div className="main_layout">
                <Switch>
                    
                    <Route exact path="/home" component={HomePage} />
                    <Route  path="/explore/:filter" component={ExplorePage} />
                    <Route  path="/bookmarks/:filter" component={BookmarksPage} />
                    <Route  path="/profile/:id/:filter" component={ProfilePage} />


                    <Route  path="/not-found" component={NotFound404} />
                    <Route path="*" component={NotFound404} />
                        
                    
                </Switch>
            </div>
            
            <Menu />
        </div>
    )
}
