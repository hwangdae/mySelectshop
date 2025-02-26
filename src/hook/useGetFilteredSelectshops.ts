import { PlaceType } from "@/types/placeType";
import { ReviewType } from "@/types/reviewType";
import { Session } from "next-auth";

const matchesSearchTerm = (selectshop: PlaceType, searchTerm: string) => {
  return selectshop.place_name.includes(searchTerm);
};

const useGetFilteredSelectshops = (
  selectshops: PlaceType[],
  reviewData: ReviewType[],
  searchTerm: string,
  userData: Session | null
) => {
  const filteredShops = selectshops.filter((selectshop) =>
    matchesSearchTerm(selectshop, searchTerm)
  );

  const visitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      reviewData?.some((review: ReviewType) => {
        const isSameSelectshopId = review.selectshopId === selectshop.id;
        const isSameUserId = review.userId === userData?.user?.id;
        return isSameSelectshopId && isSameUserId;
      }) && matchesSearchTerm(selectshop, searchTerm)
  );

  const notVisitedSelectshops = selectshops?.filter(
    (selectshop: PlaceType) =>
      !reviewData?.some((review: ReviewType) => {
        const isSameSelectshopId = review.selectshopId === selectshop.id;
        const isSameUserId = review.userId === userData?.user?.id;
        return isSameSelectshopId && isSameUserId;
      }) && matchesSearchTerm(selectshop, searchTerm)
  );

  return { filteredShops, visitedSelectshops, notVisitedSelectshops };
};

export default useGetFilteredSelectshops;
