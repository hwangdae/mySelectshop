import { useModal } from "@/context/ModalContext";
import { receiverStore } from "@/globalState";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { TUser } from "@/types";
import React from "react";
import styled from "styled-components";

interface ChatUserType {
  id: string;
  name: string;
  image: string | null;
}

interface PropsType {
  user: ChatUserType;
  type?: string;
}

const ChatButton = ({ user, type = "allReview" }: PropsType) => {
  const { setReceiver } = receiverStore();
  const { openModal } = useModal();

  return (
    <S.Messagebutton
      $type={type}
      onClick={() => {
        setReceiver({
          receiverId: user?.id,
          receiverName: user?.name,
          receiverImage: user?.image || "",
        });
        openModal({ type: "chat" });
      }}
    >
      메세지
    </S.Messagebutton>
  );
};

export default ChatButton;

const S = {
  Messagebutton: styled.button<{ $type: string }>`
    cursor: pointer;
    width: 40%;
    ${styleFont.text.txt_xs}
    font-weight: 500;
    letter-spacing: -1px;
    color: ${(props) =>
      props.$type === "allReview" || "follow" ? "#111" : "#fff"};
    padding: 7px 8px;
    box-shadow: ${(props) =>
      props.$type === "allReview" || "follow"
        ? `0 0 0 1px ${styleColor.BLACK[0]} inset`
        : `0 0 0 1px ${styleColor.WHITE} inset`};
    border-radius: 4px;
  `,
};
