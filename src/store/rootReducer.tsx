import { combineReducers } from "@reduxjs/toolkit";
import { novelApi } from "../service/api/novelApi";
import { authApi } from "../service/api/loginApi";
import authReducer from "../components/User/authSlice"


export const rootReducer = combineReducers({
    [novelApi.reducerPath]: novelApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    

});