import { number } from "yup/lib/locale";
import ApiComponents from "../constant/ApiComponents";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const CartSlice = createSlice({
  name: "trueCake",
  initialState: {
    loader: false,
    userData: {},
    editCategoryData: {},
    productData: {},
    token: {},
    header: {},
    Analytics: {},
    labelName: "",
    dateOption: {},
    isPopup: {},
    addCategory: "",
    rowPerPage: {},
    page: {},
    closePopup: "",
    resetHeader: false,
    crossClose: "",
    adminProfile: {
      data: [],
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
    otp: {},
    resetPassword: {},
  },

  reducers: {
    setLoader: (state: any, action: any) => {
      state.laoder = action.payload;
    },
    setResetPassword: (state: any, action: any) => {
      state.resetPassword = action.payload;
    },
    setOtp: (state: any, action: any) => {
      state.otp = action.payload;
    },
    add: (state: any, action: any) => {
      state.userData = action.payload;
    },
    setToken: (state: any, action: any) => {
      state.token = action.payload;
    },
    setHeaders: (state: any, action: any) => {
      state = { ...state, header: action.payload };
      return state;
    },
    Analytics: (state: any, action: any) => {
      state.Analytics = action.payload;
    },
    setLabelName: (state: any, action: any) => {
      state.labelName = action.payload;
    },
    DateOption: (state: any, action: any) => {
      state.dateOption = action.payload;
    },
    PopupOpenClose: (state: any, action: any) => {
      state.isPopup = { ...state.isPopup, ...action.payload };
    },
    ProfileData: (state: any, action: any) => {
      state.profileData = action.payload;
    },
    AddCategory: (state: any, action: any) => {
      state.addCategory = action.payload;
      // return { ...state, addCategory: action.payload }
    },
    RowPerPage: (state: any, action: any) => {
      state.rowPerPage = action?.payload;
    },
    Page: (state: any, action: any) => {
      state.page = action?.payload;
    },
    ClosePopup: (state: any, action: any) => {
      state.closePopup = action.payload;
    },
    isHeader: (state: any, action: any) => {
      state.resetHeader = action.payload;
    },
    CrossClose: (state: any, action: any) => {
      state.crossClose = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminProfile.pending, (state) => {
        state.adminProfile.isLoading = true;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.adminProfile.isLoading = false;
        state.adminProfile.isSuccess = true;
        state.adminProfile.data = action.payload?.data;
      })
      .addCase(getAdminProfile.rejected, (state) => {
        state.adminProfile.isLoading = false;
        state.adminProfile.isError = true;
      });
  },
});
export const getAdminProfile = createAsyncThunk(
  "getAdmin",
  async (_, { dispatch }) => {
    return await ApiComponents.GetAdmin();
  }
);
export const {
  setLoader,
  add,
  setToken,
  setHeaders,
  Analytics,
  setLabelName,
  DateOption,
  PopupOpenClose,
  ProfileData,
  AddCategory,
  RowPerPage,
  Page,
  ClosePopup,
  // ProfileDropdown,
  isHeader,
  CrossClose,
  setResetPassword,
  setOtp,
} = CartSlice.actions;
export default CartSlice.reducer;
