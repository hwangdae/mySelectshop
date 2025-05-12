import axios from "axios";

export const getBestReviewersByRegion = async (region: string) => {
  const res = await axios.get(`/api/bestReviewers?region=${region}`);
  return res.data;
};

export const getReviewsByUserId = async (userId: string, pageParam: number) => {
  const res = await axios.get(
    `/api/bestReviewers/reviews?userId=${userId}&pageParam=${pageParam}`
  );
  return res.data;
};
