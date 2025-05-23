"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useKakaoSearch from "@/hook/useKakaoSearch";
import SelectshopInfoCard from "../common/SelectshopInfoCard";
import SelectshopDetail from "../common/SelectshopDetail";
import useDebounce from "@/hook/useDebounce";
import NoSearchResult from "@/components/common/NoSearchResult";
import Pagination from "@/components/common/Pagination";
import { TPlace } from "@/types";
import { openDetailShopIdStore, searchTermStore } from "@/globalState";

const NearbySelectshop = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { openDetailShopId, setOpenDetailShopId } = openDetailShopIdStore();
  const { searchTerm } = searchTermStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { searchPlaces, pagination, selectshops, center } = useKakaoSearch();

  useEffect(() => {
      if (center.lat && center.lng) {
        searchPlaces(currentPage);
    }
  }, [currentPage, center.lat, center.lng]);

  const filteredShops = selectshops.filter((selectshop) =>
    selectshop.place_name.includes(debouncedSearchTerm)
  );

  return (
    <S.SearchResultsContainer ref={scrollRef}>
      {filteredShops.length > 0 ? (
        <S.SearchResultsInner>
          {filteredShops?.map((selectshop: TPlace) => (
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

      {filteredShops.length >= 15 && pagination && (
        <Pagination
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollRef={scrollRef}
        />
      )}
    </S.SearchResultsContainer>
  );
};

export default NearbySelectshop;

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
    width: 100%;
  `,
};
