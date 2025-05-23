import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import PatchCheck from "@/assets/PatchCheck.svg";
import FullfillPatchCheck from "@/assets/FullfillPatchCheck.svg";
import { useSession } from "next-auth/react";
import {
  getMyReview,
  getReviewCountByShop,
} from "@/lib/review";
import { TPlace } from "@/types";
import { searchTermStore } from "@/globalState";

interface PropsType {
  selectshop: TPlace;
}

const SelectshopInfoCard = ({ selectshop }: PropsType) => {
  const { id, place_name, address_name, phone, distance } = selectshop;
  const { searchTerm } = searchTermStore();
  const { data: userData } = useSession();

  const { data: myReview } = useQuery({
    queryKey: ["myReview", id],
    queryFn: () => getMyReview(id, userData?.user?.id),
    enabled: !!id,
  });

  const { data: reviewCount } = useQuery({
    queryKey: ["reviewCountByShop", id],
    queryFn: () => getReviewCountByShop(id),
    enabled: !!id,
  });

  const highlightedText = (text: string, query: string) => {
    if (query !== "" && text.includes(query)) {
      const parts = text.split(new RegExp(`(${query})`, "gi"));
      return (
        <>
          {parts.map((part, index) => {
            return part.toLowerCase() === query.toLowerCase() ? (
              <S.HighlightText key={`${part}+${index}`}>{part}</S.HighlightText>
            ) : (
              <span key={`${part}-${index}`}>{part}</span>
            );
          })}
        </>
      );
    }
    return text;
  };

  return (
    <S.SelectshopContainer>
      <S.SlectshopContents>
        <S.SelectshopInfo>
          <S.SelectshopHeader>
            <S.SelectshopName>
              {highlightedText(place_name, searchTerm)}
            </S.SelectshopName>
            <S.SelectshopStats>
              <S.SelectshopDistance>
                {Number(distance) >= 1000
                  ? `${(Number(distance) / 1000).toFixed(1)}km`
                  : `${distance}m`}
              </S.SelectshopDistance>
              <span style={{ color: `${styleColor.GRAY[400]}` }}>·</span>
              <S.ReviewCount>리뷰수 {reviewCount || 0}</S.ReviewCount>
            </S.SelectshopStats>
          </S.SelectshopHeader>
          <S.SelectshopAddressName>{address_name}</S.SelectshopAddressName>
          <S.SelectshopPhone>{phone}</S.SelectshopPhone>
        </S.SelectshopInfo>
        <S.SelectshopFn>
          <S.SelectshopMoreInfoButton>
            {myReview ? (
              <FullfillPatchCheck
                width={"18px"}
                height={"18px"}
                fill={`${styleColor.RED[0]}`}
              />
            ) : (
              <PatchCheck width={"18px"} height={"18px"} />
            )}
          </S.SelectshopMoreInfoButton>
        </S.SelectshopFn>
      </S.SlectshopContents>
      {myReview && (
        <S.PreviewReviewContainer>
          <S.PreviewReviewTitle>나의 후기</S.PreviewReviewTitle>
          <S.PreviewReviewDescription>
            {myReview?.description}
          </S.PreviewReviewDescription>
        </S.PreviewReviewContainer>
      )}
    </S.SelectshopContainer>
  );
};

export default SelectshopInfoCard;

const S = {
  SelectshopContainer: styled.div`
    cursor: pointer;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 20px 12px;
    margin: 20px;
  `,
  SlectshopContents: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  SelectshopInfo: styled.div`
    width: 85%;
  `,
  SelectshopHeader: styled.div`
    margin-bottom: 14px;
  `,
  SelectshopName: styled.h1`
    ${styleFont.title.tit_md};
    font-weight: 500;
    margin-bottom: 4px;
  `,
  SelectshopStats: styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
  `,
  SelectshopDistance: styled.span`
    ${styleFont.text.txt_sm};
    color: ${styleColor.GRAY[400]};
    font-weight: 400;
  `,
  ReviewCount: styled.span`
    ${styleFont.text.txt_sm};
    color: ${styleColor.GRAY[400]};
    font-weight: 400;
  `,
  SelectshopAddressName: styled.h2`
    ${styleFont.text.txt_sm}
    margin-bottom: 6px;
  `,
  SelectshopPhone: styled.p`
    ${styleFont.text.txt_sm}
  `,
  SelectshopFn: styled.div``,
  SelectshopMoreInfoButton: styled.button`
    cursor: pointer;
  `,
  SelectshopFavoritesButton: styled.button`
    cursor: pointer;
  `,
  //프리뷰 리뷰
  PreviewReviewContainer: styled.div`
    border-radius: 4px;
    background-color: ${styleColor.GRAY[0]};
    margin-top: 10px;
    padding: 10px;
  `,
  PreviewReviewTitle: styled.h2`
    ${styleFont.text.txt_md}
    color: ${styleColor.INDIGO.PRIMARY};
    font-weight: bold;
  `,
  PreviewReviewDescription: styled.p`
    ${styleFont.text.txt_sm}
    font-weight: 400;
    border: solid 1px ${styleColor.GRAY[100]};
    border-radius: 4px;
    padding: 8px;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  HighlightText: styled.mark`
    background-color: transparent;
    font-weight: 800;
    color: ${styleColor.YELLOW.PRIMARY};
  `,
};
