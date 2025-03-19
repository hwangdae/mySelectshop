import axios from "axios";

export const getUserDetails = async (userId: string | undefined) => {
  const res = await axios.get(`/api/register?userId=${userId}`);
  return res.data;
};
