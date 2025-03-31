import { TUserWithChat } from "@/types";
import React, { useEffect, useRef } from "react";
import Input from "./Input";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import styled from "styled-components";

interface PropsType {
  currentUser: TUserWithChat;
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
}

const Chat = ({ currentUser, receiver }: PropsType) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const conversation = currentUser?.conversations.find((conversation) =>
    conversation.users.find((user) => user.id === receiver.receiverId)
  );
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  });
  return (
    <S.ChatContainer>
      <div>
        <ChatHeader
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.messages
              .filter((message) => message.receiverId === currentUser?.id)
              .slice(-1)[0]?.createAt
          }
        />
      </div>
      <S.Conversation>
        {conversation?.messages.map((message) => {
          return (
            <Message
              key={message.id}
              receiverName={receiver.receiverName}
              receiverImage={receiver.receiverImage}
              messageText={message.text}
              senderId={message.senderId}
              currentUser={currentUser}
            />
          );
        })}
        <div ref={messagesEndRef}></div>
      </S.Conversation>
      <S.ChatInputContainer>
        <Input
          currentUserId={currentUser?.id}
          receiverId={receiver?.receiverId}
        />
      </S.ChatInputContainer>
    </S.ChatContainer>
  );
};

export default Chat;

const S = {
  ChatContainer: styled.div`
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
  `,
  ChatInputContainer: styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  `,
  Conversation: styled.div`
    height: calc(100% - 66px - 63px);
    padding: 10px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};
