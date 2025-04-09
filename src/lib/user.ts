import { TProfile } from "@/types";
import axios from "axios";

export const getUserList = async () => {
  const res = await axios.get("/api/user/list");
  return res.data;
};

export const profileUpdate = async (updateProfileData: TProfile) => {
  await axios.patch("/api/user/profile", updateProfileData);
};
