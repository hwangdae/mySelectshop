import { TProfileData } from "@/shared/types";
import axios from "axios";

export const profileUpdate = async (updateProfileData: TProfileData) => {
  await axios.patch("/api/user/profile", updateProfileData);
};