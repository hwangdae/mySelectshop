import { create } from "zustand";

interface CurrentPageType {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

export const currentPageStore = create<CurrentPageType>((set) => ({
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
}));
