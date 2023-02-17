import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { fetchApi, fetchGetApi } from "../helpers/fetch"

import { types } from "../types/types";
import { userData } from "./userAction";


export const loginUser = (data) => {
    return async(dispatch) => {

        try{

            const resp = await fetchApi(data, 'login/', 'POST');
            const body = await resp.json();

            console.log(body);
            if(body.ok){   
                Cookies.set('token', body.token);        
                dispatch(login({ok:body.ok, user: body.data, token: body.token}));
                dispatch(userData(body.data));
            }
            
        }catch(err){
            console.log(err);
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
            const resp = await fetchApi(data ,'login/new/', 'POST');
            const body = await resp.json();

            console.log(body);
            Cookies.set('token', body.token);
            dispatch(login({ok:body.ok, user: body.user, token: body.token}));
        }catch(err){
            console.log(err);
        }
    }
}

const register = (data) => ({
    type: types.registerUser,
    payload: data
});


export const logoutUser = () => {
    return (dispatch) => {
        console.log("entra en logout");
        Cookies.remove('token')
        dispatch(logout())
    }
}


const logout = () => ({
    type: types.authLogout,
    payload: false
})

export const startCheking = () => {
    return async (dispatch) => {

        if(!Cookies.get('token')) return;
        
        // const {token} = useSelector(state => state.auth);
        const token = Cookies.get('token');
        console.log(token);

        const resp = await fetchGetApi('login/renew', token);
        const body = await resp.json();
        Cookies.remove('token');

        console.log(body);

        if(body.ok){
            Cookies.set('token', body.token);        
            dispatch(login({ok:body.ok, token: body.token}));
            dispatch(userData(body.data));
        }
    }
}

// export const postStartDelete = () => {
//     return async (dispatch, getState) => {
        
//         const {id} = getState().post.postActive;

//         try {

//             const resp = await fetchDeletePostImg(id);
//             const body = await resp.json();
//             console.log(body);
    
//             if(body.ok){
//                 dispatch(postDelete());
//             }
//         } catch (error) {
//             console.log(error);
//         }
        

//     }
// }

// const postDelete = () => ({
//     type: types.deltePostImg
// });

// export const setActivePost = (data) => ({

//     type: types.activePostImg,
//     payload: data

// });

// export const desactivePost = () => ({
//     type: types.desactivePostImg,
// });

// export const searchStartPost = (label) => {
//     return async (dispach) => {

//         try{

//             const resp = await fetchSearchPostImg(label);
//             const body = await resp.json();

//             if(body.ok){
//                 dispach(searchPost(body.postImgs));
//             }else{
//                 Swal.fire('Error',body.msg, 'error') ;  
//             }

//         }catch(error){
//             console.log(error);
//         }

//     }
// }

// const searchPost = (data) => ({
//     type: types.searchPost,
//     payload: data
// });