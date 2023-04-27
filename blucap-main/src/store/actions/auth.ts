import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api, LoginAgainstQrTokenMutation } from 'src/generated/graphql';

export const signInAgainstQrToken = createAsyncThunk<
  LoginAgainstQrTokenMutation['loginAgainstQrToken'],
  string
>('auth/signInAgainstQrToken', async (token, { dispatch }) => {
  const result = await dispatch(
    api.endpoints.LoginAgainstQrToken.initiate({ token: token }),
  ).unwrap();

  return result.loginAgainstQrToken;
});

export const logoutUser = createAction('user/logoutUser');
