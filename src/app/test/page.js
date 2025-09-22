"use client";
import { useDispatch } from "react-redux";
import {openModal} from "@/store/modalSlice";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Modal from "@/components/test_components/Modal";
import StatusTestPage from "@/components/test_components/StasusTestPage";
import EmptyState from "@/components/common/EmptyState";
import TestEmpty from "@/components/test_components/TestEmpty";
import TestToast from "@/components/test_components/TestToast";

export default function Page() {

  return (
    <>
      <Modal />
      <StatusTestPage />
      <TestEmpty />
      <TestToast />

    </>
  );

}
