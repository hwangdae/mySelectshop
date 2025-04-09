import { TUserWithChat } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";
import ProfileImage from "../ui/ProfileImage";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";

interface PropsType {
  receiverName: string;
  receiverImage: string;
  messageImage:string | null;
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
    <div>
      <S.ReceiverUser $isSender={isSender}>
        <div style={{ display: `${isSender && "none"}` }}>
          <ProfileImage src={receiverImage} width={"44px"} height={"44px"} />
        </div>
        <div>
          <S.ReceiverName $isSender={isSender}>{receiverName}</S.ReceiverName>
          <img src={`${messageImage}`}/>
          <S.Message $isSender={isSender}>{messageText}</S.Message>
        </div>
      </S.ReceiverUser>
    </div>
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
  Message: styled.p<{ $isSender: boolean }>`
    display: inline-block;
    ${styleFont.text.txt_md}
    color: ${styleColor.WHITE};
    padding: 10px;
    background-color: ${styleColor.YELLOW.main};
    border-radius: 4px;
    word-break: break-all;
    text-align: ${(props) => (props.$isSender ? "right" : "left")};
  `,
};
