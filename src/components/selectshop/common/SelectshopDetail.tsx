import React, { useRef, useState } from "react";
import styled from "styled-components";
import SelectshopReview from "./SelectshopReview";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { styleFont } from "@/styles/styleFont";
import AllReview from "./AllReview";
import { Button } from "@mui/material";
import { styleColor } from "@/styles/styleColor";
import useInitializeMapState from "@/hook/useInitializeMapState";
import { useSession } from "next-auth/react";
import { getMyReview, getPaginatedReviewsByShop } from "@/lib/review";
import useDeleteReview from "@/hook/mutate/review/useDeleteReview";
import MyReview from "@/components/common/MyReview";
import { TPlace, TReview } from "@/types";
import ReviewEditor from "@/components/reviewEditor/ReviewEditor";
import CommonSpinner from "@/components/ui/CommonSpinner";
import { useVirtualizer } from "@tanstack/react-virtual";

interface PropsType {
  selectshop: TPlace;
}

type TPaginatedReviewResponse = {
  page: number;
  total_pages: number;
  reviews: TReview[];
};

const SelectshopDetail = ({ selectshop }: PropsType) => {
  const { id, address_name, place_name, x, y } = selectshop;
  const { data: userData } = useSession();
  const userId = userData?.user?.id;
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isEditReview, setIsEditReview] = useState(false);
  const { deleteReviewMutate } = useDeleteReview(id, userId);
  const parentRef = useRef<HTMLUListElement>(null);
  useInitializeMapState(y, x);

  const { data: myReview } = useQuery({
    queryKey: ["myReview", id],
    queryFn: () => getMyReview(id, userId),
  });

  const {
    data = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TPaginatedReviewResponse, Error, TReview[]>({
    queryKey: ["reviewsBySelectshop", id],
    queryFn: ({ pageParam = 1 }) =>
      getPaginatedReviewsByShop(id, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1 ? lastPage.page + 1 : undefined;
      }
    },
    select: (data) => {
      return data?.pages?.flatMap((page) => page.reviews);
    },
  });

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? data.length + 1 : data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 154,
  });

  const deleteReviewButton = () => {
    if (confirm("리뷰를 삭제 하시겠어요?")) {
      deleteReviewMutate.mutate();
      alert("삭제가 완료 되었습니다.");
    }
  };

  return (
    <S.DetailContainer>
      <S.DetailSelectshopHeader>
        <S.DetailSelectshopName>{place_name}</S.DetailSelectshopName>
        {myReview && (
          <S.ActionButtons>
            <Button
              onClick={() => setIsEditReview(!isEditReview)}
              variant="outlined"
              color="primary"
              size="small"
              sx={{ padding: "5px" }}
            >
              {isEditReview ? "취소" : "수정"}
            </Button>
            <Button
              onClick={deleteReviewButton}
              variant="contained"
              color="primary"
              size="small"
              sx={{ padding: "5px" }}
            >
              삭제
            </Button>
          </S.ActionButtons>
        )}
      </S.DetailSelectshopHeader>
      {isWriteReviewOpen ? (
        <ReviewEditor
          type="write"
          selectshopId={id}
          addressName={address_name}
          setIsWriteReviewOpen={setIsWriteReviewOpen}
        />
      ) : myReview ? (
        <MyReview
          review={myReview}
          isEditReview={isEditReview}
          setIsEditReview={setIsEditReview}
        />
      ) : (
        <SelectshopReview
          onWriteReviewClick={() => setIsWriteReviewOpen(true)}
        />
      )}
      {!isWriteReviewOpen && (
        <S.AllReviewContainer ref={parentRef}>
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index >= data.length;
              const review = data[virtualRow.index];

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
                      <CommonSpinner
                        color={styleColor.YELLOW.PRIMARY}
                        size={15}
                      />
                    </S.LoadingSpinner>
                  ) : (
                    <AllReview key={review.id} review={review} id={id} />
                  )}
                </div>
              );
            })}
          </div>
        </S.AllReviewContainer>
      )}
    </S.DetailContainer>
  );
};

export default SelectshopDetail;

const S = {
  DetailContainer: styled.div`
    position: absolute;
    left: 360px;
    top: 0px;
    background-color: #fff;
    width: 330px;
    height: 100vh;
    z-index: 1;
    display: flex;
    flex-direction: column;
  `,
  DetailSelectshopHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, #528599 0%, #8bb0be 100%);
    padding: 0px 6px;
  `,
  DetailSelectshopName: styled.h1`
    padding: 14px 0px;
    ${styleFont.title.tit_md}
    font-weight: 600;
  `,
  ActionButtons: styled.div`
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
    button {
      ${styleFont.text.txt_xs}
      color: ${styleColor.WHITE};
    }
  `,
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
