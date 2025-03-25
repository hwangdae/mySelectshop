import { getReviewsBySelectshop } from "@/lib/review";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { TPlace } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface PropsType {
  selectshop: TPlace;
  index: number;
}

const MarkerContainer = ({ selectshop, index }: PropsType) => {
  const { id, place_name, x, y } = selectshop;
  const position = { lat: y, lng: x };

  const { data: reviewData } = useQuery({
    queryKey: ["reviewsBySelectshop", id],
    queryFn: () => getReviewsBySelectshop(id),
    enabled: !!id,
  });

  return (
    <CustomOverlayMap key={`marker-${y},${x}-${index}`} position={position}>
      <S.MarkerContainer>
        <S.SelectshopPlaceName>{place_name}</S.SelectshopPlaceName>
        {reviewData?.length !== 0 ? (
          <S.SelectshopReviewCount>
            +{reviewData?.length}
          </S.SelectshopReviewCount>
        ) : null}
      </S.MarkerContainer>
    </CustomOverlayMap>
  );
};

export default MarkerContainer;

const S = {
  MarkerContainer: styled.div`
    position: relative;
    left: 0px;
    bottom: 0px;
    padding: 8px 30px;
    border: solid 2px ${styleColor.RED[0]};
    border-radius: 20px;
    background: ${styleColor.WHITE};
    &::before {
      display: block;
      content: "";
      width: 6px;
      height: 6px;
      border-right: 2px solid ${styleColor.RED[0]};
      border-bottom: 2px solid ${styleColor.RED[0]};
      transform: rotate(45deg);
      background-color: ${styleColor.WHITE};
      position: absolute;
      bottom: -5px;
      left: 50%;
      margin-left: -3px;
      border-radius: 2px;
    }
    &::after {
      display: block;
      content: "";
      position: absolute;
      left: 50%;
      bottom: -10px;
      margin-left: -5px;
      width: 10px;
      height: 3px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      filter: blur(3px);
    }
  `,
  MarkerInner: styled.div`
    width: 100%;
  `,
  SelectshopPlaceName: styled.h1`
    width: 100%;
    ${styleFont.text.txt_md}
    font-weight: 600;
  `,
  SelectshopReviewCount: styled.p`
    position: absolute;
    right: -5px;
    top: -14px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${styleFont.text.txt_md}
    font-weight: 500;
    width: 26px;
    height: 26px;
    text-align: center;
    background: #fff;
    border: solid 2px ${styleColor.RED[0]};
    border-radius: 100%;
    z-index: 999;
  `,
};
