"use client";
import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { registerLoginSchema } from "@/validators/auth";
import { signIn } from "next-auth/react";
import Input from "@/shared/ui/Input";
import CommonSpinner from "@/shared/ui/CommonSpinner";
import { useModal } from "@/context/ModalContext";

const Login = () => {
  const [isLoading, setIsloading] = useState(false);
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandleSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsloading(true);
    try {
      const res = await signIn("credentials", {
        ...body,
        redirect: false,
      });

      if (res?.error) {
        alert(
          "아이디 또는 비밀번호가 잘못 되었습니다.\n아이디와 비밀번호를 정확히 입력해 주세요."
        );
        return;
      }
      alert("로그인이 완료 되었습니다.");
      window.location.reload();
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <S.LoginContainer>
      <S.LoginInner>
        <S.LoginTitle>
          시간 날 때 쇼핑하는 사람들,
          <span>마이 셀렉트샵</span>
        </S.LoginTitle>
        <S.LoginForm onSubmit={handleSubmit(loginHandleSubmit)}>
          <S.LoginFormInner>
            <S.LoginListItem>
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
                  <S.LoginErrorMessage>{message}</S.LoginErrorMessage>
                )}
              />
            </S.LoginListItem>
            <S.LoginListItem>
              <S.InputContainer>
                <Input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  placeholder="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                  register={register}
                />
              </S.InputContainer>
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <S.LoginErrorMessage>{message}</S.LoginErrorMessage>
                )}
              />
            </S.LoginListItem>
          </S.LoginFormInner>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disableFocusRipple={true}
            fullWidth
          >
            로그인{isLoading && <CommonSpinner />}
          </Button>
        </S.LoginForm>
        <S.SignUpLinkContainer>
          회원이 아니신가요?
          <button onClick={() => openModal({ type: "signup" })}>
            회원가입
          </button>
        </S.SignUpLinkContainer>
      </S.LoginInner>
    </S.LoginContainer>
  );
};

export default Login;

const S = {
  LoginContainer: styled.div``,
  LoginInner: styled.div`
    width: 360px;
    height: auto;
    padding: 30px;
  `,
  LoginTitle: styled.h1`
    font-size: 30px;
    line-height: 50px;
    letter-spacing: -2px;
    span {
      display: block;
      font-weight: bold;
    }
  `,
  LoginForm: styled.form``,
  LoginFormInner: styled.ul`
    margin: 30px 0px 10px 0px;
  `,
  LoginListItem: styled.li`
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0px;
    }
  `,
  InputContainer: styled.div`
    position: relative;
    left: 0;
    top: 0;
  `,
  LoginInput: styled.input`
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
  LoginErrorMessage: styled.p`
    color: red;
    font-size: 14px;
  `,
  SignUpLinkContainer: styled.div`
    ${styleFont.text.txt_sm}
    color: ${styleColor.GRAY[800]};
    text-align: center;
    margin-top: 24px;
    letter-spacing: -0.5px;
    button {
      cursor: pointer;
      ${styleFont.text.txt_sm}
      text-decoration: underline;
      color: ${styleColor.PURPLE[100]};
      margin-left: 2px;
    }
  `,
};
