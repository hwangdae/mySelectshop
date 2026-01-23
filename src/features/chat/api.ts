import { TNewChat } from "@/features/chat/types";
import axios from "axios";

export const getChat = async () => {
  const res = await axios.get(`/api/chat`);
  return res.data;
};

export const postChat = async (newChat: TNewChat) => {
  await axios.post("/api/chat", newChat);
};
