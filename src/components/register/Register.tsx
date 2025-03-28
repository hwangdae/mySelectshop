"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { ErrorMessage } from "@hookform/error-message";
import Eye from "@/assets/Eye.svg";
import EyeInvisible from "@/assets/EyeInvisible.svg";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/ui/Input";
import useToggle from "@/hook/useToggle";
import { registerSignUpSchema } from "@/validators/auth";
import CommonSpinner from "@/components/ui/CommonSpinner";

const Register = () => {
  const [showPassword, handlePasswordToggle] = useToggle(false);
  const [showCheckPassword, handleCheckPasswordToggle] = useToggle(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      checkPassword: "",
      name: "",
    },
  });

  const signupHandleSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", body);
      alert("회원가입이 완료 되었습니다.");
      router.push("/");
    } catch (err: any) {
      if (err.response?.status === 400) {
        alert(err.response.data.message);
      } else {
        console.error(err);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <S.SignUpContainer>
        <S.SignUpInner>
          <S.SignUpTitle>회원가입</S.SignUpTitle>
          <S.SignUpForm onSubmit={handleSubmit(signupHandleSubmit)}>
            <S.SignUpFormInner>
              <S.SignUpListItem>
                <Input
                  id="email"
                  type="text"
                  disabled={isLoading}
                  placeholder="이메일 주소"
                  register={register}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <S.SignUpErrorMessage>{message}</S.SignUpErrorMessage>
                  )}
                />
              </S.SignUpListItem>
              <S.SignUpListItem>
                <S.InputContainer>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    disabled={isLoading}
                    placeholder="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    register={register}
                  />
                  <S.ShowPasswordToggle
                    type="button"
                    tabIndex={-1}
                    onClick={handlePasswordToggle}
                  >
                    {showPassword ? (
                      <Eye width="20px" height="20px" fill="#a0a0a0" />
                    ) : (
                      <EyeInvisible width="20px" height="20px" fill="#a0a0a0" />
                    )}
                  </S.ShowPasswordToggle>
                </S.InputContainer>
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <S.SignUpErrorMessage>{message}</S.SignUpErrorMessage>
                  )}
                />
              </S.SignUpListItem>
              <S.SignUpListItem>
                <S.InputContainer>
                  <Input
                    id="checkPassword"
                    type={showCheckPassword ? "text" : "password"}
                    disabled={isLoading}
                    placeholder="비밀번호 재입력"
                    register={register}
                  />
                  <S.ShowPasswordToggle
                    type="button"
                    tabIndex={-1}
                    onClick={handleCheckPasswordToggle}
                  >
                    {showCheckPassword ? (
                      <Eye width="20px" height="20px" fill="#a0a0a0" />
                    ) : (
                      <EyeInvisible width="20px" height="20px" fill="#a0a0a0" />
                    )}
                  </S.ShowPasswordToggle>
                </S.InputContainer>
                <ErrorMessage
                  errors={errors}
                  name="checkPassword"
                  render={({ message }) => (
                    <S.SignUpErrorMessage>{message}</S.SignUpErrorMessage>
                  )}
                />
              </S.SignUpListItem>
              <S.SignUpListItem>
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
              </S.SignUpListItem>
            </S.SignUpFormInner>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disableFocusRipple={true}
              fullWidth
            >
              회원가입{isLoading && <CommonSpinner />}
            </Button>
          </S.SignUpForm>
        </S.SignUpInner>
      </S.SignUpContainer>
    </>
  );
};

export default Register;

const S = {
  SignUpContainer: styled.div`
    width: 430px;
  `,
  SignUpInner: styled.div`
  padding: 30px;
  `,
  SignUpTitle: styled.h1`
    font-size: 30px;
    line-height: 50px;
    letter-spacing: -2px;
  `,
  SignUpForm: styled.form``,
  SignUpFormInner: styled.ul`
    margin: 20px 0px 20px 0px;
  `,
  SignUpListItem: styled.li`
    margin-bottom: 13px;
    &:last-child {
      margin-bottom: 0px;
    }
  `,
  InputContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
  `,
  SignUpInput: styled.input`
    width: 100%;
    padding: 18px 0px;
    margin-bottom: 7px;
    text-indent: 6px;
    border: solid 1px #d9dfeb;
    border-radius: 4px;
    outline: none;
    &::placeholder {
      font-size: 14px;
      color: #d9dfeb;
    }
  `,
  ShowPasswordToggle: styled.button`
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -13px;
  `,
  SignUpErrorMessage: styled.p`
    color: red;
    font-size: 14px;
  `,
};
