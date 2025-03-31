import { TUserWithChat } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";
import ProfileImage from "../ui/ProfileImage";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";

interface PropsType {
  currentUser: TUserWithChat;
  receiverName: string;
  receiverImage: string;
  messageText: string | null;
  senderId: string;
}

const Message = ({
  currentUser,
  receiverName,
  receiverImage,
  messageText,
  senderId,
}: PropsType) => {
  return (
    <div>
      <S.ReceiverUser $position={senderId === currentUser.id}>
        <div style={{ display: `${senderId !== currentUser.id && "none"}` }}>
          <ProfileImage src={receiverImage} width={"44px"} height={"44px"} />
        </div>
        <div>
          <S.ReceiverName $position={senderId !== currentUser.id}>
            {receiverName}
          </S.ReceiverName>
          <S.Message>{messageText}</S.Message>
        </div>
      </S.ReceiverUser>
    </div>
  );
};

export default Message;

const S = {
  ReceiverUser: styled.div<{ $position: boolean }>`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px; /* gap-3는 12px */
  margin: 0 auto;
    direction: ${(props) => (props.$position ? "ltr" : "rtl")};
    margin-bottom: 10px;
  `,
  ReceiverName: styled.h3<{ $position: boolean }>`
    display: ${(props) => props.$position && "none"};
    margin-bottom: 4px;
  `,
  Message: styled.p`
    ${styleFont.text.txt_md}
    color: ${styleColor.WHITE};
    padding: 10px;
    background-color: ${styleColor.YELLOW.main};
    border-radius: 4px;
    word-break: break-all;
  `,
};
