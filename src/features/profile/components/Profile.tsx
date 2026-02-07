"use client";
import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import React from "react";
import styled from "styled-components";
import ProfileUpdate from "@/shared/assets/ProfileUpdate.svg";
import { useSession } from "next-auth/react";
import { useModal } from "@/context/ModalContext";
import ProfileImage from "@/shared/ui/ProfileImage";
import UserActivity from "./UserActivity";
import SkeletonProfile from "./SkeletonProfile";

const Profile = () => {
  const { data: userData, status } = useSession();
  const { openModal } = useModal();
  if (status === "loading") return <SkeletonProfile />;
  return (
    <div>
      {userData && (
        <S.ProfileContainer>
          <S.UserNickName>안녕하세요 {userData.user?.name}님 👋</S.UserNickName>
          <S.ProfileInfoContainer>
            <S.ProfileImageContainer>
              <ProfileImage
                src={
                  userData.user?.image
                    ? `${userData.user?.image}`
                    : "/images/basicUserImage.png"
                }
                width={"60px"}
                height={"60px"}
              />
              <S.ProfileUpdateButton
                onClick={() => openModal({ type: "profile" })}
              >
                <ProfileUpdate
                  width={"15px"}
                  height={"15px"}
                  fill={`${styleColor.GRAY[700]}`}
                />
              </S.ProfileUpdateButton>
            </S.ProfileImageContainer>
            <S.ProfileInfo>
              <S.UserEmail>{userData.user?.email}</S.UserEmail>
              <UserActivity userId={userData.user?.id} />
            </S.ProfileInfo>
          </S.ProfileInfoContainer>
        </S.ProfileContainer>
      )}
    </div>
  );
};

export default Profile;

const S = {
  ProfileContainer: styled.div`
    padding: 20px 12px;
  `,
  UserNickName: styled.h1`
    ${styleFont.text.txt_lg}
    margin-bottom: 14px;
  `,

  ProfileInfoContainer: styled.div`
    display: flex;
    gap: 10px;
  `,
  ProfileImageContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
  `,
  ProfileUpdateButton: styled.button`
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    background-color: ${styleColor.GRAY[200]};
    border-radius: 100%;
  `,
  ProfileInfo: styled.div`
    width: 70%;
  `,
  UserEmail: styled.h2`
    ${styleFont.text.txt_md}
    margin-bottom: 8px;
  `,
};
