import { TReview } from "./review";

export interface TUser {
  id: string;
  created_at: string;
  email: string;
  name: string;
  image: string;
  filteredReviewCount?: number;
  reviews?: TReview[];
}
