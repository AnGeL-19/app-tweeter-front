import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { postReducer } from "./postReducer";

// import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    // ui: uiReducer,
    auth: authReducer
});