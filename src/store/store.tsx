import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			// .concat(loginApi.middleware)
			// .concat(categoriesApi.middleware)
			// .concat(bannersApi.middleware)
			// .concat(cartProductsApi.middleware)
			// .concat(productsApi.middleware)
			// .concat(orderApi.middleware)
			// .concat(addressApi.middleware)
			// .concat(addressGeoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;