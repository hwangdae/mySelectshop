import { TMessage } from "@/types/chat";
import dayjs from "dayjs";

type VirtualItem =
  | { type: "date"; value: string }
  | { type: "message"; value: TMessage };

export const flattenMessagesWithDate = (
  messages: TMessage[]
): VirtualItem[] => {
  const result: VirtualItem[] = [];
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
