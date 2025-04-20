import {
  boundsStore,
  markersStore,
  myLocationStore,
  selectshopsStore,
} from "@/globalState";
import { TMarker, TPagination, TPlace } from "@/types";
import { useState } from "react";

const useKakaoSearch = () => {
  const { center } = myLocationStore();
  const { selectshops, setSelectshops } = selectshopsStore();
  const [pagination, setPagination] = useState<TPagination>();
  const { setBounds } = boundsStore();
  const { setMarkers } = markersStore();

  const searchPlaces = (currentPage: number = 1) => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      const ps = new window.kakao.maps.services.Places();
      const keyword = "의류판매";
      const options: kakao.maps.services.PlacesSearchOptions = {
        location: new window.kakao.maps.LatLng(center.lat, center.lng),
        sort: window.kakao.maps.services.SortBy.ACCURACY,
        page: currentPage,
      };
      ps.keywordSearch(
        keyword,
        (data, status, pagination) =>
          placesSearchCB(data, status, pagination, [], false),
        options
      );
    }
  };
 
  const searchAllPlaces = (
    currentPage: number = 1,
    accumulatedShops: TPlace[] = []
  ) => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      const ps = new window.kakao.maps.services.Places();
      const keyword = "의류판매";
      const options: kakao.maps.services.PlacesSearchOptions = {
        location: new window.kakao.maps.LatLng(center.lat, center.lng),
        sort: window.kakao.maps.services.SortBy.ACCURACY,
        page: currentPage,
      };
      ps.keywordSearch(
        keyword,
        (data, status, pagination) =>
          placesSearchCB(data, status, pagination, accumulatedShops, true),
        options
      );
    }
  };

  const placesSearchCB = (
    data: any[],
    status: string,
    pagination: TPagination,
    accumulatedShops: TPlace[] = [],
    isAllPages: boolean = false
  ) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const updatedShops = [...accumulatedShops, ...data];

      if (isAllPages && pagination.current < pagination.last) {
        searchAllPlaces(pagination.current + 1, updatedShops);
      } else {
        setSelectshops(updatedShops);
        displayPlaces(updatedShops);
      }
      if (!isAllPages) {
        setPagination(pagination);
      }
    }
  };

  const displayPlaces = (data:any[]) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    const newMarkers: TMarker[] = [];
    data.forEach((place) => {
      const position = { lat: place.y, lng: place.x };
      newMarkers.push({ position });
      bounds.extend(new window.kakao.maps.LatLng(position.lat, position.lng));
    });
    setMarkers(newMarkers);
    setBounds(bounds);
  };

  return { searchPlaces, searchAllPlaces, pagination, selectshops, center };
};

export default useKakaoSearch;
