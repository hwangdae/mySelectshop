import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LocationDot from "@/assets/LocationDot.svg";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import { myAddressStore, myLocationStore } from "@/globalState";

const MyAddressContainer = () => {
  const { center } = myLocationStore();
  const { myAddress, setMyAddress } = myAddressStore();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      let geocoder = new kakao.maps.services.Geocoder();

      let updateAddressFromGeocode = function (data: any, status: string) {
        if (status === kakao.maps.services.Status.OK) {
          setMyAddress(data[0].address_name);
        }
      };
      geocoder.coord2RegionCode(
        center.lng,
        center.lat,
        updateAddressFromGeocode
      );
    }
  }, [center]);

  return (
    <S.MyAddress>
      <LocationDot width={"16px"} fill={`${styleColor.YELLOW.main}`} />
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

export default MyAddressContainer;

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
