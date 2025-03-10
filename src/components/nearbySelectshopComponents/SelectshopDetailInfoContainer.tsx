import React, { useState } from "react";
import styled from "styled-components";
import SelectshopReviewContainer from "./SelectshopReviewContainer";
import { useQuery } from "@tanstack/react-query";
import { styleFont } from "@/styles/styleFont";
import { PlaceType } from "@/types/placeType";
import { ReviewType } from "@/types/reviewType";
import AllReview from "./AllReview";
import WriteReview from "../writeReviewComponents/WriteReviewContainer";
import { Button } from "@mui/material";
// import useReviewMutate from "@/hook/useReviewMutate";
import { styleColor } from "@/styles/styleColor";
import useInitializeMapState from "@/hook/useInitializeMapState";
import { useSession } from "next-auth/react";
import MyReviewContainer from "../utilityComponents/MyReviewContainer";
import axios from "axios";

interface PropsType {
  selectshop: PlaceType;
}

const SelectshopDetailInfoContainer = ({ selectshop }: PropsType) => {
  const { id, place_name, x, y } = selectshop;
  const { data: userData } = useSession();
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isEditReview, setIsEditReview] = useState(false);
  useInitializeMapState(y, x);

  const { data: reviewData } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await axios.get(`/api/review?selectshopId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const myReview = reviewData?.find((review: ReviewType) => {
    return review?.selectshopId === id && review?.userId === userData?.user?.id;
  });

  const deleteReviewButton = async () => {
    try {
      if (confirm("리뷰를 삭제 하시겠어요?")) {
        await axios.delete(
          `/api/review?selectshopId=${id}&userId=${userData?.user?.id}`
        );
        alert("삭제가 완료 되었습니다.");
      }
    } catch (error) {
      console.log(error);
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
        <WriteReview
          selectshopId={id}
          setIsWriteReviewOpen={setIsWriteReviewOpen}
        />
      ) : (
        <>
          {myReview ? (
            <MyReviewContainer
              review={myReview}
              isEditReview={isEditReview}
              setIsEditReview={setIsEditReview}
            />
          ) : (
            <SelectshopReviewContainer
              onWriteReviewClick={() => setIsWriteReviewOpen(true)}
            />
          )}
        </>
      )}
      {!isWriteReviewOpen && (
        <S.AllReviewContainer>
          {reviewData?.map((review: ReviewType) => (
            <AllReview key={review.id} review={review} id={id} />
          ))}
        </S.AllReviewContainer>
      )}
    </S.DetailContainer>
  );
};

export default SelectshopDetailInfoContainer;

const S = {
  DetailContainer: styled.div`
    position: absolute;
    left: 360px;
    top: 0px;
    background-color: #fff;
    width: 300px;
    height: 100vh;
    z-index: 999;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
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
  `,
};
