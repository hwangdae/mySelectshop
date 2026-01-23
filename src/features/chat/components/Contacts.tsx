import { TUserWithChat } from "@/shared/types";
import React from "react";
import styled from "styled-components";
import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import People from "@/shared/assets/People.svg";
import User from "./User";

interface PropsType {
  users: TUserWithChat[];
  currentUser: TUserWithChat;
  receiverId: string;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const Contacts = ({
  users,
  currentUser,
  receiverId,
  setReceiver,
}: PropsType) => {
  const filterMessages = (id: string, name: string, image: string | null) => {
    setReceiver({
      receiverId: id,
      receiverName: name,
      receiverImage: image || "",
    });
  };

  const filteredUsers = users?.filter((user) => {
    const isNotCurrentUser = user.id !== currentUser?.id;
    const hasMutualConversation = user.conversations.some((conversation) =>
      conversation.users.some((user) => user.id === currentUser.id)
    );
    return isNotCurrentUser && hasMutualConversation;
  });
  
  return (
    <S.ContactsContainer>
      <h1>MESSAGES</h1>
      {filteredUsers?.length > 0 ? (
        <S.MessageList>
          {filteredUsers.map((user) => {
            return (
              <S.MessageItem
                key={user.id}
                onClick={() => filterMessages(user.id, user.name, user.image)}
                $receiverId={receiverId}
                $userId={user.id}
              >
                <User user={user} currentUserId={currentUser?.id} />
              </S.MessageItem>
            );
          })}
        </S.MessageList>
      ) : (
        <S.EmptyWrap>
          <S.EmptyMessage>
            <People
              width={"25px"}
              height={"25px"}
              fill={`${styleColor.GRAY[500]}`}
            />
            아직 대화한 상대가 없어요.
          </S.EmptyMessage>
        </S.EmptyWrap>
      )}
    </S.ContactsContainer>
  );
};

export default Contacts;

const S = {
  ContactsContainer: styled.div`
    height: 100%;
    padding: 16px 0px;
    h1 {
      ${styleFont.title.tit_lg};
      color: ${styleColor.GRAY[600]};
      letter-spacing: 0.8px;
      padding: 0px 16px 20px 16px;
      border-bottom: solid 1px ${styleColor.GRAY[100]};
    }
  `,
  MessageList: styled.ul`
    height: 442px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  MessageItem: styled.li<{ $userId: string; $receiverId: string }>`
    cursor: pointer;
    padding: 16px 16px;
    background-color: ${(props) =>
      props.$userId === props.$receiverId ? "#f5f5f5" : ""};
    border-radius: 1px;
  `,
  EmptyWrap: styled.div`
    height: 88%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  EmptyMessage: styled.p`
    display: flex;
    align-items: center;
    gap: 5px;
    ${styleFont.title.tit_sm}
    color: ${styleColor.GRAY[500]};
  `,
};
