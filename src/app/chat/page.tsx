"use client";
import React, { useState } from "react";
import { TUserWithChat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Contacts from "@/components/chat/Contacts";
import Chat from "@/components/chat/Chat";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { useSession } from "next-auth/react";
import { receiverStore } from "@/globalState";
import { getChat } from "@/lib/chat";

const ChatPage = () => {
  const { receiver, setReceiver } = receiverStore();
  const { data: userData } = useSession();

  const { data: users } = useQuery({
    queryKey: ["chat"],
    queryFn: getChat,
    refetchInterval: 1000,
  });

  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.id === userData?.user?.id
  );

  return (
    <S.ChatContainer>
      <S.chatInner>
        <S.MessageListContainer>
          <Contacts
            users={users}
            currentUser={currentUserWithMessage}
            receiverId={receiver.receiverId}
            setReceiver={setReceiver}
          />
        </S.MessageListContainer>
        <S.conversationContainer>
          <Chat currentUser={currentUserWithMessage} receiver={receiver} />
        </S.conversationContainer>
      </S.chatInner>
    </S.ChatContainer>
  );
};

export default ChatPage;

const S = {
  ChatContainer: styled.main`
    width: 900px;
    height: 500px;
  `,
  chatInner: styled.div`
    display: flex;
    height: 100%;
  `,

  MessageListContainer: styled.section`
    width: 35%;
    height: 100%;
    background-color: ${styleColor.WHITE};
    border-right: solid 1px ${styleColor.GRAY[100]};
  `,
  conversationContainer: styled.section`
    width: 65%;
  `,
};
