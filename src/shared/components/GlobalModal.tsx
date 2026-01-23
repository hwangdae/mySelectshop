"use client";
import { useModal } from "@/context/ModalContext";
import Modal from "@/ui/Modal";
import RegisterPage from "@/app/auth/register/page";
import LoginPage from "@/app/auth/login/page";
import UpdateProfilePage from "@/app/auth/profile/page";
import ChatPage from "@/app/chat/page";
import Follow from "@/features/follow/components/Follow";


export default function GlobalModal() {
  const { modal, closeModal } = useModal();

  return (
    <Modal isOpen={!!modal.type} onClose={closeModal}>
      {modal.type === "login" && <LoginPage />}
      {modal.type === "signup" && <RegisterPage />}
      {modal.type === "profile" && <UpdateProfilePage />}
      {modal.type === "chat" && <ChatPage />}
      {modal.type === "follow" && modal.params && (
        <Follow followTypeParams={modal.params.followType} />
      )}
    </Modal>
  );
}
