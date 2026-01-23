import { styleColor } from "@/shared/styles/styleColor";
import React from "react";
import styled from "styled-components";
import { formatFileSize } from "@/shared/utils/formatFileSize";
import Trash from "@/shared/assets/Trash.svg";
import X from "@/shared/assets/X.svg";
import { styleFont } from "@/shared/styles/styleFont";

interface PropsType {
  previewImages: File[];
  setPreviewImages: React.Dispatch<React.SetStateAction<File[]>>;
  setImage: React.Dispatch<React.SetStateAction<File[]>>;
}

const UploadPreview = ({
  previewImages,
  setPreviewImages,
  setImage,
}: PropsType) => {
  return (
    <>
      {previewImages.length > 0 && (
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.UploadImageTitle>파일 전송</S.UploadImageTitle>
            <S.UploadCancelButton onClick={() => setPreviewImages([])}>
              <X fill={`${styleColor.GRAY[400]}`} />
            </S.UploadCancelButton>
          </S.PreviewHeader>
          <S.PreviewList>
            {previewImages?.map((image, index) => (
              <S.PreviewItem key={index}>
                <S.PreviewInfo>
                  <S.PreviewImage
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                  />
                  <div>
                    <S.PreviewImageName>{image.name}</S.PreviewImageName>
                    <p>{formatFileSize(image.size)}</p>
                  </div>
                </S.PreviewInfo>
                <S.PreviewImageDeleteButton
                  onClick={() => {
                    const filteredPreviewImages = previewImages.filter(
                      (image1) => {
                        return image1.name !== image.name;
                      }
                    );
                    setPreviewImages(filteredPreviewImages);
                    setImage(filteredPreviewImages);
                  }}
                >
                  <Trash fill={`${styleColor.GRAY[200]}`} />
                </S.PreviewImageDeleteButton>
              </S.PreviewItem>
            ))}
          </S.PreviewList>
        </S.PreviewContainer>
      )}
    </>
  );
};

export default UploadPreview;

const S = {
  PreviewContainer: styled.div`
    height: 177px;
    overflow-y: auto;
    background-color: ${styleColor.WHITE};
    padding: 20px;
    box-shadow: 2px 0px 8px 2px rgba(155, 155, 155, 0.1);
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      height: 30%;
      background: ${styleColor.INDIGO.PRIMARY};
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(206, 206, 206, 0.1);
    }
  `,
  PreviewHeader: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  UploadImageTitle: styled.h1`
    ${styleFont.title.tit_md}
  `,
  UploadCancelButton: styled.button`
    cursor: pointer;
  `,
  PreviewList: styled.ul``,
  PreviewItem: styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  `,
  PreviewInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  PreviewImage: styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
  `,
  PreviewImageName: styled.h1``,
  PreviewImageDeleteButton: styled.button`
    cursor: pointer;
  `,
};
