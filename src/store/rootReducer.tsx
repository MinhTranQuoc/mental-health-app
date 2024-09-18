import { combineReducers } from "@reduxjs/toolkit";
import { novelApi } from "../service/api/novelApi";


export const rootReducer = combineReducers({
    [novelApi.reducerPath]: novelApi.reducer,

});