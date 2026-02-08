import React from "react";
import styled from "styled-components";

const MyReviewSkeleton = () => {
  return (
    <S.MyReviewContainer>
      <S.ImageWrap>
        <S.SkeletonImage />
      </S.ImageWrap>

      <S.ReviewTextWrap>
        {/* 제목 + 설명 */}
        <S.ReviewTextRow>
          <S.SkeletonTitle />
          <S.SkeletonText width="90%" />
          <S.SkeletonText width="70%" />
        </S.ReviewTextRow>

        {/* 장점 */}
        <S.ReviewTextRow>
          <S.SkeletonTitle />
          <S.SkeletonList>
            <S.SkeletonText width="80%" />
            <S.SkeletonText width="75%" />
          </S.SkeletonList>
        </S.ReviewTextRow>

        {/* 단점 */}
        <S.ReviewTextRow>
          <S.SkeletonTitle />
          <S.SkeletonList>
            <S.SkeletonText width="85%" />
            <S.SkeletonText width="60%" />
          </S.SkeletonList>
        </S.ReviewTextRow>

        {/* 태그 */}
        <S.ReviewTextRow>
          <S.SkeletonTitle />
          <S.SkeletonTagRow>
            <S.SkeletonTag />
            <S.SkeletonTag />
            <S.SkeletonTag />
          </S.SkeletonTagRow>
        </S.ReviewTextRow>
      </S.ReviewTextWrap>
    </S.MyReviewContainer>
  );
};

export default MyReviewSkeleton;

const skeletonBase = `
  background-color: #e5e7eb; /* gray-200 */
  border-radius: 6px;
`;

const S = {
  MyReviewContainer: styled.div`
    display: flex;
    gap: 20px;
    padding: 16px 0;
  `,

  ImageWrap: styled.div`
    flex-shrink: 0;
  `,

  ReviewTextWrap: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  ReviewTextRow: styled.div`
    display: flex;
    flex-direction: column;
  `,

  SkeletonImage: styled.div`
    width: 330px;
    height: 180px;
    ${skeletonBase};
  `,

  SkeletonTitle: styled.div`
    width: 120px;
    height: 20px;
    margin-bottom: 10px;
    ${skeletonBase};
  `,

  SkeletonText: styled.div<{ width?: string }>`
    width: ${({ width }) => width || "100%"};
    height: 14px;
    margin-bottom: 6px;
    ${skeletonBase};
  `,

  SkeletonList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,

  SkeletonTagRow: styled.div`
    display: flex;
    gap: 8px;
    margin-top: 4px;
  `,

  SkeletonTag: styled.div`
    width: 60px;
    height: 24px;
    border-radius: 12px;
    background-color: #e5e7eb;
  `,
};
