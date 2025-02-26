import LoginPage from "@/app/auth/login/page";
import Modal from "@/app/ui/Modal";
import React from "react";

const page = () => {
  return (
    <Modal>
      <LoginPage />
    </Modal>
  );
};

export default page;
