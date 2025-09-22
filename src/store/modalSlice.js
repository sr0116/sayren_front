import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: null, // 실제 모달에 보여줄 JSX 컴포넌트
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // 모달 열기 → payload는 항상 { content } 객체
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload.content; // content 전달
    },
    // 모달 닫기
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
