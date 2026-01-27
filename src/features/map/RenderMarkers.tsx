import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import Marker from "./Marker";
import { getPaginatedItems } from "@/shared/utils/pagenate";
import useGetFilteredSelectshops from "@/shared/hook/useGetFilteredSelectshops";
import { getReviewBySelectshop } from "@/features/reviewEditor/api";
import { TPlace } from "@/shared/types";
import {
  boundsStore,
  currentPageStore,
  openDetailShopIdStore,
  searchTermStore,
  selectshopsStore,
  shopCoordinatesStore,
} from "@/globalState";
import SelectshopDetail from "../selectshop/detail/SelectshopDetail";

const RenderMarkers = () => {
  const { selectshops } = selectshopsStore();
  const { searchTerm } = searchTermStore();
  const { currentPage } = currentPageStore();
  const { shopCoordinates } = shopCoordinatesStore();
  const { bounds } = boundsStore();
  const pathname = usePathname();
  const { data: userData } = useSession();
  const { openDetailShopId, setOpenDetailShopId } = openDetailShopIdStore();

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: getReviewBySelectshop,
    enabled: !!bounds,
  });

  const { filteredShops, visitedSelectshops, notVisitedSelectshops } =
    useGetFilteredSelectshops(selectshops, reviewData, searchTerm, userData);

  const markerList = () => {
    switch (pathname) {
      case "/nearbySelectshop":
        return filteredShops;
      case "/visitedSelectshop":
        return getPaginatedItems(visitedSelectshops, currentPage);
      case "/notVisiteSelectshop":
        return getPaginatedItems(notVisitedSelectshops, currentPage);
      case "/bestReviewer":
        return shopCoordinates;
      default:
        return [];
    }
  };

  return (
    <>
      {markerList().map((selectshop: TPlace, index: number) => (
        <li
          key={selectshop.id}
          onClick={() => {
            setOpenDetailShopId(selectshop.id);
          }}
          style={{ listStyle: "none" }}
        >
          <Marker key={selectshop.id} selectshop={selectshop} index={index} />
          {pathname !== "/bestReviewer" &&
            openDetailShopId === selectshop.id && (
              <SelectshopDetail selectshop={selectshop} />
            )}
        </li>
      ))}
    </>
  );
};

export default RenderMarkers;
