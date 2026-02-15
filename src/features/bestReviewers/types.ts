import { TReview } from "@/shared/types";

export interface TBestReviewer {
  id: string;
  image: string;
  name: string;
  _count: {
    reviews: number;
  };
  reviews: TReview[];
  reviewCount: number;
}
