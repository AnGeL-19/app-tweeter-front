import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { fetchApi, fetchGetApi } from "../helpers/fetch"

import { types } from "../types/types";
import { userData } from "./userAction";


export const loginUser = (data) => {
    return async(dispatch) => {

        try{
            dispatch(loading(true))
            const resp = await fetchApi(data, 'login/', 'POST');
            const body = await resp.json();

            if(body.ok){   
                Cookies.set('token', body.token);        
                dispatch(login({ok:body.ok, token: body.token}));
                dispatch(userData(body.data));
                dispatch(loading(false))
                
            }else{
                dispatch(loading(false)) 
            }
            
        }catch(err){
            dispatch(loading(false)) 
        }
        
    }

}

const login = (data) => ({
    type: types.authLogin,
    payload: data
});

export const registerUser = (data) => {
    return async (dispatch) => {
        try{
            dispatch(loading(true))
            const resp = await fetchApi(data ,'login/new/', 'POST');
            const body = await resp.json();

            Cookies.set('token', body.token);
            dispatch(login({ok:body.ok, token: body.token}));
            dispatch(userData(body.data));
            dispatch(loading(false))
        }catch(err){
            dispatch(loading(false)) 
        }
    }
}

const register = (data) => ({
    type: types.registerUser,
    payload: data
});


export const logoutUser = () => {
    return (dispatch) => {
        Cookies.remove('token')
        dispatch(logout())
        dispatch(userLogout())
        dispatch(loading(false))
    }
}


const logout = () => ({
    type: types.authLogout,
    payload: false
})

const userLogout = () => ({
    type: types.userLogout
})

const loading = (value) => ({
    type: types.authLoading,
    payload: value
})

export const startCheking = () => {
    return async (dispatch) => {

        if(!Cookies.get('token')) return dispatch(loading(false));
        
        try {
            dispatch(loading(true));
            const token = Cookies.get('token');
    
            const resp = await fetchGetApi('login/renew', token);
            const body = await resp.json();
            Cookies.remove('token');
    
            if(body.ok){
                Cookies.set('token', body.token);      
                dispatch(login({ok:body.ok, token: body.token}));  
                dispatch(userData(body.data));
                dispatch(loading(false))
            }else{
                Cookies.remove('token');
                dispatch(loading(false)) 
            }
        } catch (error) {
            Cookies.remove('token');
            dispatch(loading(false)) 
        }
       
    }
}

