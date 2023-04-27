import storage from "redux-persist/lib/storage";

const { createSlice } = require("@reduxjs/toolkit");

const userDetailSlice = createSlice({
  name: "userDetails",
  initialState: {
    userDetail: {},
    selectedMenu:{home:true},
    selectedMobileCat: {}
  },

  reducers: {
    addUserDetails: (state: any, action: any) => {
      state.userDetail = { ...state?.userDetail, ...action?.payload };
    },

    resetUserDetailsState: (state: any, action: any) => {
      storage.removeItem("persist:root");
      state.userDetail = {};
      // addUserDetails({}, action);
    },

    selectMenuTab:(state: any, action:any)=>{
      state.selectedMenu = action.payload;
    },

    selectMobileCat : (state: any, action:any) => {
      state.selectedMobileCat = action.payload;
    },

     //create a state to reset all states after logout
     resetUserDetails: (state: any, action: any) => {
      storage.removeItem("persist:root");
      state.userDetail= {};
      state.selectedMenu={home:true};
    }
  },
});
export const { addUserDetails, resetUserDetailsState, selectMenuTab, selectMobileCat } =
  userDetailSlice.actions;
export default userDetailSlice.reducer;
