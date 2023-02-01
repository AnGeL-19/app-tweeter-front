import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";

// import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    // ui: uiReducer,
    auth: authReducer,
    user: userReducer
});