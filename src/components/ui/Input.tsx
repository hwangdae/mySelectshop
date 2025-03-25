import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface InputProps {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}

const Input = ({
  id,
  type = "text",
  disabled,
  placeholder,
  register,
}: InputProps) => {
  return (
    <S.Input
      id={id}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      {...register(id)}
    />
  );
};

export default Input;

const S = {
  Input: styled.input`
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
};
