import React, { FormEvent, useState } from "react";
import Send from "@/assets/Send.svg";
import ImageUpload from "@/assets/ImageUpload.svg";
import axios from "axios";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { postChat } from "@/lib/chat";
import useChatMutate from "@/hook/mutate/chat/useChat";
import { useSession } from "next-auth/react";
import { imageCompressionFn } from "@/utils/imageCompression";
import { previewImage } from "@/utils/previewImage";
import { uploadImage } from "@/utils/uploadImage";

interface PropsType {
  receiverId: string;
  currentUserId: string;
}

const Input = ({ receiverId, currentUserId }: PropsType) => {
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const { chatMutate } = useChatMutate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = image ? await uploadImage(image as File) : null;
    const newChat = {
      text: message,
      image: imageUrl,
      receiverId: receiverId,
      senderId: currentUserId,
    };
    if (message || imageUrl) {
      try {
        chatMutate.mutate(newChat);
        setMessage("");
        setImage(null)
        setImagePreview(null)
      } catch (error) {
        console.log(error);
      }
    }
  };
  const a = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadImageFile = e.target.files![0];
    const compressionFile = await imageCompressionFn(uploadImageFile, "small");
    if (compressionFile) {
      previewImage(compressionFile, setImagePreview);
      setImage(compressionFile);
    }
  };
  return (
    <S.ChatForm onSubmit={handleSubmit}>
      <img src={imagePreview ? `${imagePreview}` : undefined} alt="업로드 이미지"/>
      <S.ChatInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="메세지를 입력해 주세요."
      />
      <S.ActionButtons>
        <div>
          <S.Label htmlFor="imageMessage">
            <ImageUpload
              width={"24px"}
              height={"24px"}
              fill={`${styleColor.GRAY[400]}`}
            />
          </S.Label>
          <S.Input
            id="imageMessage"
            type="file"
            accept="image/*, .jpg, .jpeg, .png"
            onChange={a}
          />
        </div>
        {/* <ImageUpload
          previewProfileImage={imagePreview}
          setPreviewProfileImage={setImagePreview}
          setValue={setImage}
        /> */}
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
  Label: styled.label``,
  Input: styled.input`
    display: none;
  `,
  SendButton: styled.button`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${styleColor.YELLOW.main};
    padding: 4px;
    border-radius: 4px;
  `,
};
