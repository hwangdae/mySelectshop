import { registerLoginSchema, registerSignUpSchema } from "@/validators/auth";
import { z } from "zod";
import { ReviewType } from "./reviewType";

export interface AuthType {
  email: string;
  password: string;
  checkPassword: string;
  name: string;
}

export interface UserType {
  id :string;
  created_at : string;
  email :string;
  name : string;
  image : string;
  filteredReviewCount ? : number
  reviews ? : ReviewType[]
}

export interface updateProfileType {
  profileImage: string | undefined;
  name: string;
}

export type RegisterLoginInput = z.infer<typeof registerLoginSchema>;

export type RegisterSignUpInput = z.infer<typeof registerSignUpSchema>;
