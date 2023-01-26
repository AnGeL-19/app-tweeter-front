import { types } from "../types/types";

const initialState = { 
   auth: false,
   token: null,
   user: null
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
        case types.followUnfollowFollowing:

            const { user ,...rest} = state;
            const { following, ...userRest } = user;

            return{
                ...rest,
                user: {
                    ...userRest,
                    following: action.payload
                }
            } 
        default: 
            return state;
    }
}