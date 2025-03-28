"use client";
import { styleColor } from "@/styles/styleColor";
import { styleFont } from "@/styles/styleFont";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import ReviewList from "./ReviewList";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { getBestReviewers } from "@/lib/bestReviewers";
import { TBestReviewer } from "@/types";
import { myAddressStore } from "@/globalState";

const BestReviewer = () => {
  const [activeUserId, setActiveuserId] = useState<String>();
  const { searchAllPlaces, selectshops } = useKakaoSearch();
  const { myAddress } = myAddressStore();

  const { data: bestReviewers } = useQuery({
    queryKey: ["bestReviewers"],
    queryFn: getBestReviewers,
  });

  useEffect(() => {
    searchAllPlaces();
  }, []);

  return (
    <S.BestReviewerContainer>
      <S.InnerContainer>
        {bestReviewers?.filter((bestReviewer: TBestReviewer) => {
          return bestReviewer.reviews?.length > 0;
        }).length === 0 ? (
          <S.NoBestReviewer>
            <span>🏆</span>
            <div>
              <p>{myAddress}</p>
              <p>베스트 리뷰어가 아직 없어요.</p>
            </div>
          </S.NoBestReviewer>
        ) : (
          <div>
            <S.BestReviewerTitleWrap>
              <S.Trophy>🏆</S.Trophy>
              <S.BestReviewerText>
                <S.BestReviewerAddress>{myAddress}</S.BestReviewerAddress>
                <h1>
                  <span>TOP 10</span> 베스트 리뷰어
                </h1>
              </S.BestReviewerText>
            </S.BestReviewerTitleWrap>
            <ul>
              {bestReviewers?.map(
                (bestReviewer: TBestReviewer, index: number) => {
                  return (
                    bestReviewer.reviews?.length !== 0 && (
                      <li
                        key={bestReviewer.id}
                        onClick={() => setActiveuserId(bestReviewer.id)}
                      >
                        <UserProfile
                          user={bestReviewer}
                          index={index}
                        />
                        {activeUserId === bestReviewer.id && (
                          <ReviewList
                            user={bestReviewer}
                            selectshops={selectshops}
                          />
                        )}
                      </li>
                    )
                  );
                }
              )}
            </ul>
          </div>
        )}
      </S.InnerContainer>
    </S.BestReviewerContainer>
  );
};

export default BestReviewer;

const S = {
  BestReviewerContainer: styled.div`
    height: 100%;
  `,
  InnerContainer: styled.div`
    padding: 20px 12px;
    height: 100%;
  `,
  NoBestReviewer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    height: 100%;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[400]};
    span {
      font-size: 24px;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
      p:first-child {
        font-size: 12px;
      }
    }
  `,
  BestReviewerTitleWrap: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    ${styleFont.title.tit_lg}
  `,
  Trophy: styled.span`
    font-size: 28px;
  `,
  BestReviewerText: styled.div`
    span {
      color: ${styleColor.YELLOW.main};
      font-weight: 600;
    }
  `,
  BestReviewerAddress: styled.p`
    color: ${styleColor.GRAY[400]};
    font-size: 13px;
  `,
};
