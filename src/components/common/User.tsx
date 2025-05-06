import React from "react";
import Follow from "./Follow";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { TUser } from "@/types/user";
import ProfileImage from "../ui/ProfileImage";
import { useSession } from "next-auth/react";
import ChatButton from "./ChatButton";

interface PropsType {
  user: TUser;
  type: string;
  isMutualFollow?: () => void;
}
const User = ({ user, type, isMutualFollow }: PropsType) => {
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
        {!userData?.user?.id || userData?.user?.id !== user?.id && (
          <ChatButton user={user} type={type} />
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
    width: 45%;
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
    width: 55%;
    display: flex;
    justify-content: end;
    gap: 7px;
  `,
};
