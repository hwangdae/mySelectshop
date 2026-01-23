import { TUserWithChat } from "@/shared/types";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Conversation from "@/shared/assets/Conversation.svg";
import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import { flattenMessagesWithDate } from "@/shared/utils/flattenMessagesWithDate";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import Input from "./Input";

interface PropsType {
  currentUser: TUserWithChat;
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
}

const ChatConversation = ({ currentUser, receiver }: PropsType) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const conversation = currentUser?.conversations.find((conversation) =>
    conversation.users.find((user) => user.id === receiver.receiverId)
  );

  const flatList = flattenMessagesWithDate(conversation?.messages || []);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages.length]);

  return (
    <S.ChatContainer>
      <div>
        <ChatHeader
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
        />
      </div>
      <S.Conversation>
        <ul>
          {conversation !== undefined ? (
            <>
              {flatList.map((item) => {
                return (
                  <li
                    key={
                      item.type === "date"
                        ? `date-${item.value}`
                        : item.value.id
                    }
                  >
                    {item.type === "date" ? (
                      <S.DateLineWrap>
                        <S.DateDivider>{item.value}</S.DateDivider>
                      </S.DateLineWrap>
                    ) : (
                      <Message
                        key={item.value.id}
                        receiverName={receiver.receiverName}
                        receiverImage={receiver.receiverImage}
                        messageImage={item.value.image}
                        messageText={item.value.text}
                        isSender={item.value.senderId === currentUser.id}
                      />
                    )}
                  </li>
                );
              })}
            </>
          ) : (
            <S.FirstConversationContainer>
              <S.ConversationSvg>
                <Conversation
                  width={"50px"}
                  height={"50px"}
                  fill={`${styleColor.YELLOW.PRIMARY}`}
                />
              </S.ConversationSvg>
              <S.ConversationTitle>
                첫 대화를 시작해 보세요.
              </S.ConversationTitle>
            </S.FirstConversationContainer>
          )}
        </ul>
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

export default ChatConversation;

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
