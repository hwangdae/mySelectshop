import { styleColor } from "@/shared/styles/styleColor";
import React from "react";
import styled from "styled-components";
import Camera from "@/shared/assets/Camera.svg";
import { imageCompressionFn } from "@/shared/utils/imageCompression";
import { previewImage } from "@/shared/utils/previewImage";

interface PropsType {
  previewProfileImage: string | ArrayBuffer | null;
  setPreviewProfileImage: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const ImageUpload = ({
  previewProfileImage,
  setPreviewProfileImage,
  setFile,
}: PropsType) => {
  const onchangeImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const uploadImageFile = e.target.files![0];
      const fileType = uploadImageFile.type.split("/")[1];
      if (!["jpg", "jpeg", "png", "webp"].includes(fileType)) {
        alert(
          '파일은 "*jpg, *jpeg, *png *webp" 만 가능합니다.\n이미지를 다시 업로드 해주세요.'
        );
        return;
      }
      const compressionFile = await imageCompressionFn(
        uploadImageFile,
        "small"
      );
      if (compressionFile) {
        previewImage(compressionFile, setPreviewProfileImage);
        setFile(compressionFile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.ProfileImageContainer>
      <S.ProfileImage
        src={
          previewProfileImage
            ? `${previewProfileImage}`
            : "/images/basicUserImage.png"
        }
        alt="프로필 이미지"
      />
      <S.ImageLabel htmlFor="profileImg">
        <Camera
          width={"25px"}
          height={"25px"}
          fill={`${styleColor.GRAY[700]}`}
        />
      </S.ImageLabel>
      <S.ImageInput
        type="file"
        accept="image/*, .jpg, .jpeg, .png"
        id="profileImg"
        onChange={onchangeImageUpload}
      ></S.ImageInput>
    </S.ProfileImageContainer>
  );
};

export default ImageUpload;

const S = {
  ProfileImageContainer: styled.div`
    display: inline-block;
    position: relative;
    right: 0px;
    top: 0px;
  `,
  ProfileImage: styled.img`
    width: 100px;
    height: 100px;
    border: solid 1px ${styleColor.GRAY[200]};
    border-radius: 100%;
    object-fit: cover;
  `,
  ImageLabel: styled.label`
    cursor: pointer;
    position: absolute;
    right: 50%;
    margin-right: -50px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    background-color: ${styleColor.GRAY[200]};
    border-radius: 100%;
  `,
  ImageInput: styled.input`
    display: none;
  `,
};
