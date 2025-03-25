import { TReview } from "./review";

export interface TBestReviewer {
  id: string;
  image: string;
  name: string;
  reviews: TReview[];
}
