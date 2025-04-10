import React, { FormEvent, useState } from "react";
import Send from "@/assets/Send.svg";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import useChatMutate from "@/hook/mutate/chat/useChat";
import { uploadImagesFn } from "@/utils/uploadImages";
import { TNewChat } from "@/types/chat";
import ImageUploader from "./ImageUploader";
import { styleFont } from "@/styles/styleFont";
import { formatFileSize } from "@/utils/formatFileSize";
import Trash from "@/assets/Trash.svg";
import X from "@/assets/X.svg";

interface PropsType {
  receiverId: string;
  currentUserId: string;
}

const Input = ({ receiverId, currentUserId }: PropsType) => {
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const { chatMutate } = useChatMutate();
  console.log(previewImages, "이미지프리뷰");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      }
    }
  };

  return (
    <>
      {previewImages.length > 0 && (
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.UploadImageTitle>파일 전송</S.UploadImageTitle>
            <S.UploadCancelButton onClick={() => setPreviewImages([])}>
              <X fill={`${styleColor.GRAY[400]}`} />
            </S.UploadCancelButton>
          </S.PreviewHeader>
          <S.PreviewList>
            {previewImages?.map((image, index) => (
              <S.PreviewItem key={index}>
                <S.PreviewInfo>
                  <S.PreviewImage
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                  />
                  <div>
                    <S.PreviewImageName>{image.name}</S.PreviewImageName>
                    <p>{formatFileSize(image.size)}</p>
                  </div>
                </S.PreviewInfo>
                <S.PreviewImageDeleteButton>
                  <Trash fill={`${styleColor.GRAY[200]}`} />
                </S.PreviewImageDeleteButton>
              </S.PreviewItem>
            ))}
          </S.PreviewList>
        </S.PreviewContainer>
      )}
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
          <S.ImageSendButtonContainer>보내기</S.ImageSendButtonContainer>
        )}
      </S.ChatForm>
    </>
  );
};

export default Input;

const S = {
  PreviewContainer: styled.div`
    background-color: ${styleColor.WHITE};
    padding: 20px;
  `,
  PreviewHeader: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  UploadImageTitle: styled.h1`
    ${styleFont.title.tit_md}
  `,
  UploadCancelButton: styled.button``,
  PreviewList: styled.ul``,
  PreviewItem: styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  `,
  PreviewInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  PreviewImage: styled.img`
    width: 50px;
    height: 50px;
  `,
  PreviewImageName: styled.h1``,
  PreviewImageDeleteButton: styled.button``,
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
  ImageSendButtonContainer : styled.button`
    width: 100%;
    padding: 10px 0px;
    background-color: ${styleColor.YELLOW.main};
    ${styleFont.text.txt_sm}
    color: ${styleColor.WHITE};
    font-weight: 500;
  `
};
