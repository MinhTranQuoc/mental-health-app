import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { novelApi } from "../service/api/novelApi";
import { authApi } from "../service/api/loginApi";


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(novelApi.middleware)
			.concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;