import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";

const Store: any = configureStore({
  reducer: {
    stock: CartSlice,
  },
});

export default Store;
