import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/cartReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export const configureStores = () => {
  return { persistor, store };
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
