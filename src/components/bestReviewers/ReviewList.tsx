import { styleFont } from "@/styles/styleFont";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Review from "./Review";
import ArrowLeft from "@/assets/ArrowLeft.svg";
import { styleColor } from "@/styles/styleColor";
import MyReview from "../common/MyReview";
import { TBestReviewer, TPlace, TReview, TReviewWithShopInfo } from "@/types";
import { boundsStore, shopCoordinatesStore } from "@/globalState";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviewsByUserId } from "@/lib/bestReviewers";
import { useInView } from "react-intersection-observer";
import CommonSpinner from "../ui/CommonSpinner";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

interface PropsType {
  user: TBestReviewer;
  selectshops: TPlace[];
}

type TPaginatedReviewResponse = {
  page: number;
  total_pages: number;
  reviews: TReview[];
};

const ReviewList = ({ user, selectshops }: PropsType) => {
  const { id, name } = user;
  const [detailReview, setDetailReview] = useState<TReviewWithShopInfo>();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { setShopCoordinates } = shopCoordinatesStore();
  const { setBounds } = boundsStore();
  const { ref, inView } = useInView();

  const {
    data = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TPaginatedReviewResponse, Error, TReview[]>({
    queryKey: ["reviews", id],
    queryFn: ({ pageParam = 1 }) => getReviewsByUserId(id, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    select: (data) => {
      return data?.pages?.flatMap((page) => page.reviews);
    },
  });

  const reviewsWithShopInfo = data.map((review: TReview) => {
    const shopInfo = selectshops.find(
      (selectshop: TPlace) => selectshop.id === review.selectshopId
    );
    return { ...review, shopInfo };
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const shopCoordinates = reviewsWithShopInfo.map(
      (review: TReviewWithShopInfo) => review.shopInfo
    );

    if (shopCoordinates.length === 0) return;

    const bounds = new window.kakao.maps.LatLngBounds();

    shopCoordinates.forEach((shop: any) => {
      if (shop) {
        bounds.extend(new window.kakao.maps.LatLng(shop.y, shop.x));
      }
    });

    setShopCoordinates(shopCoordinates as TPlace[]);
    setBounds(bounds);

    return () => {
      setShopCoordinates([]);
    };
  }, [data]);

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
          <AutoSizer
            style={{
              width: "100%",
              height: "100%",
              marginTop: "20px",
            }}
          >
            {({ width, height }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemCount={reviewsWithShopInfo.length}
                itemSize={200}
                itemData={reviewsWithShopInfo}
              >
                {({ index, style, data }) => {
                  const review: TReviewWithShopInfo = data[index];
                  return (
                    <S.ReviewItemWrap style={style}>
                      <S.ReviewItem
                        key={review.id}
                        onClick={() => {
                          setDetailReview(review);
                          setIsReviewOpen(true);
                        }}
                      >
                        <Review key={review.selectshopId} review={review} />
                      </S.ReviewItem>
                    </S.ReviewItemWrap>
                  );
                }}
              </FixedSizeList>
            )}
          </AutoSizer>
        </S.ReviewListWrap>
      )}
      {hasNextPage && (
        <S.LoadingSpinner ref={ref}>
          <CommonSpinner color={`${styleColor.YELLOW.PRIMARY}`} size={15} />
        </S.LoadingSpinner>
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
  ReviewListWrap: styled.ul`
    height: calc(100% - 66px);
    padding: 0px 12px;
    > div {
      > div {
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  `,
  ReviewItemWrap: styled.li``,
  ReviewItem: styled.div`
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0px 0px 8px 1px rgba(182, 182, 182, 0.1);
    margin-bottom: 20px;
    h2 {
      width: 100%;
      height: 80px;
      border-radius: 4px 4px 0px 0px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &:last-child {
      margin-bottom: 0px;
    }
  `,
  LoadingSpinner: styled.h1`
    display: flex;
    justify-content: center;
  `,
};
