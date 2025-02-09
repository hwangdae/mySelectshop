"use client"
import { PlaceType } from "@/types/placeType";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SelectshopInfoContainer from "../nearbySelectshopComponents/SelectshopInfoContainer";
import SelectshopDetailInfoContainer from "../nearbySelectshopComponents/SelectshopDetailInfoContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import { ReviewType } from "@/types/reviewType";
import CustomPaginationContainer from "../utilityComponents/CustomPaginationContainer";
import NoSearchResultContainer from "../utilityComponents/NoSearchResultContainer";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import { searchTermStore } from "@/globalState/zustand";
import { useSession } from "next-auth/react";
import { getPaginatedItems } from "@/utils/pagenate";
import axios from "axios";

const VisitedSelectshop = () => {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: userData } = useSession();
  const { searchTerm } = searchTermStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axios.get("/api/review");
      return res.data;
    },
    enabled: !!userData,
    refetchOnWindowFocus: false,
  });

  const { searchAllPlaces, selectshops, center } = useKakaoSearch();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      if (center.lat && center.lng) {
        searchAllPlaces();
      }
    }
  }, [currentPage, center.lat, center.lng]);

  const visitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      reviewData?.some(
        (review: ReviewType) =>
          review.selectshopId === selectshop.id &&
          review.userId === userData?.user?.id
      ) && selectshop.place_name.includes(searchTerm)
  );

  const currentItems = getPaginatedItems(visitedSelectshops, currentPage);

  return (
    <S.SearchResultsContainer>
      {currentItems.length === 0 && searchTerm === "" ? (
        <S.VisitedShopMessage>
          🏬 아직 방문한 편집샵이 없어요.
        </S.VisitedShopMessage>
      ) : currentItems.length > 0 ? (
        <S.SearchResultsInner>
          {currentItems?.map((selectshop: PlaceType) => (
            <li
              key={selectshop.id}
              onClick={() => {
                setActiveShopId(selectshop.id);
              }}
            >
              <SelectshopInfoContainer selectshop={selectshop} />
              {activeShopId === selectshop.id && (
                <SelectshopDetailInfoContainer selectshop={selectshop} />
              )}
            </li>
          ))}
        </S.SearchResultsInner>
      ) : (
        <NoSearchResultContainer />
      )}
      {currentItems.length < 15 ? (
        ""
      ) : (
        <CustomPaginationContainer
          selectshops={visitedSelectshops}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollRef={scrollRef}
        />
      )}
    </S.SearchResultsContainer>
  );
};

export default VisitedSelectshop;

const S = {
  SearchResultsContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled.ul`
    height: 100%;
  `,
  VisitedShopMessage: styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[400]};
  `,
};
