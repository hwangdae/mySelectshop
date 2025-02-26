"use client";
import { PlaceType } from "@/types/placeType";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import SelectshopInfoContainer from "../nearbySelectshopComponents/SelectshopInfoContainer";
import SelectshopDetailInfoContainer from "../nearbySelectshopComponents/SelectshopDetailInfoContainer";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import { ReviewType } from "@/types/reviewType";
import NoSearchResultContainer from "../utilityComponents/NoSearchResultContainer";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import { getPaginatedItems } from "@/utils/pagenate";
import CustomPaginationContainer from "../utilityComponents/CustomPaginationContainer";
import { currentPageStore, searchTermStore } from "@/globalState/zustand";
import { useSession } from "next-auth/react";
import axios from "axios";
import useGetFilteredSelectshops from "@/hook/useGetFilteredSelectshops";

const NotVisiteSelectshop = () => {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);
  const { currentPage, setCurrentPage } = currentPageStore();
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
  const { notVisitedSelectshops } = useGetFilteredSelectshops(
    selectshops,
    reviewData,
    searchTerm,
    userData
  );

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

  const currentItems = getPaginatedItems(notVisitedSelectshops, currentPage);

  return (
    <S.SearchResultsContainer ref={scrollRef}>
      {currentItems.length === 0 && searchTerm === "" ? (
        <S.VisitedShopMessage>
          🏬 모든 편집샵을 다 방문 했어요.
        </S.VisitedShopMessage>
      ) : currentItems.length > 0 ? (
        <S.SearchResultsInner>
          {currentItems?.map((selectshop: PlaceType) => (
            <li
              key={selectshop.id}
              onClick={() => setActiveShopId(selectshop.id)}
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
          selectshops={notVisitedSelectshops}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollRef={scrollRef}
        />
      )}
    </S.SearchResultsContainer>
  );
};

export default NotVisiteSelectshop;

const S = {
  SearchResultsContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled.ul``,
  VisitedShopMessage: styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[400]};
  `,
};
