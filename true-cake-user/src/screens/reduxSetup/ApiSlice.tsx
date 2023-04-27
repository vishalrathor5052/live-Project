const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
const ApiSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchProducts.pending, (state: any, action: any) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state: any, action: any) => {
        state.status = STATUSES.ERROR;
      });
  },
});
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch(``);
  const data = await res.json();
  return data;
});
export const { setProducts, setStatus } = ApiSlice.actions;
export default ApiSlice.reducer;
