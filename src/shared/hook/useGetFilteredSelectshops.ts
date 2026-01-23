import { TPlace, TReview } from "@/shared/types";
import { Session } from "next-auth";

const matchesSearchTerm = (selectshop: TPlace, searchTerm: string) => {
  return selectshop.place_name.includes(searchTerm);
};

const useGetFilteredSelectshops = (
  selectshops: TPlace[],
  reviewData: TReview[],
  searchTerm: string,
  userData: Session | null
) => {
  const filteredShops = selectshops.filter((selectshop) =>
    matchesSearchTerm(selectshop, searchTerm)
  );

  const visitedSelectshops = selectshops?.filter(
    (selectshop: TPlace) =>
      reviewData?.some((review: TReview) => {
        const isSameSelectshopId = review.selectshopId === selectshop.id;
        const isSameUserId = review.userId === userData?.user?.id;
        return isSameSelectshopId && isSameUserId;
      }) && matchesSearchTerm(selectshop, searchTerm)
  );

  const notVisitedSelectshops = selectshops?.filter(
    (selectshop: TPlace) =>
      !reviewData?.some((review: TReview) => {
        const isSameSelectshopId = review.selectshopId === selectshop.id;
        const isSameUserId = review.userId === userData?.user?.id;
        return isSameSelectshopId && isSameUserId;
      }) && matchesSearchTerm(selectshop, searchTerm)
  );

  return { filteredShops, visitedSelectshops, notVisitedSelectshops };
};

export default useGetFilteredSelectshops;
