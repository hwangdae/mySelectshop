import { TUserWithChat } from "@/types";
import React from "react";
import Input from "./Input";
import ChatHeader from "./ChatHeader";
import Message from "./Message";

interface PropsType {
  currentUser: TUserWithChat;
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
}

const Chat = ({ currentUser, receiver }: PropsType) => {
  return (
    <div>
      <div>
        <ChatHeader />
      </div>
      <div>
        <Message />
      </div>
      <div>
        <Input currentUserId={currentUser?.id}receiverId={receiver?.receiverId}/>
      </div>
    </div>
  );
};

export default Chat;
