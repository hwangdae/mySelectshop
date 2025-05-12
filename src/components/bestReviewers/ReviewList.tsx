import { styleFont } from "@/styles/styleFont";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import ArrowLeft from "@/assets/ArrowLeft.svg";
import { styleColor } from "@/styles/styleColor";
import MyReview from "../common/MyReview";
import { TBestReviewer, TPlace, TReview, TReviewWithShopInfo } from "@/types";
import { boundsStore, shopCoordinatesStore } from "@/globalState";
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { getReviewsByUserId } from "@/lib/bestReviewers";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView();
  const {
    data: reviews = [],

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }: any = useInfiniteQuery({
    queryKey: ["reviews", id],
    queryFn: ({ pageParam }) => getReviewsByUserId(id, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });
  console.log(reviews, "리뷰스");

  const flatReviews: TReview[] = reviews?.pages?.flatMap(
    (page: { reviews: TReview[] }) => page.reviews
  );

  console.log(flatReviews, "플랫리뷰스");
  const reviewsWithShopInfo = flatReviews?.map((review: TReview) => {
    const shopInfo = selectshops.find(
      (selectshop: TPlace) => selectshop.id === review.selectshopId
    );
    return { ...review, shopInfo };
  });
  console.log(reviewsWithShopInfo, "합친 데이터");
  // const reviewsWithShopInfo: TReviewWithShopInfo[] = reviews?.map(
  //   (review: TReview) => {
  //     const shopInfo = selectshops.find(
  //       (shop) => shop.id === review.selectshopId
  //     );
  //     return { ...review, shopInfo };
  //   }
  // );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (!reviews || reviews.length === 0) return;
    const shopCoordinates = reviewsWithShopInfo.map(
      (review: TReviewWithShopInfo) => review.shopInfo
    );

    if (shopCoordinates.length === 0) return;

    const bounds = new window.kakao.maps.LatLngBounds();

    shopCoordinates.forEach((shop: any) => {
      const position = {
        lat: shop.y,
        lng: shop.x,
      };
      bounds.extend(new window.kakao.maps.LatLng(position.lat, position.lng));
    });

    setShopCoordinates(shopCoordinates as any);
    setBounds(bounds);

    return () => {
      setShopCoordinates([]);
    };
  }, [reviews]);

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
      <h1 ref={ref}>Load more</h1>
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
