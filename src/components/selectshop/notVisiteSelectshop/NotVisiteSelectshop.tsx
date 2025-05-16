"use client";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import SelectshopInfoCard from "../common/SelectshopInfoCard";
import SelectshopDetail from "../common/SelectshopDetail";
import useKakaoSearch from "@/hook/useKakaoSearch";
import { useQuery } from "@tanstack/react-query";
import NoSearchResult from "../../common/NoSearchResult";
import { styleFont } from "@/styles/styleFont";
import { styleColor } from "@/styles/styleColor";
import { getPaginatedItems } from "@/utils/pagenate";
import CustomPagination from "../../common/CustomPagination";
import { useSession } from "next-auth/react";
import useGetFilteredSelectshops from "@/hook/useGetFilteredSelectshops";
import useDebounce from "@/hook/useDebounce";
import { TPlace } from "@/types";
import {
  currentPageStore,
  openDetailShopIdStore,
  searchTermStore,
} from "@/globalState";
import { getReviewBySelectshop } from "@/lib/review";

const NotVisiteSelectshop = () => {
  const { openDetailShopId, setOpenDetailShopId } = openDetailShopIdStore();
  const { currentPage, setCurrentPage } = currentPageStore();
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

  const { searchAllPlaces, selectshops, center } = useKakaoSearch();
  const { notVisitedSelectshops } = useGetFilteredSelectshops(
    selectshops,
    reviewData,
    debouncedSearchTerm,
    userData
  );

  useEffect(() => {
    if (center.lat && center.lng) {
      searchAllPlaces();
    }
  }, [currentPage, center.lat, center.lng]);

  const currentItems = getPaginatedItems(notVisitedSelectshops, currentPage);

  return (
    <S.SearchResultsContainer ref={scrollRef}>
      {currentItems.length === 0 && debouncedSearchTerm === "" ? (
        <S.VisitedShopMessage>
          🏬 모든 편집샵을 다 방문 했어요.
        </S.VisitedShopMessage>
      ) : currentItems.length > 0 ? (
        <S.SearchResultsInner>
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
        </S.SearchResultsInner>
      ) : (
        <NoSearchResult />
      )}

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
