import React, { FormEvent, useState } from "react";
import Send from "@/assets/Send.svg";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import useChatMutate from "@/hook/mutate/chat/useChat";
import { uploadImagesFn } from "@/utils/uploadImages";
import { TNewChat } from "@/types/chat";
import ImageUploader from "./ImageUploader";
import { styleFont } from "@/styles/styleFont";
import UploadPreview from "./UploadPreview";
import CommonSpinner from "../ui/CommonSpinner";
import { Button } from "@mui/material";

interface PropsType {
  receiverId: string;
  currentUserId: string;
}

const Input = ({ receiverId, currentUserId }: PropsType) => {
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const { chatMutate } = useChatMutate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const imageUrl = image ? await uploadImagesFn(image) : null;

    const newChat: TNewChat = {
      text: message,
      image: imageUrl?.join(","),
      receiverId: receiverId,
      senderId: currentUserId,
    };
    if (message || imageUrl) {
      try {
        chatMutate.mutate(newChat);
        setMessage("");
        setImage([]);
        setPreviewImages([]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <UploadPreview
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
      />
      <S.ChatForm onSubmit={handleSubmit}>
        {previewImages.length <= 0 ? (
          <S.InputContainer>
            <S.ChatInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="메세지를 입력해 주세요."
            />
            <S.ActionButtons>
              <ImageUploader
                files={image}
                setFiles={setImage}
                previewImages={previewImages}
                setPreviewImages={setPreviewImages}
              />
              <S.SendButton>
                <Send
                  width={"20px"}
                  height={"20px"}
                  fill={`${styleColor.WHITE}`}
                />
              </S.SendButton>
            </S.ActionButtons>
          </S.InputContainer>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disableFocusRipple={true}
            fullWidth
          >
            보내기{isLoading && <CommonSpinner />}
          </Button>
        )}
      </S.ChatForm>
    </>
  );
};

export default Input;

const S = {
  ChatForm: styled.form``,
  InputContainer: styled.div`
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
  ImageSendButtonContainer: styled.button`
    cursor: pointer;
    width: 100%;
    padding: 10px 0px;
    background-color: ${styleColor.YELLOW.main};
    ${styleFont.text.txt_sm}
    color: ${styleColor.WHITE};
    font-weight: 500;
  `,
};
