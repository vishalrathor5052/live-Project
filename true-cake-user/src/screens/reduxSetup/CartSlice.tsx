import storage from "redux-persist/lib/storage";

const { createSlice, current } = require("@reduxjs/toolkit");

const CartSlice = createSlice({
  name: "addToCart",
  initialState: {
    cartId: Number,
    deliveryDate: {},
    products: [],
    addons: [],
    options: [],
    addToCartData: {},
    cartDataQuantity: [],
    steppersState: 1,
    cartOfferMessage: "",
    addonPage: 0,
    selectAddressData: 0,
    selectDefultAddress: 0,
  },

  reducers: {
    //create a state to store deliveryDate and deliveryTime of shipping
    addAddToCartData: (state: any, action: any) => {
      state.addToCartData = action?.payload;
    },
    selectAddress: (state: any, action: any) => {
      state.selectAddressData = action?.payload;
    },
    defultAddress: (state: any, action: any) => {
      state.selectDefultAddress = action?.payload;
    },
    //create a state to store deliveryDate and deliveryTime of shipping
    addDeliveryDate: (state: any, action: any) => {
      console.log(
        "in addDeliveryDate redux",
        action.payload,
        state.deliveryDate
      );
      state.deliveryDate = { ...state?.deliveryDate, ...action?.payload };
      console.log(
        "in addDeliveryDate redux after",
        action.payload,
        state.deliveryDate
      );
    },

    addCartDataQuantity: (state: any, action: any) => {
      state.cartDataQuantity = action?.payload;
    },

    addStepperSatate: (state: any, action: any) => {
      state.steppersState = action?.payload;
    },

    //create a state to store products
    addProduct: (state: any, action: any) => {
      console.log("action.payload in addProduct", action.payload);
      let itemInProduct = JSON.parse(JSON.stringify(state))?.products?.find(
        (item: any) =>
          JSON.parse(JSON.stringify(item)).id === action?.payload?.data?.id ||
          JSON.parse(JSON.stringify(item)).id ===
            action?.payload?.data?.productId
      );
      console.log("itemInProduct in addProduct", itemInProduct);

      if (itemInProduct) {
        console.log(
          "in if itemInProduct",
          JSON.parse(JSON.stringify(itemInProduct))
        );
        if (
          action.payload.isRemoeve === true ??
          itemInProduct.productQuantity === 0
        ) {
          let data = state?.products?.filter(
            (item: any) =>
              JSON.parse(JSON.stringify(item)).id !== itemInProduct.id
          );
          state.products = [...data];
          console.log(
            "state in addProduct",
            JSON.parse(JSON.stringify(state))?.products
          );
        }

        if (action.payload?.increment === true) {
          itemInProduct.productQuantity = itemInProduct.productQuantity + 1;
          console.log(
            "in if itemInProduct.productQuantity",
            itemInProduct.productQuantity
          );
        } else {
          itemInProduct.productQuantity = itemInProduct.productQuantity - 1;
          console.log(
            "in else itemInProduct.productQuantity",
            itemInProduct.productQuantity
          );
        }
      } else {
        state.products = [
          ...state.products,
          { ...action.payload?.data, productQuantity: 1 },
        ];
        console.log(
          "in else state",
          JSON.parse(JSON.stringify(state))?.products
        );
      }
      console.log("after else ", JSON.parse(JSON.stringify(state))?.products);
    },

    //create a state to store addons
    addAddon: (state: any, action: any) => {
      let itemInAddon = state?.addons?.find(
        (item: any) =>
          JSON.parse(JSON.stringify(item)).id === action?.payload?.data?.id ||
          JSON.parse(JSON.stringify(item)).id ===
            action?.payload?.data?.productId
      );
      // let itemInAddon = state?.addons?.find(
      //   (item: any) => item.id === action.payload.data.id ?? action.payload.data?.productId
      // );
      if (action.payload.isRemoeve === true) {
        let data = state?.addons?.filter(
          (item: any) => JSON.parse(JSON.stringify(item)).id !== itemInAddon.id
        );
        state.addons = [...data];
      }
      if (itemInAddon) {
        if (action.payload.increment === true) {
          itemInAddon.productQuantity++;
        } else {
          itemInAddon.productQuantity--;
        }
        if (itemInAddon.productQuantity === 0) {
          let data = state?.addons?.filter(
            (item: any) =>
              JSON.parse(JSON.stringify(item)).id !== itemInAddon.id
          );
          // let data = state?.addons?.filter(
          //   (item: any) => item.id != action.payload.data.id
          // );
          state.addons = [...data];
        }
      } else {
        state.addons = [
          ...state.addons,
          { ...action.payload?.data, productQuantity: 1 },
        ];
      }
    },

    //create a state to store options
    addOption: (state: any, action: any) => {
      console.log(
        "action payload 148: ",
        action.payload,
        current(state?.options)
      );
      let itemInOptions = state?.options?.find(
        (item: any) =>
          JSON.parse(JSON.stringify(item)).id === action?.payload?.data?.id ||
          JSON.parse(JSON.stringify(item)).id ===
            action?.payload?.data?.optionId
      );
      if (action.payload.isRemoeve === true) {
        let data = state?.options?.filter(
          (item: any) =>
            JSON.parse(JSON.stringify(item)).id !== itemInOptions.id
        );
        state.options = [...data];
      }
      console.log("itemInOptions 138 cart slice: ", itemInOptions);
      if (itemInOptions) {
        if (action?.payload?.increment === true) {
          itemInOptions.productQuantity = itemInOptions?.productQuantity + 1;
        } else {
          itemInOptions.productQuantity = itemInOptions?.productQuantity - 1;
          if (
            itemInOptions?.productQuantity === 0 ??
            itemInOptions.isRemoeve === true
          ) {
            let data = state?.options?.filter(
              (item: any) =>
                JSON.parse(JSON.stringify(item)).id !== itemInOptions.id
            );
            state.options = [...data];
          }
        }
      } else {
        state?.options?.push({ ...action.payload.data, productQuantity: 1 });
      }
    },

    //create a state to store cartId of a user
    addCartId: (state: any, action: any) => {
      state.cartId = action?.payload;
    },

    setAddonPage: (state: any, action: any) => {
      console.log("setAddonPage in slice", action.payload);
      state.addonPage = action?.payload;
    },

    //create a state to reset all states after logout
    resetCartState: (state: any, action: any) => {
      console.log("Hello i'm in resetCartState");
      storage.removeItem("persist:root");
      state.products = [];
      state.addons = [];
      state.options = [];
      state.deliveryDate = {};
      state.cartId = "";
      state.cartDataQuantity = [];
      state.addToCartData = {};
      state.steppersState = 1;
      state.cartOfferMessage = "";
      console.log("Hello i'm in resetCartState", state.products, state.addons);
    },

    resetOptions: (state: any, action: any) => {
      state.options = [];
      const currentState = { ...current(state) };
      const { payload = {} } = action;
      const filteredOptionDataFromCart =
        currentState.addToCartData?.cartDetails?.find(
          (elm: any) => elm.productId === payload.id
        );
      console.log("filteredOptionDataFromCart: ", filteredOptionDataFromCart);
      let {
        productDetails: { optionItemDetails = [] },
      } = filteredOptionDataFromCart;
      console.log("optionItemDetails legnth: ", optionItemDetails);

      const options = optionItemDetails.map((elm: any) => ({
        ...elm,
        id: elm.optionId,
        productQuantity: elm.optionQuantity,
        price: elm.optionPrice,
      }));
      console.log("optionItemDetails length updated: ", options);

      state.options = [...options];
    },

    //create a state to reset all data from cart
    resetCartData: (state: any, action: any) => {
      storage.removeItem("persist:root");
      state.products = [];
      state.addons = [];
      state.options = [];
      state.addToCartData = {};
    },

    setCartOfferMessage: (state: any, action: any) => {
      console.log(
        "setCartOfferMessage ------ ",
        action.payload,
        state.cartOfferMessage
      );
      state.cartOfferMessage = action.payload;
    },
  },

  //create a state to increase quantity of product
  incrementQuantity: (state: any, action: any) => {
    const item = state?.cart?.find((item: any) => item?.id === action?.payload);
    item.quantity++;
  },

  //create a state to decrease quantity of product
  decrementQuantity: (state: any, action: any) => {
    const item = state?.cart?.find((item: any) => item?.id === action?.payload);
    if (item.quantity === 1) {
      item.quantity = 1;
    } else {
      item.quantity--;
    }
  },

  //create a state to remove  items in cart
  removeItem: (state: any, action: any) => {
    const removeItem = state?.cart?.filter(
      (item: any) => item.id !== action.payload
    );
    state.cart = removeItem;
  },

  // addcounter: (state: unknown, action: unknown) => {
  // },
});

export const {
  addprod,
  addaddr,
  resetOptions,
  // addcounter,
  remove,
  addProduct,
  addAddon,
  addOption,
  addCartId,
  addStepperSatate,
  addCartDataQuantity,
  addDeliveryDate,
  removeItem,
  addCartSliceData,
  addAddToCartData,
  incrementQuantity,
  decrementQuantity,
  resetCartState,
  resetCartData,
  setCartOfferMessage,
  setAddonPage,
  selectAddress,
  defultAddress,
} = CartSlice.actions;
export default CartSlice.reducer;
