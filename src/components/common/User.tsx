import React from "react";
import Follow from "./Follow";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { TUser } from "@/types/user";
import ProfileImage from "../ui/ProfileImage";

interface PropsType {
  user: TUser;
  type: string;
  isMutualFollow?: () => void;
}
const User = ({ user, type, isMutualFollow }: PropsType) => {
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
      <Follow id={user?.id} isMutualFollow={isMutualFollow} />
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
};
