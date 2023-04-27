import { configureStore ,combineReducers} from '@reduxjs/toolkit';
import CartSlice from './CartSlice';
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";

const persistConfig = {
    key: "root",
    storage: storage,
    // blacklist: ["tourListSlice"],
};

export const rootReducers = combineReducers({
    trueCake: CartSlice
});
// const persistedReducer = persistReducer(persistConfig, rootReducers);
const Store: any = configureStore({
    reducer: {trueCake: CartSlice}
})

export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default Store;