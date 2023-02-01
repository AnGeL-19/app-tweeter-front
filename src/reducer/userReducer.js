import { types } from "../types/types";

const initialState = { 
    uid: "",
    bio: "",
    name: "",
    email: "",
    imgUser: "",
    imgUserBackground: "",
    loginGoogle: false,
    posts: [],
    retweets: [],
    saved: [],
    followers: [],
    following: [],
    likes: [],
    nfollowers: 0,
    nfollowing: 0
}

export const userReducer = (state = initialState, action) => {

    switch (action.type){

        case types.userAddData:
            return{
                ...action.payload
            }

         case types.followUnfollowFollowing:

            return{
                ...state,
                following: action.payload.following,
                nfollowing: action.payload.nfollowing,
            } 
        default: 
            return state;
    }
}