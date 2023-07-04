import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";
import { errorReducer } from "./errrorReducer";

// import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    error: errorReducer,
    auth: authReducer,
    user: userReducer
});