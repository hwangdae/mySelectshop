import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { fromNow } from "@/utils/fromNow";
import React from "react";
import styled from "styled-components";
import ProfileImage from "../ui/ProfileImage";

interface PropsType {
  receiverName: string;
  receiverImage: string;
  lastMessageTime: Date | undefined;
}

const ChatHeader = ({
  receiverName,
  receiverImage,
  lastMessageTime,
}: PropsType) => {
  return (
    <S.ChatHeader>
      <S.UserInfoWrapper>
        <ProfileImage src={receiverImage} width={"44px"} height={"44px"}/>
        <div>
          <S.UserName>{receiverName}</S.UserName>
        </div>
        <div>
          <S.LastMessageTime>1시간 전</S.LastMessageTime>
          {lastMessageTime && <p>{fromNow(lastMessageTime)}</p>}
        </div>
      </S.UserInfoWrapper>
    </S.ChatHeader>
  );
};

export default ChatHeader;

const S = {
  ChatHeader: styled.div`
    background-color: ${styleColor.INDIGO.main};
  `,
  UserInfoWrapper: styled.div`
    padding: 10px;
    display: flex;
    gap: 8px;
  `,
  UserName: styled.p`
    ${styleFont.text.txt_sm}
    font-weight: 400;
    color: ${styleColor.BLACK[100]};
    margin-bottom: 8px;
  `,

  LastMessageTime: styled.p`
    ${styleFont.text.txt_xs}
    color: ${styleColor.GRAY[500]};
  `,
};
