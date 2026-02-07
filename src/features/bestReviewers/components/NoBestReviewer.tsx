import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import React from "react";
import styled from "styled-components";

const NoBestReviewer = ({ address }: { address: string }) => (
  <S.NoBestReviewer>
    <span>🏆</span>
    <div>
      <p>{address}</p>
      <p>베스트 리뷰어가 아직 없어요.</p>
    </div>
  </S.NoBestReviewer>
);

export default NoBestReviewer;

const S = {
  NoBestReviewer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    height: 100%;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[400]};
    span {
      font-size: 24px;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
      p:first-child {
        font-size: 12px;
      }
    }
  `,
};
