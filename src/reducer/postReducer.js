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


}