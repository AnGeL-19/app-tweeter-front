import { types } from "../types/types";

const initialState = { 
    posts: [],
    postActive: null
}

export const postReducer = (state = initialState, action) => {

    switch (action.type){

        default: 
            return state;
    }

    // switch (action.type) {

    //     case types.addPostImg:
    //         return {
    //             ...state,
    //             posts: [action.payload,...state.posts]
    //         }

    //     case types.loadPostImg:
    //         return {
    //             ...state,
    //             posts: [...action.payload]
    //         }

    //     case types.deltePostImg:
    //         return {
    //             ...state,
    //             posts: state.posts.filter(e => (e.id !== state.postActive.id)),
    //             postActive: null
    //         }
        
    //     case types.activePostImg:
    //         return{
    //             ...state,
    //             postActive: action.payload
    //         }

    //     case types.desactivePostImg:
    //         return{
    //             ...state,
    //             postActive: null
    //         }
        
    //     case types.searchPost:
    //         return{
    //             ...state,
    //             posts: [...action.payload]
    //         }

    //     default:
    //         return state;
    // }


}