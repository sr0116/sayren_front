"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import PasswordCheckForm from "@/components/member/PasswordCheckForm";

export default function PwCheck({ onSuccess, children }) {
  const dispatch = useDispatch();

  const handleOpen = (e) => {
    e.preventDefault();
    dispatch(
        openModal({
          content: (
              <div className="p-6 bg-white rounded-lg w-full">
                <h2 className="text-lg font-semibold mb-4">비밀번호 확인</h2>
                <PasswordCheckForm
                    onSuccess={() => {
                      dispatch(closeModal());
                      if (onSuccess) onSuccess();
                    }}
                />
              </div>
          ),
        })
    );
  };

  return React.cloneElement(children, { onClick: handleOpen });
}
