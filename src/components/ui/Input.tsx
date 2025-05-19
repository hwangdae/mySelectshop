import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  register: UseFormRegister<T>;
}

const Input = <T extends FieldValues>({
  id,
  type = "text",
  disabled,
  placeholder,
  register,
}: InputProps<T>) => {
  return (
    <S.Input
      id={String(id)}
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
