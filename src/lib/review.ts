import { NewReviewType } from "@/types/reviewType";
import axios from "axios";

export const getReview = async () => {
  const res = await axios.get("/api/review");
  return res.data;
};

export const writeReview = async (review: NewReviewType) => {
  return await axios.post("/api/review", review);
};

export const updateReview = async (review: NewReviewType) => {
  return await axios.patch("/api/review", review);
};

export const getReviewCount = async (userId: string | undefined) => {
  const res = await axios.get(`/api/review/reviewCount?userId=${userId}`);
  return res.data;
};

export const getReviewsBySelectshop = async (id: string) => {
  const res = await axios.get(`/api/review?selectshopId=${id}`);
  return res.data;
};

export const deleteReview = async (id: string, userId :string | undefined) => {
  await axios.delete(
    `/api/review?selectshopId=${id}&userId=${userId}`
  );
};
