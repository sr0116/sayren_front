"use client";
import Modal from "@/components/test_components/Modal";
import StatusTestPage from "@/components/test_components/StasusTestPage";
import TestEmpty from "@/components/test_components/TestEmpty";
import TestToast from "@/components/test_components/TestToast";

export default function Page() {

  return (
    <>
      <Modal />
      <StatusTestPage />
      <TestEmpty />
      <TestToast />
      {/*<TestSpinner />*/}
      {/*<TestLaunch />*/}

    </>
  );

}
