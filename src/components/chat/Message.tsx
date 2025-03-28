import { TUserWithChat } from '@/types'
import { useSession } from 'next-auth/react'
import React from 'react'
import ProfileImage from '../ui/ProfileImage';

interface PropsType {
  currentUser : TUserWithChat;
  receiverName : string;
  receiverImage : string;
  messageText : string | null;
  senderId : string;
}

const Message = ({currentUser,receiverName,receiverImage,messageText,senderId}:PropsType) => {
  return (
    <div>{currentUser?.name}{messageText}
    <ProfileImage src={receiverImage} width={"55px"} height={"55px"}/>
    <p>{receiverName}</p>
    </div>
  )
}

export default Message

const S = {

}