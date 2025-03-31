import { create } from "zustand";

interface ReceiverType {
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  setReceiver: ({
    receiverId,
    receiverName,
    receiverImage,
  }: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

export const receiverStore = create<ReceiverType>((set) => ({
  receiver: {
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  },
  setReceiver: ({ receiverId, receiverName, receiverImage }) =>
    set({
      receiver: { receiverId, receiverName, receiverImage },
    }),
}));
