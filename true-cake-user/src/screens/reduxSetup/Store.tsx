import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import addToCart from "./CartSlice";
import thunk from "redux-thunk";
import productInfo from "./ProductInfoSlice";
import userDetails from "./UserDetailsSlice";
import apiResponse from "./ApiResponseSlice";

const reducers: any = combineReducers({
  addToCart: addToCart,
  productInfo: productInfo,
  userDetails: userDetails,
  apiResponse: apiResponse,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;