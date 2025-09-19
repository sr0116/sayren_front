// store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

// 루트 리듀서 구성
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer, //
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"], // auth slice만 저장
};

const authPersistConfig = {
  key: "auth",
  storage: storageSession,
  whitelist: ["isAuthenticated"], // isAuthenticated만 세션에 저장
};

// persistReducer 적용
const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
      auth: persistReducer(authPersistConfig, authReducer),
      product: productReducer,
    })
);

export const makeStore = () =>
    configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false,
          }),
    });

// persistor
export const persistor = persistStore(makeStore());
