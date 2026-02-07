import { createContext, useContext, useState } from "react";

type ModalPayload =
  | { type: "login" }
  | { type: "signup" }
  | { type: "profile" }
  | { type: "chat" }
  | { type: "follow"; params: { followType: "follower" | "following" } }
  | {
      type: "alert";
      params: {
        message: string;
        onConfirm?: () => void;
      };
    }
  | { type: null };

interface ModalContextProps {
  modal: ModalPayload;
  openModal: (modal: ModalPayload) => void;
  closeModal: () => void;
}

const defaultContextValue: ModalContextProps = {
  modal: { type: null },
  openModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext<ModalContextProps>(defaultContextValue);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalPayload>({ type: null });

  const openModal = (modal: ModalPayload) => setModal(modal);
  const closeModal = () => setModal({ type: null });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};
