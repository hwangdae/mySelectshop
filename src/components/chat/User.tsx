import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { TConversation, TUserWithChat } from "@/types";
import { fromNow } from "@/utils/fromNow";
import React from "react";
import styled from "styled-components";

interface PropsType {
  user: TUserWithChat;
  currentUserId: string;
}
const User = ({ user, currentUserId }: PropsType) => {
  console.log(user);

  const messagesWithCurentUser = user.conversations.find(
    (conversation: TConversation) =>
      conversation.users.find((user) => user.id === currentUserId)
  );

  const latestMessage = messagesWithCurentUser?.messages.slice(-1)[0];

  return (
    <S.UserContainer>
      <S.UserInfoWrapper>
        <S.ProfileImage src={user.image || ""} />
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
