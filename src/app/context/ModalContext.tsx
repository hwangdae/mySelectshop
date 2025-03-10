import { createContext, useContext, useState } from "react";

type ModalType = "login" | "signup" | "profile" | null;

interface ModalContextProps {
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const defaultContextValue: ModalContextProps = {
  modalType: null,
  openModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext<ModalContextProps>(defaultContextValue);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};
