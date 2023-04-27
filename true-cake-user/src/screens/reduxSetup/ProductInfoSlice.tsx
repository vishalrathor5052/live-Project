import { stat } from "fs";
import storage from "redux-persist/es/storage";

const { createSlice } = require("@reduxjs/toolkit");
const ProductInfoSlice = createSlice({
  name: "productInfo",
  initialState: {
    itemsCount: {},
    totalItemsCount: [],
    productAmount: 0,
    productOptionAmount: 0,
  },

  reducers: {
    addProductInfo: (state: any, action: any) => {
      state.itemsCount = action.payload
    },
    setTotalCount: (state: any, action: any) => {
      state.totalItemsCount = { ...state.totalItemsCount, [action.payload]: state.itemsCount }
      state.itemsCount = {};
    },
    setProductAmount: (state: any, action: any) => {
      state.productAmount = action.payload;
    },
    setProductOptionAmount: (state: any, action: any) => {
      state.productOptionAmount = action.payload;
    },

    //create a state to reset all states after logout
    resetProduct: (state: any, action: any) => {
      storage.removeItem("persist:root");
      state.itemsCount= {};
      state.totalItemsCount= [];
      state.productAmount= 0;
      state.productOptionAmount= 0;
    }
  }
  
});

export const {
  addProductInfo,
  setTotalCount,
  setProductAmount,
  setProductOptionAmount,
  resetProduct
} = ProductInfoSlice.actions;

export default ProductInfoSlice.reducer;