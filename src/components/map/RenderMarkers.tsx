import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import Marker from "./Marker";
import { getPaginatedItems } from "@/utils/pagenate";
import useGetFilteredSelectshops from "@/hook/useGetFilteredSelectshops";
import { getReview } from "@/lib/review";
import { TPlace } from "@/types";
import {
  boundsStore,
  currentPageStore,
  openDetailShopIdStore,
  searchTermStore,
  selectshopsStore,
  shopCoordinatesStore,
} from "@/globalState";
import SelectshopDetail from "../selectshop/common/SelectshopDetail";

const RenderMarkers = () => {
  const { selectshops } = selectshopsStore();
  const { searchTerm } = searchTermStore();
  const { currentPage } = currentPageStore();
  const { shopCoordinates } = shopCoordinatesStore();
  const { bounds } = boundsStore();
  const pathname = usePathname();
  const { data: userData } = useSession();
  const { openDetailShopId, setOpenDetailShopId } = openDetailShopIdStore();
  const { data: reviewData = [] } = useQuery({
    queryKey: ["review"],
    queryFn: getReview,
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
