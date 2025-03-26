"use client";
import Chat from "@/components/chat/Chat";
import Contacts from "@/components/chat/Contacts";
import { styleColor } from "@/styles/styleColor";
import { TUserWithChat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ChatPage = () => {
  const { data: userData } = useSession();
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const { data: users } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const res = await axios.get(`/api/chat`);
      return res.data;
    },
    refetchInterval: 1000,
  });
  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === userData?.user?.email
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
          <Chat currentUser={userData?.user} receiver={receiver} />
        </S.conversationContainer>
      </S.chatInner>
    </S.ChatContainer>
  );
};

export default ChatPage;

const S = {
  ChatContainer: styled.main`
    width: 1000px;
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
  conversationContainer: styled.section``,
};
