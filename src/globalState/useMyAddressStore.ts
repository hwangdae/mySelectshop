import { create } from "zustand";

interface MyAddressType {
  myAddress: string;
  setMyAddress: (myAddress: string) => void;
}

export const myAddressStore = create<MyAddressType>((set) => ({
  myAddress: "",
  setMyAddress: (myAddress) => set({ myAddress }),
}));
