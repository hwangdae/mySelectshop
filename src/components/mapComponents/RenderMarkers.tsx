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

const RenderMarkers = () => {
  const { selectshops } = selectshopsStore();
  const { searchTerm } = searchTermStore();
  const { currentPage } = currentPageStore();
  const { shopCoordinates } = shopCoordinatesStore();
  const pathname = usePathname();
  const { data: userData } = useSession();
  console.log(shopCoordinates);

  const { data: reviewData } = useQuery({
    queryKey: ["Allreview"],
    queryFn: async () => {
      const res = await axios.get("/api/review");
      return res.data;
    },
  });

  const filteredShops = selectshops.filter((selectshop) =>
    selectshop.place_name.includes(searchTerm)
  );

  const visitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      reviewData?.some(
        (review: ReviewType) =>
          review.selectshopId === selectshop.id &&
          review.userId === userData?.user?.id
      ) && selectshop.place_name.includes(searchTerm)
  );

  const notVisitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      !reviewData?.some(
        (review: ReviewType) =>
          review.selectshopId === selectshop.id &&
          review.userId === userData?.user?.id
      ) && selectshop.place_name.includes(searchTerm)
  );

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
