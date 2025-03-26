import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { fromNow } from "@/utils/fromNow";
import React from "react";
import styled from "styled-components";

const ChatHeader = () => {
  return (
    <div>
      <S.UserInfoWrapper>
        <S.ProfileImage src={""} />
        <div>
          <S.UserName>aaaa</S.UserName>
        </div>
        <div>
          <S.LastMessageTime>1시간 전</S.LastMessageTime>
          {/* {latestMessage && <p>{fromNow(latestMessage.createAt)}</p>} */}
        </div>
      </S.UserInfoWrapper>
    </div>
  );
};

export default ChatHeader;

const S = {
  UserInfoWrapper: styled.div`
    display: flex;
    gap: 8px;
  `,
  ProfileImage: styled.img`
    width: 44px;
    height: 44px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
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
