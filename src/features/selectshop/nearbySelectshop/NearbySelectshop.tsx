"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import useKakaoSearch from "@/shared/hook/useKakaoSearch";
import SelectshopInfoCard from "../components/SelectshopInfoCard";
// import SelectshopDetail from "../common/SelectshopDetail";
import useDebounce from "@/shared/hook/useDebounce";
import { TPlace } from "@/shared/types";
import { openDetailShopIdStore, searchTermStore } from "@/globalState";
import dynamic from "next/dynamic";
import NoSearchResult from "@/shared/components/NoSearchResult";
import Pagination from "@/shared/components/Pagination";

const SelectshopDetail = dynamic(() => import("../components/SelectshopDetail"), {
  ssr: false,
});

const NearbySelectshop = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { openDetailShopId, setOpenDetailShopId } = openDetailShopIdStore();
  const { searchTerm } = searchTermStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { searchPlaces, pagination, selectshops, getPlaceById, center } =
    useKakaoSearch();
    
  const place = openDetailShopId ? getPlaceById(openDetailShopId) : undefined;

  useEffect(() => {
    if (center.lat && center.lng) {
      searchPlaces(currentPage);
    }
  }, [currentPage, center.lat, center.lng]);

  const filteredShops = useMemo(() => {
    if (!debouncedSearchTerm) return selectshops;

    return selectshops.filter((shop) =>
      shop.place_name.includes(debouncedSearchTerm),
    );
  }, [selectshops, debouncedSearchTerm]);

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
              {/* {openDetailShopId === selectshop.id && (
                <SelectshopDetail selectshop={selectshop} />
              )} */}
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
      {place && <SelectshopDetail selectshop={place} />}
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
