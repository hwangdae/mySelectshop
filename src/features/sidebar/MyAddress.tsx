import React from "react";
import styled from "styled-components";
import LocationDot from "@/shared/assets/LocationDot.svg";
import { styleFont } from "@/shared/styles/styleFont";
import { styleColor } from "@/shared/styles/styleColor";
import useMyAddress from "@/shared/hook/useMyAddress";

const MyAddress = () => {
  const { myAddress } = useMyAddress();

  return (
    <S.MyAddress>
      <LocationDot width={"16px"} fill={`${styleColor.YELLOW.PRIMARY}`} />
      {myAddress?.length === 0 ? (
        <h1>위치를 찾지 못했어요</h1>
      ) : (
        <h1>
          {myAddress}
          <span> 주변 탐색</span>
        </h1>
      )}
    </S.MyAddress>
  );
};

export default MyAddress;

const S = {
  MyAddress: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
    padding: 0px 12px;
    h1 {
      ${styleFont.text.txt_lg}
    }
  `,
};
