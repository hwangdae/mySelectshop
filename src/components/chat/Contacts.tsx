import { TUserWithChat } from "@/types";
import React from "react";
import User from "./User";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";

interface PropsType {
  users: TUserWithChat[];
  currentUser: TUserWithChat;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const Contacts = ({ users, currentUser, setReceiver }: PropsType) => {
  
  const filterMessages = (id: string, name: string, image: string | null) => {
    setReceiver({
      receiverId: id,
      receiverName: name,
      receiverImage: image || "",
    });
  };

  return (
    <S.ContactsContainer>
      <h1>MESSAGES</h1>
      <S.MessageList>
        {users?.length > 0 &&
          users
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => {
              return (
                <li
                  key={user.id}
                  onClick={() => filterMessages(user.id, user.name, user.image)}
                >
                  <User user={user} currentUserId={currentUser?.id} />
                </li>
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
    li {
      cursor: pointer;
      padding: 16px 16px;
    }
    li:hover {
      background-color: #fff;
    }
  `,
};
