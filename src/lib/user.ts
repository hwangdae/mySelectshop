import { TProfileData } from "@/types";
import axios from "axios";

export const getUserList = async () => {
  const res = await axios.get("/api/user/list");
  return res.data;
};

export const profileUpdate = async (updateProfileData: TProfileData) => {
  await axios.patch("/api/user/profile", updateProfileData);
};
