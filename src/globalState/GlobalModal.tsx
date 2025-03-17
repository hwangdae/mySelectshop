"use client";
import { useModal } from "@/context/ModalContext";
import Modal from "@/ui/Modal";
import UpdateProfilePage from "@/app/updateProfile/page";
import RegisterPage from "@/app/auth/register/page";
import LoginPage from "@/app/auth/login/page";


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