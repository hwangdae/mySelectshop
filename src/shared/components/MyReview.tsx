import { styleColor } from "@/shared/styles/styleColor";
import { styleFont } from "@/shared/styles/styleFont";
import NoImage from "@/shared/assets/NoImage.svg";
import styled from "styled-components";
import useInitializeMapState from "@/shared/hook/useInitializeMapState";
import Tags from "./Tags";
import CommonSwiper from "../ui/CommonSwiper";
import { TReviewWithShopInfo } from "@/shared/types";
import ReviewEditor from "@/features/reviewEditor/component/ReviewEditor";
// import dynamic from "next/dynamic";

// const CommonSwiper = dynamic(() => import("../ui/CommonSwiper"), {
//   loading: () => <div>aasdasdadasd</div>,
//   ssr: false,
// });

interface PropsType {
  review: TReviewWithShopInfo;
  nickName?: string;
  type?: string;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyReview = ({
  review,
  nickName,
  type,
  isEdit,
  setIsEdit,
}: PropsType) => {
  const {
    reviewImages,
    description,
    advantages,
    disAdvantages,
    selectshopId,
    tags,
    shopInfo,
  } = review;

  useInitializeMapState(shopInfo?.y || 0, shopInfo?.x || 0);

  return isEdit ? (
    <ReviewEditor
      type="edit"
      prevReview={review}
      selectshopId={selectshopId}
      setIsEdit={setIsEdit}
    />
  ) : (
    <S.MyReviewContainer>
      <S.ImageWrap>
        {reviewImages === null || reviewImages === "" ? (
          <NoImage width={"330px"} height={"180px"} />
        ) : (
          <CommonSwiper slideImages={reviewImages} />
        )}
      </S.ImageWrap>
      <S.ReviewTextWrap>
        <S.ReviewTextRow>
          <S.ReviewTitle>
            📒 {type === "bestReviewerList" ? `${nickName}님의` : "나의"} 후기
          </S.ReviewTitle>
          <S.ReviewDescription>{description}</S.ReviewDescription>
        </S.ReviewTextRow>
        <S.ReviewTextRow>
          <S.ReviewTitle>👍 셀렉샵 장점</S.ReviewTitle>
          <ul>
            {advantages?.map((advantage: string, index: number) => {
              return <li key={`${advantage}-${index}`}>{advantage}</li>;
            })}
          </ul>
        </S.ReviewTextRow>
        <S.ReviewTextRow>
          <S.ReviewTitle>👎 설렉샵 단점</S.ReviewTitle>
          <ul>
            {disAdvantages?.map((disAdvantage: string, index: number) => {
              return <li key={`${disAdvantage}-${index}`}>{disAdvantage}</li>;
            })}
          </ul>
        </S.ReviewTextRow>
        <S.ReviewTextRow>
          <S.ReviewTitle>🏷️ 태그</S.ReviewTitle>
          <Tags tags={tags} type={"myReview"} />
        </S.ReviewTextRow>
      </S.ReviewTextWrap>
    </S.MyReviewContainer>
  );
};

export default MyReview;

const S = {
  MyReviewContainer: styled.div`
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
  `,
  ImageWrap: styled.div`
    width: 330px;
  `,
  ReviewTextWrap: styled.ul`
    padding: 0px 12px;
  `,
  ReviewTextRow: styled.li`
    margin: 36px 0px;
    ul {
      list-style: disc;
      margin-left: 36px;
      li {
        margin-bottom: 7px;
        ${styleFont.text.txt_md}
      }
    }
  `,
  ReviewTitle: styled.h1`
    ${styleFont.title.tit_md}
    font-weight: 500;
    margin-bottom: 15px;
  `,
  ReviewDescription: styled.p`
    background-color: ${styleColor.GRAY[0]};
    padding: 10px;
    border-radius: 4px;
    overflow-wrap: break-word;
  `,
  TagList: styled.ul`
    list-style: none !important ;
    li {
      position: relative;
      left: 0;
      top: 0;
      display: inline-block;
      background-color: ${styleColor.RED[0]};
      padding: 4px 10px;
      border-radius: 4px;
      text-indent: 4px;
      color: #fff !important;
      margin-right: 5px;
      &::before {
        position: absolute;
        left: 6px;
        top: 50%;
        margin-top: -3px;
        display: block;
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 100%;
        background-color: #ffffff;
      }
    }
  `,
};
