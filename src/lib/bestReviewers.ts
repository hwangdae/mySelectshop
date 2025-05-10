import axios from "axios";

export const getBestReviewers = async () => {
  const res = await axios.get("/api/bestReviewers");
  return res.data;
};

export const getTopReviewUsers = async (selectshopIds: string[]) => {
  const res = await axios.post("/api/bestReviewers/userList", { selectshopIds });
  return res.data;
};

export const getReviews = async (userId:string) => {
  const res = await axios.get(`/api/bestReviewers/reviews?userId=${userId}`)
  return res.data
}
