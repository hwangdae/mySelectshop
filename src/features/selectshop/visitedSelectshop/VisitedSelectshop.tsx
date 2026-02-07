"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SelectshopInfoCard from "../components/SelectshopInfoCard";
import SelectshopDetail from "../detail/SelectshopDetail";
import useKakaoSearch from "@/shared/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import { styleFont } from "@/shared/styles/styleFont";
import { styleColor } from "@/shared/styles/styleColor";
import { useSession } from "next-auth/react";
import { getPaginatedItems } from "@/shared/utils/pagenate";
import useGetFilteredSelectshops from "@/shared/hook/useGetFilteredSelectshops";
import useDebounce from "@/shared/hook/useDebounce";
import { getReviewBySelectshop } from "@/features/reviewEditor/api";
import { TPlace } from "@/shared/types";
import {
  myLocationStore,
  openDetailShopIdStore,
  searchTermStore,
} from "@/globalState";
import NoSearchResult from "@/shared/components/NoSearchResult";
import CustomPagination from "@/shared/components/CustomPagination";
import SelectshopSkeletonList from "@/shared/ui/SelectshopSkeletonList";
import { getUnvisitedSelectshops } from "../components/getUnvisitedSelectshops";

const VisitedSelectshop = () => {
  const { openDetailShopId, setOpenDetailShopId } = openDetailShopIdStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: userData } = useSession();
  const { searchTerm } = searchTermStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { center } = myLocationStore();
  const { data: reviewData, isLoading } = useQuery({
    queryKey: ["review"],
    queryFn: getReviewBySelectshop,
    enabled: !!userData,
    refetchOnWindowFocus: false,
  });
  const { data: review } = useQuery({
    queryKey: ["reviewssd"],
    queryFn: () =>
      getUnvisitedSelectshops(userData?.user?.id, center.lat, center.lng),
    enabled: !!userData,
    refetchOnWindowFocus: false,
  });
  console.log(
    review,
    "리뷰데이터1111111111111111111111111111111111111111111111111111111111111",
  );
  const { searchPlaces, selectshops, getPlaceById } = useKakaoSearch();
  const place = openDetailShopId ? getPlaceById(openDetailShopId) : undefined;

  const { visitedSelectshops } = useGetFilteredSelectshops(
    selectshops,
    reviewData,
    debouncedSearchTerm,
    userData,
  );

  useEffect(() => {
    if (center.lat && center.lng) {
      searchPlaces();
    }
  }, [currentPage, center.lat, center.lng]);

  const currentItems = getPaginatedItems(visitedSelectshops, currentPage);

  const isInitialLoading = isLoading || selectshops.length === 0 || !reviewData;
  const hasNoVisitedShop =
    isInitialLoading && currentItems.length === 0 && debouncedSearchTerm === "";
  const hasSearchResult = currentItems.length > 0;

  return (
    <S.SearchResultsContainer ref={scrollRef}>
      {isInitialLoading && <SelectshopSkeletonList />}
      {hasNoVisitedShop && (
        <S.EmptyMessage>🏬 아직 방문한 편집샵이 없어요.</S.EmptyMessage>
      )}
      {!isLoading && hasSearchResult && (
        <S.List>
          {currentItems.map((selectshop: TPlace) => (
            <li
              key={selectshop.id}
              onClick={() => setOpenDetailShopId(selectshop.id)}
            >
              <SelectshopInfoCard selectshop={selectshop} />
            </li>
          ))}
        </S.List>
      )}

      {!hasNoVisitedShop && !hasSearchResult && <NoSearchResult />}
      {currentItems.length >= 15 && (
        <CustomPagination
          selectshops={visitedSelectshops}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollRef={scrollRef}
        />
      )}
      {place && <SelectshopDetail selectshop={place} />}
    </S.SearchResultsContainer>
  );
};

export default VisitedSelectshop;

const S = {
  SearchResultsContainer: styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  List: styled.ul``,
  EmptyMessage: styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    ${styleFont.title.tit_md};
    color: ${styleColor.GRAY[400]};
  `,
};
