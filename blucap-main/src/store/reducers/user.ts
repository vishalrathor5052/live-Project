import { createSlice } from '@reduxjs/toolkit';
import { LoginAgainstQrTokenMutation } from 'src/generated/graphql';
import { logoutUser, signInAgainstQrToken } from '../actions/auth';

const initialState: {
  currentUser: LoginAgainstQrTokenMutation['loginAgainstQrToken'] | null;
  userLoginMetaData: {
    email?: string | null;
    phone?: string | null;
    verificationId?: string | null;
  };
  skipPhone: boolean;
} = {
  currentUser: null,
  userLoginMetaData: {
    email: null,
    phone: null,
    verificationId: null,
  },
  skipPhone: false,
};

export const user = createSlice({
  name: 'User',
  initialState: initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(signInAgainstQrToken.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(logoutUser, state => {
        state.currentUser = null;
      }),
});

export default user.reducer;
