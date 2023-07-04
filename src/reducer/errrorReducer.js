import { types } from "../types/types";

const initialState = { 
   messageError: ''
}

export const errorReducer = (state = initialState, action) => {

    switch (action.type){

        case types.addError:
            return{
                messageError: action.payload
            } 
        case types.removeError:
            return{
                messageError: ''
            } 
        default: 
            return state;
    }
}