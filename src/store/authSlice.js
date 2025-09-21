import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const member = action.payload.data;

      state.isAuthenticated = true;
      state.user = {
        id: member.id,
        name: member.name,
        roles: member.roles,
        status: member.status,
        emailVerified: member.emailVerified,
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
