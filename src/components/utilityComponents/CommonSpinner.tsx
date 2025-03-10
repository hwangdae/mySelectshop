import { styleColor } from "@/styles/styleColor";
import React from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const CommonSpinner = () => {
  return (
    <S.SppinerWrapper>
      <ClipLoader color={`${styleColor.WHITE}}`} size={10} />
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
