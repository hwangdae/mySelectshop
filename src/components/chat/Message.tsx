import React from "react";
import ProfileImage from "../ui/ProfileImage";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";

interface PropsType {
  receiverName: string;
  receiverImage: string;
  messageImage: string | null;
  messageText: string | null;
  isSender: boolean;
}

const Message = ({
  receiverName,
  receiverImage,
  messageImage,
  messageText,
  isSender,
}: PropsType) => {
  return (
    <S.ReceiverUser $isSender={isSender}>
      <div style={{ display: `${isSender && "none"}` }}>
        <ProfileImage src={receiverImage} width={"44px"} height={"44px"} />
      </div>
      <div>
        <S.ReceiverName $isSender={isSender}>{receiverName}</S.ReceiverName>
        <S.ImageList $isSender={isSender}>
          {messageImage !== "" &&
            messageImage?.split(",").map((image, index) => {
              return (
                <S.ImageItem
                  $imageCount={messageImage?.split(",").length}
                  key={image}
                >
                  <S.Image src={image} alt="업로드 이미지" />
                </S.ImageItem>
              );
            })}
        </S.ImageList>
        {messageText?.trim() && (
          <S.Message $isSender={isSender}>{messageText}</S.Message>
        )}
      </div>
    </S.ReceiverUser>
  );
};

export default Message;

const S = {
  ReceiverUser: styled.div<{ $isSender: boolean }>`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin: 0 auto;
    justify-content: ${(props) =>
      props.$isSender ? "flex-end" : "flex-start"};
    margin-bottom: 10px;
  `,
  ReceiverName: styled.h3<{ $isSender: boolean }>`
    display: ${(props) => props.$isSender && "none"};
    margin-bottom: 4px;
  `,
  ImageList: styled.ul<{ $isSender: boolean }>`
    width: 100%;
    max-width: 260px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: ${(props) =>
      props.$isSender ? "flex-end" : "flex-start"};
  `,
  ImageItem: styled.li<{ $imageCount: number }>`
    width: 130px;
    height: 130px;
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  `,
  Message: styled.p<{ $isSender: boolean }>`
    display: inline-block;
    ${styleFont.text.txt_md}
    color: ${styleColor.WHITE};
    padding: 10px;
    background-color: ${(props) =>
      props.$isSender ? `${styleColor.RED.main}` : `${styleColor.BLACK[300]}`};
    border-radius: 4px;
    word-break: break-all;
    text-align: ${(props) => (props.$isSender ? "right" : "left")};
  `,
};
