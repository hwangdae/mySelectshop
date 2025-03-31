import React, { FormEvent, useState } from "react";
import Send from "@/assets/Send.svg";
import ImageUpload from "@/assets/ImageUpload.svg";
import axios from "axios";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { postChat } from "@/lib/chat";
import useChatMutate from "@/hook/mutate/chat/useChat";

interface PropsType {
  receiverId: string;
  currentUserId: string;
}

const Input = ({ receiverId, currentUserId }: PropsType) => {
  const [message, setMessage] = useState<string>("");
  const { chatMutate } = useChatMutate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = "";
    const newChat = {
      text: message,
      image: imageUrl,
      receiverId: receiverId,
      senderId: currentUserId,
    };
    if (message || imageUrl) {
      try {
        chatMutate.mutate(newChat);
        setMessage("")
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <S.ChatForm onSubmit={handleSubmit}>
      <S.ChatInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="메세지를 입력해 주세요."
      />
      <S.ActionButtons>
        <div>
          <ImageUpload
            width={"24px"}
            height={"24px"}
            fill={`${styleColor.GRAY[400]}`}
          />
        </div>
        <S.SendButton>
          <Send width={"20px"} height={"20px"} fill={`${styleColor.WHITE}`} />
        </S.SendButton>
      </S.ActionButtons>
    </S.ChatForm>
  );
};

export default Input;

const S = {
  ChatForm: styled.form`
    position: relative;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: space-between;
    gap: 7px;
    width: 97%;
    padding: 8px 0px;
    padding-right: 7px;
    margin-bottom: 7px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 4px;
    outline: none;
    background-color: ${styleColor.WHITE};
  `,
  ChatInput: styled.input`
    width: 100%;
    text-indent: 6px;
    border: none;
    outline: none;
    &::placeholder {
      font-size: 14px;
      color: #d9dfeb;
    }
  `,
  ActionButtons: styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
  `,
  SendButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${styleColor.YELLOW.main};
    padding: 4px;
    border-radius: 4px;
  `,
};
