import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router, 
    Switch,
    Redirect
} from "react-router-dom";
import { startCheking } from '../action/authAction';

import { AuthRoute } from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { TweeterRouter } from './TweeterRoute';
import { LoadingComponent } from '../components/LoadingComponent'


export const AppRouter = () => {

    const dispatch = useDispatch();
    const {auth, loading} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startCheking());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="container__loading">
                <LoadingComponent logo />
            </div>  
        )
    }

    return (
        <div className="container_main_app">
            <Router>
                
                <Switch>
                    <PublicRoute isAuthenticated={auth} path="/auth" component={ AuthRoute } />
                    <PrivateRoute isAuthenticated={auth} path="/" component={ TweeterRouter } />

                    <Redirect to="/" />
                </Switch>
                
            </Router>
        </div>
    )
}
