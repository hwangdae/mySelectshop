"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { styleFont } from "@/styles/styleFont";
import { Button } from "@mui/material";
import ImageUpload from "./ImageUpload";
import { signOut, useSession } from "next-auth/react";
import { uploadImage } from "@/utils/uploadImage";
import { useModal } from "@/context/ModalContext";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema } from "@/validators/auth";
import { ErrorMessage } from "@hookform/error-message";
import Input from "../ui/Input";
import CommonSpinner from "../ui/CommonSpinner";
import { profileUpdate } from "@/lib/user";

const ProfileUpdate = () => {
  const [previewProfileImage, setPreviewProfileImage] = useState<
    string | ArrayBuffer | null
  >("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: userData, update } = useSession();
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      uploadImage: userData?.user?.image || "",
      name: userData?.user?.name || "",
    },
  });

  useEffect(() => {
    if (userData?.user?.image) {
      setPreviewProfileImage(userData.user.image);
    }
  }, [userData]);

  const profileUpdateHandleSubmit: SubmitHandler<FieldValues> = async (
    body
  ) => {
    console.log("너 눌렸어?");
    console.log(body)
    setIsLoading(true);
    const imageUrl = body.uploadImage
      ? await uploadImage(body.uploadImage as File)
      : null;
    const updateProfileData = {
      id: userData?.user?.id,
      image: imageUrl || (userData?.user?.image as string),
      name: body.name || (userData?.user?.name as string),
    };
    try {
      profileUpdate(updateProfileData);
      await update(updateProfileData);
      alert("프로필 수정이 완료 되었습니다.");
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.ProfileUpdateContainer>
      <S.ProfileUpdateInner>
        <S.ProfileTitle>프로필 수정</S.ProfileTitle>
        <S.ProfileFormContainer
          onSubmit={handleSubmit(profileUpdateHandleSubmit)}
        >
          <S.ProfileContents>
            <ImageUpload
              previewProfileImage={previewProfileImage}
              setPreviewProfileImage={setPreviewProfileImage}
              setValue={setValue}
            />
            <h1>{userData?.user?.email}</h1>
            <Input
              id="name"
              type="text"
              disabled={isLoading}
              placeholder="닉네임"
              register={register}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <S.SignUpErrorMessage>{message}</S.SignUpErrorMessage>
              )}
            />
          </S.ProfileContents>
          <S.ProfileFn>
            <Button type="submit">수정{isLoading && <CommonSpinner />}</Button>
            <Button
              type="button"
              onClick={() => {
                if (window.confirm("로그아웃 하시겠어요?")) {
                  signOut();
                } else {
                  return;
                }
              }}
            >
              로그아웃
            </Button>
          </S.ProfileFn>
        </S.ProfileFormContainer>
      </S.ProfileUpdateInner>
    </S.ProfileUpdateContainer>
  );
};

export default ProfileUpdate;

const S = {
  ProfileUpdateContainer: styled.div`
    position: absolute;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  `,
  ProfileUpdateInner: styled.div`
    position: relative;
    left: 0;
    top: 0;
    width: 360px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: solid 1px #000;
    border-radius: 4px;
    padding: 30px;
    z-index: 99999;
  `,
  ProfileTitle: styled.h1`
    ${styleFont.title.tit_md}
    font-weight: 600;
  `,
  ProfileFormContainer: styled.form`
    text-align: center;
  `,
  ProfileContents: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0px;
  `,
  NickNameInput: styled.input`
    width: 100%;
    padding: 12px 0px;
    text-indent: 6px;
    border: solid 1px #d9dfeb;
    border-radius: 4px;
    outline: none;
    letter-spacing: -1px;
  `,
  ProfileFn: styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
  `,
  SignUpErrorMessage: styled.p`
    color: red;
    font-size: 14px;
  `,
};
