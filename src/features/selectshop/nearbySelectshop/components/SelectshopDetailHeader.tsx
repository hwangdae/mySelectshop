import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface PropsType {
  placeName: string;
  hasMyReview: boolean;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
}

const SelectshopDetailHeader = ({
  placeName,
  hasMyReview,
  isEdit,
  setIsEdit,
  onDelete,
}: PropsType) => {
  return (
    <S.DetailSelectshopHeader>
      <S.DetailSelectshopName>{placeName}</S.DetailSelectshopName>
      {hasMyReview && (
        <S.ActionButtons>
          <Button
            onClick={() => setIsEdit((v) => !v)}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ padding: "5px" }}
          >
            {isEdit ? "취소" : "수정"}
          </Button>
          <Button
            onClick={onDelete}
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
  );
};

export default SelectshopDetailHeader;

const S = {
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
};
