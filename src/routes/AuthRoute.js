import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';


export const AuthRoute = () => {
    return (
        <>
            <Switch>
                <Route exact path="/auth/login" component={LoginPage} />
                <Route exact path="/auth/register" component={RegisterPage} />

                <Redirect to="/auth/login" />
            </Switch>
        </>
    )
}
