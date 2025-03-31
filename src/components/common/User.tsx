import React from "react";
import Follow from "./Follow";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { TUser } from "@/types/user";
import ProfileImage from "../ui/ProfileImage";
import { useModal } from "@/context/ModalContext";
import { receiverStore } from "@/globalState";

interface PropsType {
  user: TUser;
  type: string;
  isMutualFollow?: () => void;
}
const User = ({ user, type, isMutualFollow }: PropsType) => {
  const { setReceiver } = receiverStore();
  const { openModal } = useModal();
  return (
    <S.UserContainer $type={type}>
      <S.UserInfo>
        <ProfileImage
          src={user?.image || "/images/basicUserImage.png"}
          width={"32px"}
          height={"32px"}
        />
        <S.UserName $type={type}>{user?.name}</S.UserName>
      </S.UserInfo>
      <S.ActionButtons>
        <S.Messagebutton
          onClick={() => {
            setReceiver({
              receiverId: user?.id,
              receiverName: user?.name,
              receiverImage: user?.image || "",
            });
            openModal("chat");
          }}
        >
          메세지
        </S.Messagebutton>
        <Follow id={user?.id} isMutualFollow={isMutualFollow} />
      </S.ActionButtons>
    </S.UserContainer>
  );
};

export default User;

const S = {
  UserContainer: styled.div<{ $type: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: ${(props) => (props.$type === "follow" ? "0px 12px" : "")};
  `,
  UserInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  UserName: styled.p<{ $type: string }>`
    ${styleFont.text.txt_sm}
    font-weight: 400;
    color: ${styleColor.BLACK[100]};
  `,
  ActionButtons: styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    gap: 7px;
  `,
  Messagebutton: styled.button`
    cursor: pointer;
    width: 50%;
    ${styleFont.text.txt_sm}
    font-weight: 500;
    letter-spacing: -1px;
    color: ${styleColor.WHITE};
    padding: 7px 14px;
    box-shadow: 0 0 0 1px ${styleColor.WHITE} inset;
    border-radius: 4px;
  `,
};
