import React from 'react';
import {
    BrowserRouter as Router, 
    Switch,
    Redirect
} from "react-router-dom";

import { AuthRoute } from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { TweeterRouter } from './TweeterRoute';


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={true} path="/auth" component={ AuthRoute } />
                    <PrivateRoute isAuthenticated={true} path="/" component={ TweeterRouter } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
