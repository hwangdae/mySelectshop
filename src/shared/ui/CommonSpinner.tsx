import { styleColor } from "@/shared/styles/styleColor";
import React from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

interface OptionType {
  color?: string;
  size?: number;
}

const CommonSpinner = ({
  color = `${styleColor.WHITE}`,
  size = 10,
}: OptionType) => {
  return (
    <S.SppinerWrapper>
      <ClipLoader color={color} size={size} />
    </S.SppinerWrapper>
  );
};

export default CommonSpinner;

const S = {
  SppinerWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 6px;
  `,
};
