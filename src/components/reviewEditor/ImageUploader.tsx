import React, { useRef, useState } from "react";
import NoImage from "@/assets/NoImage.svg";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { imageCompressionFn } from "@/utils/imageCompression";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  prevReview: string | null | undefined;
}

const ImageUploader = ({
  files,
  setFiles,
  prevReview,
  type = "file",
  accept = "image/*",
  id = "file-upload",
  ...props
}: PropsType) => {
  const [previewImages] = useState<string[]>(
    prevReview ? prevReview.split(",") : []
  );
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const previewStartRef = useRef<number | null>(null);
  const onChangeImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const startTime = performance.now();
    const newFiles = Array.from(e.target.files);
    previewStartRef.current = performance.now();
    // 미리보기 (원본)
    setPreviewFiles(newFiles);

    // 백그라운드 압축
    const compressedFiles = await Promise.all(
      newFiles.map((file) => imageCompressionFn(file, "small"))
    );
    setFiles(compressedFiles);

    const endTime = performance.now();
    console.log(`압축 소요 시간: ${(endTime - startTime).toFixed(0)}ms`);
  };

  return (
    <>
      <S.Label htmlFor={id}>
        {files?.length === 0 && previewImages.length > 0 ? (
          <S.ImageSwiper slidesPerView={1}>
            {previewImages.map((file: string, index: number) => (
              <S.SwiperSlide key={index}>
                <S.UploadImage
                  src={file}
                  alt={`${index + 1}번째 업로드 이미지`}
                />
              </S.SwiperSlide>
            ))}
          </S.ImageSwiper>
        ) : previewFiles.length > 0 ? (
          <S.ImageSwiper slidesPerView={1}>
            {previewFiles.map((file, index) => (
              <S.SwiperSlide key={index}>
                <S.UploadImage
                  src={URL.createObjectURL(file)}
                  alt={`uploaded-${index}`}
                  onLoad={() => {
                    if (previewStartRef.current) {
                      const end = performance.now();
                      console.log(
                        `미리보기 표시 시간: ${(
                          end - previewStartRef.current
                        ).toFixed(0)}ms`
                      );
                      previewStartRef.current = null;
                    }
                  }}
                />
              </S.SwiperSlide>
            ))}
          </S.ImageSwiper>
        ) : (
          <S.NoImageWrapper>
            <NoImage />
          </S.NoImageWrapper>
        )}
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

export default React.memo(ImageUploader);

const S = {
  Label: styled.label`
    display: block;
    margin-bottom: 15px;
    cursor: pointer;
  `,
  ImageInput: styled.input`
    display: none;
  `,
  UploadImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  NoImageWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ImageSwiper: styled(Swiper)`
    width: 100%;
    height: 180px;
  `,
  SwiperSlide: styled(SwiperSlide)`
    width: 100%;
    height: 100%;
    background-image: cover;
  `,
};
