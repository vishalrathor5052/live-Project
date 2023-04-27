import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getHospitalDetails, updateHospitalDetails } from '../actions/hospital';

const initialState: {
  name: string;
} = {
  name: '',
};

export const user = createSlice({
  name: 'Hospital',
  initialState: initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addMatcher(
      isAnyOf(getHospitalDetails.fulfilled, updateHospitalDetails),
      (state, action) => {
        if (action?.payload?.name) state.name = action.payload.name;
      },
    ),
});

export default user.reducer;
