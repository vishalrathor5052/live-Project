const {createSlice} = require("@reduxjs/toolkit");
const ApiResponseSlice = createSlice({
    name:"apiResponse",
    initialState: {
        categoryList:[],
    },

    reducers:{
        addCategoryList: (state:any, action:any)=>{
            state.categoryList = action.payload
        }
    }
});

export const {addCategoryList} = ApiResponseSlice.actions;

export default ApiResponseSlice.reducer;