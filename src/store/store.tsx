import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { loginApi } from "services/loginApi";
import { bannersApi, categoriesApi } from "services/homepageApi";
import { cartProductsApi } from "services/cartProductsApi";
import { productsApi } from "services/productsApi";
import { orderApi } from "services/orderApi";
import { addressApi } from "services/addressApi";
import { addressGeoApi } from "services/addressGeoApi";

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(loginApi.middleware)
			.concat(categoriesApi.middleware)
			.concat(bannersApi.middleware)
			.concat(cartProductsApi.middleware)
			.concat(productsApi.middleware)
			.concat(orderApi.middleware)
			.concat(addressApi.middleware)
			.concat(addressGeoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;