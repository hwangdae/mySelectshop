"use client";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import SelectshopInfoCard from "../components/SelectshopInfoCard";
// import SelectshopDetail from "../common/SelectshopDetail";
import useKakaoSearch from "@/shared/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import { styleFont } from "@/shared/styles/styleFont";
import { styleColor } from "@/shared/styles/styleColor";
import { getPaginatedItems } from "@/shared/utils/pagenate";
import { useSession } from "next-auth/react";
import useGetFilteredSelectshops from "@/shared/hook/useGetFilteredSelectshops";
import useDebounce from "@/shared/hook/useDebounce";
import { TPlace } from "@/shared/types";
import {
  currentPageStore,
  openDetailShopIdStore,
  searchTermStore,
} from "@/globalState";
import { getReviewBySelectshop } from "@/features/reviewEditor/api";

import dynamic from "next/dynamic";
import NoSearchResult from "@/shared/components/NoSearchResult";
import CustomPagination from "@/shared/components/CustomPagination";
import SelectshopSkeletonList from "@/shared/ui/SelectshopSkeletonList";

const SelectshopDetail = dynamic(() => import("../detail/SelectshopDetail"), {
  ssr: false,
});

const NotVisiteSelectshop = () => {
  const { openDetailShopId, setOpenDetailShopId } = openDetailShopIdStore();
  const { currentPage, setCurrentPage } = currentPageStore();
  const { data: userData } = useSession();
  const { searchTerm } = searchTermStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: reviewData, isLoading } = useQuery({
    queryKey: ["review"],
    queryFn: getReviewBySelectshop,
    enabled: !!userData,
    refetchOnWindowFocus: false,
  });

  const { searchAllPlaces, selectshops, center } = useKakaoSearch();
  const { notVisitedSelectshops } = useGetFilteredSelectshops(
    selectshops,
    reviewData,
    debouncedSearchTerm,
    userData,
  );

  useEffect(() => {
    if (center.lat && center.lng) {
      searchAllPlaces();
    }
  }, [center.lat, center.lng]);

  const currentItems = getPaginatedItems(notVisitedSelectshops, currentPage);

  const isInitialLoading = isLoading || selectshops.length === 0 || !reviewData;
  const hasNoVisitedShop =
    isInitialLoading && currentItems.length === 0 && debouncedSearchTerm === "";
  const hasSearchResult = currentItems.length > 0;

  return (
    <S.SearchResultsContainer ref={scrollRef}>
      {isInitialLoading && <SelectshopSkeletonList />}
      {hasNoVisitedShop && (
        <S.VisitedShopMessage>
          🏬 모든 편집샵을 다 방문 했어요.
        </S.VisitedShopMessage>
      )}
      {!isLoading && hasSearchResult && (
        <S.List>
          {currentItems?.map((selectshop: TPlace) => (
            <li
              key={selectshop.id}
              onClick={() => setOpenDetailShopId(selectshop.id)}
            >
              <SelectshopInfoCard selectshop={selectshop} />
              {openDetailShopId === selectshop.id && (
                <SelectshopDetail selectshop={selectshop} />
              )}
            </li>
          ))}
        </S.List>
      )}
      {!hasNoVisitedShop && !hasSearchResult && <NoSearchResult />}

      {currentItems.length >= 15 && (
        <CustomPagination
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
  List: styled.ul``,
  VisitedShopMessage: styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[400]};
  `,
};
