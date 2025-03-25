import { UserType } from "@/types/authType";
import React from "react";
import FollowContainer from "../layout/FollowContainer";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";

interface PropsType {
  user: UserType;
  type: string;
  isMutualFollow?: () => void;
}
const UserContainer = ({ user, type, isMutualFollow }: PropsType) => {
  return (
    <S.UserContainer $type={type}>
      <S.UserInfo>
        <S.ProfileImage
          src={user?.image || "/images/basicUserImage.png"}
          alt="유저 이미지"
        />
        <S.UserName $type={type}>{user?.name}</S.UserName>
      </S.UserInfo>
      <FollowContainer id={user?.id} isMutualFollow={isMutualFollow} />
    </S.UserContainer>
  );
};

export default UserContainer;

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
  ProfileImage: styled.img`
    width: 32px;
    height: 32px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
  UserName: styled.p<{ $type: string }>`
    ${styleFont.text.txt_sm}
    font-weight: 400;
    color: ${styleColor.BLACK[100]};
    // color: ${(props) => (props.$type === "follow" ? "#fff" : "#111")};
  `,
};
