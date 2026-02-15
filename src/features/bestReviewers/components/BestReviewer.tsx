"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useKakaoSearch from "@/shared/hook/useKakaoSearch";
import { getBestReviewersByRegion } from "@/features/bestReviewers/api";
import useMyAddress from "@/shared/hook/useMyAddress";
import { TBestReviewer } from "../types";
import UserProfile from "./UserProfile";
import ReviewList from "./ReviewList";
import { getRegionFromAddress } from "@/shared/utils/getRegionFromAddress";
import NoBestReviewer from "./NoBestReviewer";
import BestReviewerTitle from "./BestReviewerTitle";

const BestReviewer = () => {
  const [activeUserId, setActiveuserId] = useState<string>("");
  const { searchAllPlaces, selectshops, center } = useKakaoSearch();

  const { myAddress } = useMyAddress();
  const region = getRegionFromAddress(myAddress);

  const { data: bestReviewers } = useQuery({
    queryKey: ["bestReviewers", region],
    queryFn: () => getBestReviewersByRegion(region),
    enabled: !!region,
  });
  console.log(bestReviewers,"베스트리뷰어")
  useEffect(() => {
    if (center.lat && center.lng) {
      searchAllPlaces();
    }
  }, [center.lat, center.lng]);

  const reviewersWithReviews: TBestReviewer[] =
    bestReviewers?.filter(
      (reviewer: TBestReviewer) => reviewer.reviews.length > 0,
    ) ?? [];

  if (reviewersWithReviews.length === 0) {
    return (
      <S.BestReviewerContainer>
        <S.InnerContainer>
          <NoBestReviewer address={myAddress} />
        </S.InnerContainer>
      </S.BestReviewerContainer>
    );
  }

  return (
    <S.BestReviewerContainer>
      <S.InnerContainer>
        <BestReviewerTitle address={myAddress} />
        <ul>
          {bestReviewers?.map((bestReviewer: TBestReviewer, index: number) => {
            return (
              bestReviewer.reviews?.length !== 0 && (
                <li
                  key={bestReviewer.id}
                  onClick={() => setActiveuserId(bestReviewer.id)}
                >
                  <UserProfile user={bestReviewer} index={index} />
                  {activeUserId === bestReviewer.id && (
                    <ReviewList user={bestReviewer} selectshops={selectshops} />
                  )}
                </li>
              )
            );
          })}
        </ul>
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
    padding: 0px 12px;
    height: 100%;
  `,
};
