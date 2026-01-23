import { TNewReview } from "@/shared/types";
import axios from "axios";

export const getReviewBySelectshop = async () => {
  const res = await axios.get("/api/review");
  return res.data;
};

export const writeReview = async (review: TNewReview) => {
  return await axios.post("/api/review", review);
};

export const updateReview = async (review: TNewReview) => {
  return await axios.patch("/api/review", review);
};

export const deleteReview = async (id: string, userId: string | undefined) => {
  await axios.delete(`/api/review?selectshopId=${id}&userId=${userId}`);
};

export const getReviewCount = async (userId: string | undefined) => {
  const res = await axios.get(`/api/review/reviewCount?userId=${userId}`);
  return res.data;
};

export const getPaginatedReviewsByShop = async (
  selectshopId: string,
  pageParam: number
) => {
  const res = await axios.get(
    `/api/review/paginatedReviewsByShop?selectshopId=${selectshopId}&pageParam=${pageParam}`
  );
  return res.data;
};
export const getReviewCountByShop = async (selectshopId: string) => {
  const res = await axios.get(
    `/api/review/reviewCountByShop?selectshopId=${selectshopId}`
  );
  return res.data;
};
export const getMyReview = async (
  selectshopId: string,
  userId: string | undefined
) => {
  const res = await axios.get(
    `/api/review/myReview?selectshopId=${selectshopId}&userId=${userId}`
  );
  return res.data;
};
