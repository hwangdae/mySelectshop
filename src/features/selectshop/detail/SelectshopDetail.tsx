import React, { useState } from "react";
import styled from "styled-components";
import SelectshopReview from "./components/SelectshopReview";
import useInitializeMapState from "@/shared/hook/useInitializeMapState";
import { useSession } from "next-auth/react";
import useDeleteReview from "@/features/reviewEditor/hooks/mutate/useDeleteReview";
import { TPlace } from "@/shared/types";
// import ReviewEditor from "@/features/reviewEditor/component/ReviewEditor";
// import MyReview from "@/shared/components/MyReview";
// import AllReview from "./AllReview";
import dynamic from "next/dynamic";
import { useSelectshopReviews } from "../hooks/useSelectshopReviews";
import SelectshopDetailHeader from "../nearbySelectshop/components/SelectshopDetailHeader";
import ReviewList from "./components/ReviewList";
import MyReviewSkeleton from "@/shared/components/MyReviewSkeleton";

const MyReview = dynamic(() => import("@/shared/components/MyReview"), {
  ssr: false,
  loading: () => <MyReviewSkeleton />,
});

const ReviewEditor = dynamic(
  () => import("@/features/reviewEditor/component/ReviewEditor"),
  { ssr: false },
);

interface PropsType {
  selectshop: TPlace;
}

const SelectshopDetail = ({ selectshop }: PropsType) => {
  const { id, address_name, place_name, x, y } = selectshop;
  const { data: userData } = useSession();
  const userId = userData?.user?.id;
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { deleteReviewMutate } = useDeleteReview(id, userId);
  useInitializeMapState(y, x);

  const { myReview, reviews, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSelectshopReviews(id, userId);

  const handleDelete = () => {
    if (confirm("리뷰를 삭제 하시겠어요?")) {
      deleteReviewMutate.mutate();
      alert("삭제가 완료 되었습니다.");
    }
  };

  return (
    <S.DetailContainer>
      <SelectshopDetailHeader
        placeName={place_name}
        hasMyReview={myReview}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onDelete={handleDelete}
      />
      {/* 등록한 리뷰가 없을 떄 */}
      {!isWriteOpen && !myReview && (
        <SelectshopReview onWriteReviewClick={() => setIsWriteOpen(true)} />
      )}

      {/* 리뷰 수정 컴포넌트 */}
      {isWriteOpen && (
        <ReviewEditor
          type="write"
          selectshopId={id}
          addressName={address_name}
          setIsWriteReviewOpen={setIsWriteOpen}
        />
      )}

      {/* 등록한 리뷰가 있을 때 */}
      {!isWriteOpen && myReview && (
        <MyReview review={myReview} isEdit={isEdit} setIsEdit={setIsEdit} />
      )}

      {!isWriteOpen && (
        <ReviewList
          reviews={reviews}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          shopId={id}
        />
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
};
