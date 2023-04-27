import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
// import { CookieStorage } from 'redux-persist-cookie-storage';
// import Cookies from 'cookies-js';
import { createLogger } from 'redux-logger';

import appReducer from './reducers/app';
import userReducer from './reducers/user';
import hospitalReducer from './reducers/hospital';
import headerReducer from './reducers/header';
import { api } from './query/baseApi';

// const cookedUserReducer = persistReducer(
//   {
//     key: 'blucap-user',
//     storage: new CookieStorage(Cookies),
//   },
//   userReducer,
// );

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  hospital: hospitalReducer,
  header: headerReducer,
  [api.reducerPath]: api.reducer,
});

const rootPersistedReducer = persistReducer(
  {
    key: 'blucap-cache',
    storage: localStorage,
    blacklist: ['app', api.reducerPath],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: rootPersistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(createLogger(), api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
