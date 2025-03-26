"use client";
import { useModal } from "@/context/ModalContext";
import Modal from "@/ui/Modal";
import RegisterPage from "@/app/auth/register/page";
import LoginPage from "@/app/auth/login/page";
import UpdateProfilePage from "@/app/auth/profile/page";
import ChatPage from "@/app/chat/page";


export default function GlobalModal() {
  const { modalType, closeModal } = useModal();

  return (
    <Modal isOpen={!!modalType} onClose={closeModal}>
      {modalType === "login" && <LoginPage />}
      {modalType === "signup" && <RegisterPage />}
      {modalType === "profile" && <UpdateProfilePage />}
      {modalType === "chat" && <ChatPage/>}
    </Modal>
  );
}