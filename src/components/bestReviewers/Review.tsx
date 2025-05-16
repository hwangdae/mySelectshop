import React from "react";
import styled from "styled-components";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { TReviewWithShopInfo } from "@/types";

interface PropsType {
  review: TReviewWithShopInfo;
}

const Review = ({ review }: PropsType) => {
  const { reviewImages, description, shopInfo } = review;

  return (
    <S.ReviewContainer>
      <h2>
        {reviewImages === null || reviewImages === "" ? (
          <S.NoImage src="/images/noImage.png" alt="없는 리뷰 이미지" />
        ) : (
          <img src={reviewImages.split(",")[0]} alt="리뷰 이미지"></img>
        )}
      </h2>
      <S.TextWrap>
        <S.SelectshopTitleContainer>
          <S.PlaceName>{shopInfo?.place_name}</S.PlaceName>
          {shopInfo?.distance && (
            <S.SelectshopDistance>
              {Number(shopInfo?.distance) >= 1000
                ? `${(Number(shopInfo?.distance) / 1000).toFixed(1)}km`
                : `${shopInfo?.distance}m`}
            </S.SelectshopDistance>
          )}
        </S.SelectshopTitleContainer>
        <S.ReviewText>{description}</S.ReviewText>
      </S.TextWrap>
    </S.ReviewContainer>
  );
};

export default React.memo(Review);

const S = {
  ReviewContainer: styled.div``,
  TextWrap: styled.div`
    padding: 22px 14px 14px 14px;
  `,
  ReviewText: styled.p`
    background-color: ${styleColor.GRAY[0]};
    ${styleFont.text.txt_sm}
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  NoImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  SelectshopTitleContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  PlaceName: styled.h1`
    ${styleFont.title.tit_md}
    font-weight: 600;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-bottom: 2px;
  `,
  SelectshopDistance: styled.span`
    ${styleFont.text.txt_sm};
    color: ${styleColor.GRAY[400]};
    font-weight: 400;
    margin-left: 6px;
  `,
};
