"use client";
import { useModal } from "@/context/ModalContext";
import { Button } from "@mui/material";
import styled from "styled-components";

interface AlertModalProps {
  message: string;
  onConfirm?: () => void;
}

export default function AlertModal({ message, onConfirm }: AlertModalProps) {
  const { closeModal } = useModal();

  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  };

  return (
    <S.AlertContainer>
      <S.AlertInner>
        <p style={{ marginBottom: 30, whiteSpace: "pre-line", lineHeight : "20px" }}>{message}</p>
        <S.ButtonContainer>
          <Button fullWidth onClick={handleConfirm}>확인</Button>
        </S.ButtonContainer>
      </S.AlertInner>
    </S.AlertContainer>
  );
}

const S = {
  AlertContainer: styled.div``,
  AlertInner: styled.div`
    padding: 30px 30px 20px 30px;
  `,
  ButtonContainer: styled.div`
    width: 100%;
    /* display: flex;
    justify-content: flex-end; */
  `,
};
