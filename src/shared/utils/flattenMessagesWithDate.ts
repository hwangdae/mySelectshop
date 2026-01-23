import { TMessage } from "@/features/chat/types";
import dayjs from "dayjs";

export type MessageItem =
  | { type: "date"; value: string }
  | { type: "message"; value: TMessage };

export const flattenMessagesWithDate = (
  messages: TMessage[]
): MessageItem[] => {
  const result: MessageItem[] = [];
  let lastDate = "";

  messages.forEach((message) => {
    const currentDate = dayjs(message.createAt).format("YYYY-MM-DD");
    if (currentDate !== lastDate) {
      result.push({ type: "date", value: currentDate });
      lastDate = currentDate;
    }
    result.push({ type: "message", value: message });
  });

  return result;
};
