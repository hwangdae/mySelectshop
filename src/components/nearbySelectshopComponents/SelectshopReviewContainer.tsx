import { useModal } from "@/app/context/ModalContext";
import { styleFont } from "@/styles/styleFont";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

interface PropsType {
  onWriteReviewClick: () => void;
}

const SelectshopReviewContainer = ({ onWriteReviewClick }: PropsType) => {
  const { data: userData } = useSession();
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <S.SelectshopReviewContainer>
      <S.SelectshopReviewTitle>📒 나의 후기</S.SelectshopReviewTitle>
      <S.MySelectshopReview>
        <S.NoReview>등록된 후기가 없습니다.</S.NoReview>
        <Button
          color="secondary"
          onClick={() => {
            if (!userData) {
              alert("로그인이 필요한 서비스 입니다.");
              openModal("login")
              return;
            }
            onWriteReviewClick();
          }}
        >
          후기 등록하기
        </Button>
      </S.MySelectshopReview>
    </S.SelectshopReviewContainer>
  );
};

export default SelectshopReviewContainer;

const S = {
  SelectshopReviewContainer: styled.div`
    border-top: solid 1px #999;
    padding: 20px 12px 30px 12px;
  `,
  SelectshopReviewTitle: styled.h1`
    ${styleFont.title.tit_md}
    font-weight: 600;
    margin-bottom: 30px;
  `,
  MySelectshopReview: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  NoReview: styled.p`
    ${styleFont.text.txt_md}
    margin-bottom: 10px;
  `,
};
