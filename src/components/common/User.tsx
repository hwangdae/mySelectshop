import React from "react";
import Follow from "./Follow";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { TUser } from "@/types/user";
import ProfileImage from "../ui/ProfileImage";
import { useModal } from "@/context/ModalContext";
import { receiverStore } from "@/globalState";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface PropsType {
  user: TUser;
  type: string;
  isMutualFollow?: () => void;
}
const User = ({ user, type, isMutualFollow }: PropsType) => {
  const { setReceiver } = receiverStore();
  const { openModal } = useModal();
  const { data: userData } = useSession();
  return (
    <S.UserContainer $type={type}>
      <S.UserInfo>
        <ProfileImage
          src={user?.image || "/images/basicUserImage.png"}
          width={type === "follow" ? "38px " : "32px"}
          height={type === "follow" ? "38px " : "32px"}
        />
        <S.UserName $type={type}>{user?.name}</S.UserName>
      </S.UserInfo>
      <S.ActionButtons>
        {userData?.user?.id !== user?.id && (
          <S.Messagebutton
            $type={type}
            onClick={() => {
              setReceiver({
                receiverId: user?.id,
                receiverName: user?.name,
                receiverImage: user?.image || "",
              });
              openModal({ type: "chat" });
            }}
          >
            메세지
          </S.Messagebutton>
        )}
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
    /* width: 100%; */
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
    justify-content: end;
    gap: 7px;
  `,
  Messagebutton: styled.button<{ $type: string }>`
    cursor: pointer;
    width: 35%;
    ${styleFont.text.txt_xs}
    font-weight: 500;
    letter-spacing: -1px;
    color: ${(props) =>
      props.$type === "allReview" || "follow" ? "#111" : "#fff"};
    padding: 7px 8px;
    box-shadow: ${(props) =>
      props.$type === "allReview" || "follow"
        ? `0 0 0 1px ${styleColor.BLACK[0]} inset`
        : `0 0 0 1px ${styleColor.WHITE} inset`};
    border-radius: 4px;
  `,
};
