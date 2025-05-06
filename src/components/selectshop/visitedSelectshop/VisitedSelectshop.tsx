"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SelectshopInfoCard from "../common/SelectshopInfoCard";
import SelectshopDetail from "../common/SelectshopDetail";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import CustomPagination from "../../common/CustomPagination";
import NoSearchResult from "../../common/NoSearchResult";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import { useSession } from "next-auth/react";
import { getPaginatedItems } from "@/utils/pagenate";
import useGetFilteredSelectshops from "@/hook/useGetFilteredSelectshops";
import useDebounce from "@/hook/useDebounce";
import { getReview } from "@/lib/review";
import { TPlace } from "@/types";
import { openDetailShopIdStore, searchTermStore } from "@/globalState";

const VisitedSelectshop = () => {
  const { openDetailShopId, setOpenDetailShopId } = openDetailShopIdStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: userData } = useSession();
  const { searchTerm } = searchTermStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: getReview,
    enabled: !!userData,
    refetchOnWindowFocus: false,
  });

  const { searchAllPlaces, selectshops, center } = useKakaoSearch();
  const { visitedSelectshops } = useGetFilteredSelectshops(
    selectshops,
    reviewData,
    debouncedSearchTerm,
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

  const currentItems = getPaginatedItems(visitedSelectshops, currentPage);

  return (
    <S.SearchResultsContainer>
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
              {openDetailShopId === selectshop.id && (
                <SelectshopDetail selectshop={selectshop} />
              )}
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
