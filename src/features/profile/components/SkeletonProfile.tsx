import React from "react";
import styled from "styled-components";

const SkeletonProfile = () => {
  return (
    <S.ProfileContainer>
      <S.UserNickName></S.UserNickName>
      <S.ProfileInfoContainer>
        <S.ProfileImageContainer>
          <S.ProfileImage />
        </S.ProfileImageContainer>
        <S.ProfileInfo>
          <S.UserEmail></S.UserEmail>
          <S.UserActivity />
        </S.ProfileInfo>
      </S.ProfileInfoContainer>
    </S.ProfileContainer>
  );
};

export default SkeletonProfile;

const S = {
  ProfileContainer: styled.div`
    padding: 20px 12px;
  `,
  UserNickName: styled.div`
    width: 150px;
    height: 20px;
    background-color: #f0f0f0;
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
  ProfileImage: styled.div`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: #f0f0f0;
  `,
  UserEmail: styled.div`
    width: 100px;
    height: 16px;
    border-radius: 4px;
    background-color: #f0f0f0;
    margin-bottom: 8px;
  `,
  ProfileInfo: styled.div`
    width: 70%;
  `,
  UserActivity: styled.div`
    width: 100%;
    height: 30px;
    border-radius: 4px;
    background-color: #f0f0f0;
  `,
};
