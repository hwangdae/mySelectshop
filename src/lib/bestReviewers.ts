import axios from "axios";

export const getBestReviewers = async () => {
  const res = await axios.get("/api/bestReviewers");
  return res.data;
};
