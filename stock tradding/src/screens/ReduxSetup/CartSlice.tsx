const { createSlice } = require("@reduxjs/toolkit");
const CartSlice = createSlice({
  name: "stock",
  authTokenValue: "",
  initialState: [],
  role: 0,
  emailUser: "",
  password: {},
  panNumber: {},
  bankAccountNumber: {},
  userData: [],
  companiesData: [],
  orderBookData: [],

  reducers: {
    add: (state: any, action: any) => {
      return { ...state, userData: action.payload };
    },
    signUp: (state: any, action: any) => {
      return { ...state, initialState: action.payload };
    },
    darkLightMode: (state: any, action: any) => {
      state.push(action.payload);
    },
    roles: (state: any, action: any) => {
      return { ...state, role: action.payload };
    },
    email: (state: any, action: any) => {
      return { ...state, emailUser: action.payload };
    },
    password: (state: any, action: any) => {
      return { ...state, password: action.payload };
    },
    panCardNumber: (state: any, action: any) => {
      return { ...state, panNumber: action.payload };
    },
    bankAccountNumber: (state: any, action: any) => {
      return { ...state, bankAccountNumber: action.payload };
    },
    companydata: (state: any, action: any) => {
      return { ...state, companiesData: action.payload };
    },
    orderBookData: (state: any, action: any) => {
      return { ...state, orderBookData: action.payload };
    },
    authTokenValue: (state: any, action: any) => {
      return { ...state, authTokenValue: action.payload };
    },
  },
});

export const {
  orderBookData,
  add,
  darkLightMode,
  roles,
  signUp,
  email,
  password,
  panCardNumber,
  bankAccountNumber,
  companydata,
  authTokenValue,
} = CartSlice.actions;
export default CartSlice.reducer;
