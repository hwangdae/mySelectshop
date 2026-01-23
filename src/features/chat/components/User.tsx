import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import { TConversation, TUserWithChat } from "@/shared/types";
import ProfileImage from "@/shared/ui/ProfileImage";
import { fromNow } from "@/shared/utils/fromNow";
import React from "react";
import styled from "styled-components";

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
        <ProfileImage
          src={user.image || "/images/basicUserImage.png"}
          width={"44px"}
          height={"44px"}
        />
        <div>
          <S.UserName>{user.name}</S.UserName>
          {latestMessage && (
            <S.LatestMessage>{latestMessage.text}</S.LatestMessage>
          )}
          {latestMessage && latestMessage.image && (
            <S.LatestImage>
              사진 {latestMessage.image?.split(",").length}장을 보냈습니다.
            </S.LatestImage>
          )}
        </div>
      </S.UserInfoWrapper>
      <div>
        {latestMessage && (
          <S.LastMessageTime>
            {fromNow(latestMessage.createAt)}
          </S.LastMessageTime>
        )}
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
  LatestImage: styled.p`
    ${styleFont.text.txt_sm}
    color: ${styleColor.GRAY[500]};
  `,
  LastMessageTime: styled.p`
    ${styleFont.text.txt_xs}
    color: ${styleColor.GRAY[500]};
  `,
};
