import { TMessage } from "@/types/chat";
import dayjs from "dayjs";

export const groupMessagesByDate = (messages: TMessage[]) => {
  const grouped = messages.reduce<Record<string, TMessage[]>>(
    (acc, message) => {
      const dateKey = dayjs(message.createAt).format("YYYY-MM-DD");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(message);
      return acc;
    },
    {}
  );
  return grouped;
};
