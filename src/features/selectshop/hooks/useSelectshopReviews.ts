import {
  getMyReview,
  getPaginatedReviewsByShop,
} from "@/features/reviewEditor/api";
import { TReview } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
interface TPaginatedReviewResponse {
  page: number;
  total_pages: number;
  reviews: TReview[];
}
export const useSelectshopReviews = (shopId: string, userId?: string) => {
  const myReviewQuery = useQuery({
    queryKey: ["myReview", shopId],
    queryFn: () => getMyReview(shopId, userId),
    enabled: !!userId,
  });

  const reviewsQuery = useInfiniteQuery<
    TPaginatedReviewResponse,
    Error,
    TReview[]
  >({
    queryKey: ["reviewsBySelectshop", shopId],
    queryFn: ({ pageParam = 1 }) =>
      getPaginatedReviewsByShop(shopId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1 ? lastPage.page + 1 : undefined;
      }
    },
    select: (data) => {
      return data?.pages?.flatMap((page) => page.reviews);
    },
  });
  return {
    myReview: myReviewQuery.data,
    reviews: reviewsQuery.data ?? [],
    ...reviewsQuery,
  };
};
