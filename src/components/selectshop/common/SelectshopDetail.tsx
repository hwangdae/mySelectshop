import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectshopReview from "./SelectshopReview";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
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
import { useInView } from "react-intersection-observer";
import CommonSpinner from "@/components/ui/CommonSpinner";

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
  const { ref, inView } = useInView();
  useInitializeMapState(y, x);

  const { data: myReview } = useQuery({
    queryKey: ["myReview", id],
    queryFn: () => getMyReview(id, userId),
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<TPaginatedReviewResponse, Error, TReview[]>({
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
  console.log(data);
  // const allReviews = data?.pages.flatMap((page) => page.reviews) ?? [];
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

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
        <S.AllReviewContainer>
          {data?.map((review: TReview) => (
            <AllReview key={review.id} review={review} id={id} />
          ))}
          {hasNextPage && (
            <S.LoadingSpinner ref={ref}>
              <CommonSpinner color={`${styleColor.YELLOW.PRIMARY}`} size={15} />
            </S.LoadingSpinner>
          )}
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
