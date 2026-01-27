import { styleColor } from "@/shared/styles/styleColor";
import CommonSpinner from "@/shared/ui/CommonSpinner";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useRef } from "react";
import styled from "styled-components";
import AllReview from "../../components/AllReview";
import { TReview } from "@/shared/types";

interface PropsType {
  reviews: TReview[];
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  shopId: string;
}

const ReviewList = ({
  reviews,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  shopId,
}: PropsType) => {
  const listRef = useRef<HTMLUListElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? reviews.length + 1 : reviews.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 154,
  });
  return (
    <S.AllReviewContainer ref={listRef}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index >= reviews.length;
          const review = reviews[virtualRow.index];

          if (isLoaderRow && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }

          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoaderRow ? (
                <S.LoadingSpinner>
                  <CommonSpinner color={styleColor.YELLOW.PRIMARY} size={15} />
                </S.LoadingSpinner>
              ) : (
                <AllReview key={review.id} review={review} id={shopId} />
              )}
            </div>
          );
        })}
      </div>
    </S.AllReviewContainer>
  );
};

export default ReviewList;

const S = {
  AllReviewContainer: styled.ul`
    padding: 0px 18px;
    overflow-y: auto;
    flex: 1;
    &::-webkit-scrollbar {
      width: 7px;
    }
    &::-webkit-scrollbar-thumb {
      height: 30%;
      background: ${styleColor.INDIGO.PRIMARY};
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(206, 206, 206, 0.1);
    }
  `,
  LoadingSpinner: styled.h1`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  `,
};
