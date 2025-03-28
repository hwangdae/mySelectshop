'use client'
import React, { useState } from "react";
import { TUserWithChat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Contacts from "@/components/chat/Contacts";
import Chat from "@/components/chat/Chat";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { useSession } from "next-auth/react";

const ChatPage = () => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const {data : userData} = useSession()

  const { data: users } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const res = await axios.get(`/api/chat`);
      return res.data;
    },
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
    background-color: ${styleColor.GRAY[100]};
  `,
  conversationContainer: styled.section`
    width: 65%;
  `,
};
