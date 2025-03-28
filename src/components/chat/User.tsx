import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { TConversation, TUserWithChat } from "@/types";
import { fromNow } from "@/utils/fromNow";
import React from "react";
import styled from "styled-components";
import ProfileImage from "../ui/ProfileImage";

interface PropsType {
  user: TUserWithChat;
  currentUserId: string;
}
const User = ({ user, currentUserId }: PropsType) => {

  const messagesWithCurentUser = user.conversations.find(
    (conversation: TConversation) =>
      conversation.users.find((user) => user.id === currentUserId)
  );

  const latestMessage = messagesWithCurentUser?.messages.slice(-1)[0];

  return (
    <S.UserContainer>
      <S.UserInfoWrapper>
        <ProfileImage src={user.image || ""} width={"44px"} height={"44px"}/>
        <div>
          <S.UserName>{user.name}</S.UserName>
          <S.LatestMessage>
            마지막으로 온 메세지aaaaaaaaaaaaaaaaa
          </S.LatestMessage>
          {latestMessage && <p>{latestMessage.text}</p>}
          {latestMessage && latestMessage.image && <p>이미지</p>}
        </div>
      </S.UserInfoWrapper>
      <div>
        <S.LastMessageTime>1시간 전</S.LastMessageTime>
        {latestMessage && <p>{fromNow(latestMessage.createAt)}</p>}
      </div>
    </S.UserContainer>
  );
};

export default User;

const S = {
  UserContainer: styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
  `,
  UserInfoWrapper: styled.div`
    display: flex;
    gap: 8px;
  `,
  UserName: styled.p`
    ${styleFont.text.txt_sm}
    font-weight: 400;
    color: ${styleColor.BLACK[100]};
    margin-bottom: 8px;
  `,
  LatestMessage: styled.p`
    width: 170px;
    ${styleFont.text.txt_sm}
    color: ${styleColor.GRAY[500]};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  LastMessageTime: styled.p`
    ${styleFont.text.txt_xs}
    color: ${styleColor.GRAY[500]};
  `,
};
