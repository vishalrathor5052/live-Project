import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const baseQuery: BaseQueryFn<
  {
    document: string | Document;
    variables?: Record<string, unknown> | void;
  },
  unknown,
  Pick<Error, 'name' | 'message' | 'stack'>
> = async (args, api, _extraOptions) => {
  const cancelTokenSource = axios.CancelToken.source();
  const response = axios.post(
    `${import.meta.env.VITE_APP_SERVER_URL}/graphql`,
    {
      query: args.document,
      variables: args.variables,
    },
    { cancelToken: cancelTokenSource.token, withCredentials: true },
  );
  const listener = () => cancelTokenSource.cancel();

  api.signal.addEventListener('abort', listener);
  return await response.then(res => {
    api.signal.removeEventListener('abort', listener);
    return res.data;
  });
};

export const api = createApi({
  reducerPath: 'graphqlApi',
  baseQuery,
  endpoints: () => ({}),
});
