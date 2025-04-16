import { TUserWithChat } from "@/types";
import React, { useEffect, useRef } from "react";
import Input from "./Input";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import styled from "styled-components";
import Conversation from "@/assets/Conversation.svg";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { groupMessagesByDate } from "@/utils/groupMessagesByDate";
import { TMessage } from "@/types/chat";

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
        />
      </div>
      <S.Conversation>
        {conversation !== undefined ? (
          Object.entries(groupMessagesByDate(conversation.messages)).map(
            ([date, messages]: [string, TMessage[]]) => (
              <div key={date}>
                <S.DateLineWrap key={date}>
                  <S.DateDivider>{date}</S.DateDivider>
                </S.DateLineWrap>
                {messages?.map((message: TMessage) => {
                  return (
                    <Message
                      key={message.id}
                      receiverName={receiver.receiverName}
                      receiverImage={receiver.receiverImage}
                      messageImage={message.image}
                      messageText={message.text}
                      isSender={message.senderId === currentUser.id}
                    />
                  );
                })}
              </div>
            )
          )
        ) : (
          <S.FirstConversationContainer>
            <S.ConversationSvg>
              <Conversation
                width={"50px"}
                height={"50px"}
                fill={`${styleColor.YELLOW.main}`}
              />
            </S.ConversationSvg>
            <S.ConversationTitle>첫 대화를 시작해 보세요.</S.ConversationTitle>
          </S.FirstConversationContainer>
        )}
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
  DateLineWrap: styled.div`
    text-align: center;
  `,
  DateDivider: styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    text-align: center;
    border-radius: 12px;
    ${styleFont.text.txt_sm}
    font-weight: 300;
    color: ${styleColor.GRAY[300]};
    &::before,
    &::after {
      flex: 1;
      content: "";
      border-top: 1px solid ${styleColor.GRAY[300]};
      margin: 0px 10px;
    }
  `,
  FirstConversationContainer: styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    padding: 50px;
    text-align: center;
    box-shadow: 0px 0px 8px 1px rgba(136, 136, 136, 0.1);
  `,
  ConversationSvg: styled.p`
    margin-bottom: 15px;
  `,
  ConversationTitle: styled.h1`
    ${styleFont.title.tit_sm}
    color: ${styleColor.GRAY[500]};
  `,
};
