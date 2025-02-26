"use client";

import LoginPage from "@/app/auth/login/page";
import RegisterPage from "@/app/auth/register/page";
import { useModal } from "@/app/context/ModalContext";
import Modal from "@/app/ui/Modal";
import UpdateProfilePage from "@/app/updateProfile/page";


export default function GlobalModal() {
  const { modalType, closeModal } = useModal();

  return (
    <Modal isOpen={!!modalType} onClose={closeModal}>
      {modalType === "login" && <LoginPage />}
      {modalType === "signup" && <RegisterPage />}
      {modalType === "profile" && <UpdateProfilePage />}
    </Modal>
  );
}