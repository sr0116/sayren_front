// store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

// auth slice만 persist
const authPersistConfig = {
  key: "auth",
  storage: storageSession,
  whitelist: ["isAuthenticated"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  product: productReducer,
});

// wrapper에서 쓸 store 생성 함수
export const makeStore = () =>
    configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false, //
          }),
    });

// 전역 store & persistor (CSR + persist 전용)
export const store = makeStore();
export const persistor = persistStore(store);

// wrapper (SSR 전용)
export const wrapper = createWrapper(makeStore, { debug: false });
