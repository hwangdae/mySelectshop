import axios from "axios";

export const getUserList = async () => {
  const res = await axios.get("/api/user/list");
  return res.data;
};
