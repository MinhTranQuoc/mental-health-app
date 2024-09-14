import { combineReducers } from "@reduxjs/toolkit";
import dataUserReducer from "../components/Register/slice/dataUserSlice";
import { loginApi } from "services/loginApi";
import { ShoppingCartSlice } from "components/MainShoppingCart/CenterMainSlice";
import { cartProductsApi } from "services/cartProductsApi";
import { productsApi } from "services/productsApi";
import { bannersApi, categoriesApi } from "services/homepageApi";
import counterSlice from "components/DetailProduct/slice/counterSlice";
import productSlice from "components/DetailProduct/slice/productSlice";
import orderSlice from "components/Order/slice/orderSlice";
import { orderApi } from "services/orderApi";
import { addressApi } from "services/addressApi";
import { addressGeoApi } from "services/addressGeoApi";
import productByCategorySlice from "components/ProductsCategory/slice/productByCategorySlice";

export const rootReducer = combineReducers({
	user: dataUserReducer,
	[loginApi.reducerPath]: loginApi.reducer,
	[categoriesApi.reducerPath]: categoriesApi.reducer,
	[bannersApi.reducerPath]: bannersApi.reducer,
	cartList: ShoppingCartSlice.reducer,
	[cartProductsApi.reducerPath]: cartProductsApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	counter: counterSlice,
	product: productSlice,
	order: orderSlice,
	[orderApi.reducerPath]: orderApi.reducer,
	[addressApi.reducerPath]: addressApi.reducer,
	[addressGeoApi.reducerPath]: addressGeoApi.reducer,
	productByCategory: productByCategorySlice,
});