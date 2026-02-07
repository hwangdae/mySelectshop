import {
  boundsStore,
  markersStore,
  myLocationStore,
  selectshopsStore,
} from "@/globalState";
import { TMarker, TPagination, TPlace } from "@/shared/types";
import { useCallback, useRef, useState } from "react";

const KEYWORD = "의류판매";

const useKakaoSearch = () => {
  const { center } = myLocationStore();
  const { selectshops, setSelectshops } = selectshopsStore();
  const { setBounds } = boundsStore();
  const { setMarkers } = markersStore();

  const [pagination, setPagination] = useState<TPagination>();

  const placeMapRef = useRef<Map<string, TPlace>>(new Map());

  // Kakao SDK 사용 가능 여부 체크
  const isKakaoAvailable = () =>
    typeof window !== "undefined" &&
    window.kakao &&
    window.kakao.maps &&
    window.kakao.maps.services;

  // 검색 옵션 생성
  const createSearchOptions = useCallback(
    (page: number): kakao.maps.services.PlacesSearchOptions => ({
      location: new window.kakao.maps.LatLng(center.lat, center.lng),
      sort: window.kakao.maps.services.SortBy.ACCURACY,
      page,
    }),
    [center.lat, center.lng],
  );

  // 실제 검색 실행
  const executeSearch = useCallback(
    (
      page: number,
      accumulatedShops: TPlace[] = [],
      isAllPages: boolean = false,
    ) => {
      if (!isKakaoAvailable()) return;

      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(
        KEYWORD,
        (data, status, pagination) =>
          placesSearchCB(
            data,
            status,
            pagination,
            accumulatedShops,
            isAllPages,
          ),
        createSearchOptions(page),
      );
    },
    [createSearchOptions],
  );

  // 단일 페이지 검색
  const searchPlaces = useCallback(
    (page: number = 1) => {
      placeMapRef.current.clear();
      executeSearch(page);
    },
    [executeSearch],
  );

  // 전체 페이지 검색
  const searchAllPlaces = useCallback(
    (page: number = 1, accumulated: TPlace[] = []) => {
      if (page === 1) {
        placeMapRef.current.clear();
      }
      executeSearch(page, accumulated, true);
    },
    [executeSearch],
  );

  // 검색 콜백
  const placesSearchCB = (
    data: kakao.maps.services.PlacesSearchResultItem[],
    status: string,
    pagination: TPagination,
    accumulatedShops: TPlace[] = [],
    isAllPages: boolean,
  ) => {
    if (status !== window.kakao.maps.services.Status.OK) return;

    const convertedData: TPlace[] = data.map((place) => {
      const converted: TPlace = {
        ...place,
        category_group_code: Array.isArray(place.category_group_code)
          ? (place.category_group_code[0] ?? "")
          : place.category_group_code,
        x: Number(place.x),
        y: Number(place.y),
      };

      placeMapRef.current.set(converted.id, converted);

      return converted;
    });

    const updatedShops = [...accumulatedShops, ...convertedData];

    // 전체 페이지 탐색
    if (isAllPages && pagination.current < pagination.last) {
      searchAllPlaces(pagination.current + 1, updatedShops);
      return;
    }

    // 최종 결과 반영
    setSelectshops(updatedShops);
    displayPlaces(updatedShops);

    if (!isAllPages) {
      setPagination(pagination);
    }
  };

  // 마커 및 바운드 처리
  const displayPlaces = (places: TPlace[]) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    const markers: TMarker[] = [];

    places.forEach((place) => {
      const position = { lat: place.y, lng: place.x };
      markers.push({ position });
      bounds.extend(new window.kakao.maps.LatLng(position.lat, position.lng));
    });

    setMarkers(markers);
    setBounds(bounds);
  };

  const getPlaceById = (placeId: string) => {
    console.log("getPlaceById 호출", placeId);
    return placeMapRef.current.get(placeId);
  };

  return {
    searchPlaces,
    searchAllPlaces,
    pagination,
    selectshops,
    getPlaceById,
    center,
  };
};

export default useKakaoSearch;
