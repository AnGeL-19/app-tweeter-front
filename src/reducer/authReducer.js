import { types } from "../types/types";

const initialState = { 
   auth: false,
   loading: true,
   token: null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type){

        case types.authLogin:
            return{
                ...state,
                auth: action.payload.ok,
                user: action.payload.user,
                token: action.payload.token
            } 
        case types.authLogout:
            return{
                auth: action.payload,
                loading: true,
                user: null,
                token: null,
            } 
        case types.authLoading:
            return{
                ...state,
                loading: action.payload,
            } 
        default: 
            return state;
    }
}