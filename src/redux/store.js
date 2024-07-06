import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./productReducer";
import userReducer from "./user";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['cart', 'user'], // Only persist the 'user' reducer
};
const rootReducer = combineReducers({ cart: cartReducer, product: productReducer, user: userReducer, order: orderReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);