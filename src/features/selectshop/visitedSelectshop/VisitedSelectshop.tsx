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
import { openDetailShopIdStore, searchTermStore } from "@/globalState";
import NoSearchResult from "@/shared/components/NoSearchResult";
import CustomPagination from "@/shared/components/CustomPagination";

const VisitedSelectshop = () => {
  const { openDetailShopId, setOpenDetailShopId } = openDetailShopIdStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: userData } = useSession();
  const { searchTerm } = searchTermStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: getReviewBySelectshop,
    enabled: !!userData,
    refetchOnWindowFocus: false,
  });

  const { searchPlaces, selectshops, getPlaceById, center } = useKakaoSearch();
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

  return (
    <S.SearchResultsContainer ref={scrollRef}>
      {currentItems.length === 0 && debouncedSearchTerm === "" ? (
        <S.VisitedShopMessage>
          🏬 아직 방문한 편집샵이 없어요.
        </S.VisitedShopMessage>
      ) : currentItems.length > 0 ? (
        <S.SearchResultsInner>
          {currentItems?.map((selectshop: TPlace) => (
            <li
              key={selectshop.id}
              onClick={() => {
                setOpenDetailShopId(selectshop.id);
              }}
            >
              <SelectshopInfoCard selectshop={selectshop} />
            </li>
          ))}
        </S.SearchResultsInner>
      ) : (
        <NoSearchResult />
      )}
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
