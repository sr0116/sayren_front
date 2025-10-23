import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("session") // ✅ 브라우저에서는 sessionStorage
    : createNoopStorage();        // ✅ 서버에서는 noop

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  product: productReducer,
  modal: modalReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

// 전역 store & persistor (CSR + persist 전용)
export const store = makeStore();
export const persistor = persistStore(store);

// wrapper (SSR 전용)
export const wrapper = createWrapper(makeStore, { debug: false });
