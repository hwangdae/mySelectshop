import { PlaceType } from "@/types/placeType";
import { ReviewType } from "@/types/reviewType";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  currentPageStore,
  searchTermStore,
  selectshopsStore,
  shopCoordinatesStore,
} from "@/globalState/zustand";
import axios from "axios";
import { useSession } from "next-auth/react";
import MarkerContainer from "./MarkerContainer";
import { getPaginatedItems } from "@/utils/pagenate";
import useGetFilteredSelectshops from "@/hook/useGetFilteredSelectshops";
import { getReview } from "@/lib/review";

const RenderMarkers = () => {
  const { selectshops } = selectshopsStore();
  const { searchTerm } = searchTermStore();
  const { currentPage } = currentPageStore();
  const { shopCoordinates } = shopCoordinatesStore();
  const pathname = usePathname();
  const { data: userData } = useSession();

  const { data: reviewData } = useQuery({
    queryKey: ["allReview"],
    queryFn: getReview
  });

  const { filteredShops, visitedSelectshops, notVisitedSelectshops } =
    useGetFilteredSelectshops(selectshops, reviewData, searchTerm, userData);

  const renderContent = () => {
    if (pathname === "/nearbySelectshop") {
      return filteredShops;
    } else if (pathname === "/visitedSelectshop") {
      return getPaginatedItems(visitedSelectshops, currentPage);
    } else if (pathname === "/notVisiteSelectshop") {
      return getPaginatedItems(notVisitedSelectshops, currentPage);
    } else if (pathname === "/bestReviewer") {
      return shopCoordinates;
    } else {
      return [];
    }
  };

  return (
    <>
      {renderContent().map((selectshop: any, index: number) => (
        <MarkerContainer
          key={selectshop.id}
          selectshop={selectshop}
          index={index}
        />
      ))}
    </>
  );
};

export default RenderMarkers;
