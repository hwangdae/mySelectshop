import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import ProfileImage from "@/shared/ui/ProfileImage";
import React from "react";
import styled from "styled-components";

interface PropsType {
  receiverName: string;
  receiverImage: string;
}

const ChatHeader = ({
  receiverName,
  receiverImage,
}: PropsType) => {
  return (
    <S.ChatHeader>
      <S.UserInfoWrapper>
        <ProfileImage src={receiverImage} width={"36px"} height={"36px"} />
        <div>
          <S.UserName>{receiverName}</S.UserName>
        </div>
      </S.UserInfoWrapper>
    </S.ChatHeader>
  );
};

export default ChatHeader;

const S = {
  ChatHeader: styled.div`
    background-color: ${styleColor.INDIGO.PRIMARY};
  `,
  UserInfoWrapper: styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  UserName: styled.p`
    ${styleFont.text.txt_sm}
    font-weight: 400;
    color: ${styleColor.BLACK[100]};
  `,

  LastMessageTime: styled.p`
    ${styleFont.text.txt_xs}
    color: ${styleColor.GRAY[700]};
  `,
};
