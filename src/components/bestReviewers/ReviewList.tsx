import { styleFont } from "@/styles/styleFont";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import ArrowLeft from "@/assets/ArrowLeft.svg";
import { styleColor } from "@/styles/styleColor";
import MyReview from "../common/MyReview";
import { TBestReviewer, TPlace, TReview, TReviewWithShopInfo } from "@/types";
import { boundsStore, shopCoordinatesStore } from "@/globalState";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/lib/bestReviewers";

interface PropsType {
  user: TBestReviewer;
  selectshops: TPlace[];
}

const ReviewList = ({ user, selectshops }: PropsType) => {
  const { id, name } = user;
  const [detailReview, setDetailReview] = useState<TReviewWithShopInfo>();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { setShopCoordinates } = shopCoordinatesStore();
  const { setBounds } = boundsStore();

  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviews(id),
  });
  const filteredReviews = reviews?.filter((review: TReview) => {
    return selectshops.some(
      (selectshop: TPlace) => selectshop.id === review.selectshopId
    );
  });

  const reviewsWithShopInfo = reviews?.map((review: TReview) => {
    const shopInfo = selectshops.find(
      (shop) => shop.id === review.selectshopId
    );
    return { ...review, shopInfo };
  });
  // const reviewsWithShopInfo: TReviewWithShopInfo[] = reviews?.map(
  //   (review: TReview) => {
  //     const shopInfo = selectshops.find(
  //       (selectshop: TPlace) => selectshop!.id === review!.selectshopId
  //     );
  //     return { ...review, shopInfo };
  //   }
  // );
  // const reviewsWithShopInfo: TReviewWithShopInfo[] = reviews?.map(
  //   (review: TReview) => {
  //     const shopInfo = selectshops.find(
  //       (selectshop: TPlace) => selectshop!.id === review!.selectshopId
  //     );
  //     return { ...review, shopInfo };
  //   }
  // );
  useEffect(() => {
    if (!reviewsWithShopInfo) {
      alert("aa");
      return;
    }
    const bounds = new window.kakao.maps.LatLngBounds();
    const shopCoordinates = reviewsWithShopInfo.map(
      (review: TReviewWithShopInfo) => review.shopInfo
    );
    console.log(shopCoordinates, "여기가 첫번째");
    shopCoordinates.forEach((coordinate: TPlace | undefined) => {
      const position = {
        lat: coordinate?.y as number,
        lng: coordinate?.x as number,
      };
      bounds.extend(new window.kakao.maps.LatLng(position.lat, position.lng));
    });
    setShopCoordinates(shopCoordinates as TPlace[]);
    setBounds(bounds);

    return () => {
      setShopCoordinates([]);
    };
  }, []);
  return (
    <S.ReviewListContainer>
      {isReviewOpen ? (
        <S.TitleWrap>
          <button onClick={() => setIsReviewOpen(false)}>
            <ArrowLeft width={"16px"} fill={`${styleColor.YELLOW.PRIMARY}`} />
          </button>
          <S.Title>{detailReview?.shopInfo?.place_name}</S.Title>
        </S.TitleWrap>
      ) : (
        <S.TitleWrap>
          <S.Title>{name}님의 리뷰 리스트</S.Title>
        </S.TitleWrap>
      )}
      {isReviewOpen && detailReview ? (
        <MyReview review={detailReview} nickName={name} />
      ) : (
        <S.ReviewListWrap>
          {reviewsWithShopInfo?.map((review: TReviewWithShopInfo) => {
            return (
              <li
                key={review.id}
                onClick={() => {
                  setDetailReview(review);
                  setIsReviewOpen(true);
                }}
              >
                <Review key={review.selectshopId} review={review} />
              </li>
            );
          })}
        </S.ReviewListWrap>
      )}
    </S.ReviewListContainer>
  );
};

export default ReviewList;

const S = {
  ReviewListContainer: styled.div`
    position: absolute;
    left: 360px;
    top: 0px;
    background-color: #fff;
    width: 330px;
    height: 100vh;
    z-index: 999;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  TitleWrap: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    background: linear-gradient(to right, #528599 0%, #8bb0be 100%);
    padding-left: 4px;
    button {
      cursor: pointer;
      margin-top: 7px;
    }
  `,

  Title: styled.h1`
    text-indent: 6px;
    padding: 14px 0px;
    ${styleFont.title.tit_md}
    font-weight: 600;
  `,
  ReviewWrap: styled.ul``,
  ReviewListWrap: styled.ul`
    padding: 20px 12px;
  `,
};
