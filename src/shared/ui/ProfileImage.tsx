import { styleColor } from "@/shared/styles/styleColor";
import React from "react";
import styled from "styled-components";

interface PropsType {
  src: string;
  width: string;
  height: string;
}

const ProfileImage = ({
  src = "/images/basicUserImage.png",
  width = "55px",
  height = "55px",
}: PropsType) => {
  return (
    <S.ProfileImage
      src={src}
      $width={width}
      $height={height}
      alt="유저 이미지"
    />
  );
};

export default ProfileImage;

const S = {
  ProfileImage: styled.img<{ $width: string; $height: string }>`
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 70%;
    object-fit: cover;
  `,
};
