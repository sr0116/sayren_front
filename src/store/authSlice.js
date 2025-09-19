import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      try {
        const decoded = jwtDecode(action.payload.accessToken);
        const { sub: email, name, roles, status, emailVerified } = decoded;

        state.isAuthenticated = true;
        state.user = { email, name, roles, status, emailVerified };
        state.accessToken = action.payload.accessToken;
      } catch (e) {
        console.error("토큰 파싱 실패:", e);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
