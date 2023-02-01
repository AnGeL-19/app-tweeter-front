import { types } from "../types/types";

const initialState = { 
   auth: false,
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
                user: null,
                token: null,
            } 
        default: 
            return state;
    }
}