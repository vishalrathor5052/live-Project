const { createSlice } = require("@reduxjs/toolkit");

const CounterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 1,
  },
  reducers: {
    increment: (state: any) => {
      state.count += 1;
    },
    decrement: (state: any) => {
      state.count -= 1;
    },
    incrementByAmount: (state: any, action: any) => {
      state.count += action.payload;
    },
    decrementByAmount: (state: any, action: any) => {
      state.count -= action.payload;
    },
  },
});
export const { increment, decrement } = CounterSlice.actions;
export default CounterSlice.reducer;
