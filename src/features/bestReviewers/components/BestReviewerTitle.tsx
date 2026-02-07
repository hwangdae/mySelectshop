import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import React from "react";
import styled from "styled-components";

const BestReviewerTitle = ({ address }: { address: string }) => (
  <S.BestReviewerTitleWrap>
    <S.Trophy>🏆</S.Trophy>
    <S.BestReviewerText>
      <S.BestReviewerAddress>{address}</S.BestReviewerAddress>
      <h1>
        <span>TOP 10</span> 베스트 리뷰어
      </h1>
    </S.BestReviewerText>
  </S.BestReviewerTitleWrap>
);

export default BestReviewerTitle;

const S = {
  BestReviewerTitleWrap: styled.div`
    display: flex;
    align-items: center;
    padding-top: 20px;
    margin-bottom: 30px;
    ${styleFont.title.tit_lg}
  `,
  Trophy: styled.span`
    font-size: 28px;
  `,
  BestReviewerText: styled.div`
    span {
      color: ${styleColor.YELLOW.PRIMARY};
      font-weight: 600;
    }
  `,
  BestReviewerAddress: styled.p`
    color: ${styleColor.GRAY[400]};
    font-size: 13px;
  `,
};
