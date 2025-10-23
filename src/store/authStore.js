import { makeStore } from "./store";
import { login, logout } from "./authSlice";

// auth 전용 store 인스턴스
const authStore = makeStore();

export const authActions = {
  login: (data) => authStore.dispatch(login(data)),
  logout: () => authStore.dispatch(logout()),
  getState: () => authStore.getState().auth,
};

export default authStore;
