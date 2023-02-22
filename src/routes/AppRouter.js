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


export const AppRouter = () => {

    const dispatch = useDispatch();
    const {auth} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startCheking());
        console.log('hola', auth);
    }, [dispatch]);


    return (
        <Router>
            <div className='container_main_app'>
                <Switch>
                    <PublicRoute isAuthenticated={auth} path="/auth" component={ AuthRoute } />
                    <PrivateRoute isAuthenticated={auth} path="/" component={ TweeterRouter } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
