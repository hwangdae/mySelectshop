import { TUserWithChat } from "@/types";
import React from "react";
import User from "./User";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";

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
  console.log(filteredUsers, "aaaaaaaaaaaaaaaaa");
  console.log(users, "유ㅜ저스");
  return (
    <S.ContactsContainer>
      <h1>MESSAGES</h1>
      <S.MessageList>
        {users?.length > 0 &&
          filteredUsers.map((user) => {
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
    </S.ContactsContainer>
  );
};

export default Contacts;

const S = {
  ContactsContainer: styled.div`
    padding: 16px 0px;
    h1 {
      ${styleFont.title.tit_lg};
      color: ${styleColor.GRAY[600]};
      letter-spacing: 0.8px;
      padding: 0px 16px;
      margin-bottom: 20px;
    }
  `,
  MessageList: styled.ul`
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  MessageItem: styled.li<{ $userId: String; $receiverId: String }>`
    cursor: pointer;
    padding: 16px 16px;
    background-color: ${(props) =>
      props.$userId === props.$receiverId ? "#f5f5f5" : ""};
    border-radius: 1px;
  `,
};
