import React from "react";
import styled from "styled-components";
import "swiper/css";
import ImageUpload from "@/assets/ImageUpload.svg";
import { imageCompressionFn } from "@/utils/imageCompression";
import { styleColor } from "@/styles/styleColor";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  previewImages: File[];
  setPreviewImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUploader = ({
  files,
  setFiles,
  previewImages,
  setPreviewImages,
  type = "file",
  accept = "image/*",
  id = "file-upload",
  children,
  ...props
}: PropsType) => {
  const onChangeImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      const compressedFiles = await Promise.all(
        newFiles.map((file) => imageCompressionFn(file, "small"))
      );

      setFiles(compressedFiles);
      setPreviewImages(compressedFiles);
    }
  };

  return (
    <>
      <S.Label htmlFor={id}>
        <ImageUpload
          width={"24px"}
          height={"24px"}
          fill={`${styleColor.GRAY[400]}`}
        />
      </S.Label>
      <S.ImageInput
        multiple
        type={type}
        id={id}
        accept={accept}
        {...props}
        onChange={onChangeImageUpload}
      />
    </>
  );
};

export default ImageUploader;

const S = {
  Label: styled.label`
    cursor: pointer;
  `,
  ImageInput: styled.input`
    display: none;
  `,
};
