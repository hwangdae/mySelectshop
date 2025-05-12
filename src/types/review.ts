import { TPlace } from "./map";

export interface TReview {
  id: string;
  reviewImages: string | null;
  description: string;
  advantages: string[] | null;
  disAdvantages: string[] | null;
  tags: string | null;
  userId: string;
  selectshopId: string;
  region: string;
}

export interface TReviewWithShopInfo extends TReview {
  shopInfo?: TPlace;
}

export interface TReviewFormData {
  id?: string;
  reviewImages: string | null;
  description: string;
  advantages: { value: string }[] | null;
  disAdvantages: { value: string }[] | null;
  tags: string | null;
  userId: string;
  selectshopId: string;
  test: string;
}

export interface TNewReview {
  id?: string;
  selectshopId: string | undefined;
  region: string | undefined;
  reviewImages: string | null | undefined;
  description: string;
  advantages: string[] | null | undefined;
  disAdvantages: string[] | null | undefined;
  tags: string | null;
  userId: string | undefined;
}
