import { combineReducers } from "@reduxjs/toolkit";
import { novelApi } from "../service/api/novelApi";
import { authApi } from "../service/api/loginApi";
import authReducer from "../components/User/authSlice"
import { registerApi } from "../service/api/registerApi";


export const rootReducer = combineReducers({
    [novelApi.reducerPath]: novelApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [registerApi.reducerPath]: registerApi.reducer,
    

});