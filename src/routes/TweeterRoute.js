import React from 'react';
import { Switch } from 'react-router'
import { Route, Redirect } from 'react-router-dom';
import { BookmarksPage } from '../pages/BookmarksPage';
import { ExplorePage } from '../pages/ExplorePage';
import { HomePage } from '../pages/HomePage';
import { ProfilePage } from '../pages/ProfilePage';

export const TweeterRouter = () => {
    return (
        <>
            <Switch>
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/explore" component={ExplorePage} />
                <Route exact path="/bookmarks" component={BookmarksPage} />
                <Route exact path="/profile/:id" component={ProfilePage} />
                <Redirect to="/home" />
            </Switch>
        </>
    )
}
