import { create } from "zustand";

interface SearchTermType {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const searchTermStore = create<SearchTermType>((set) => ({
  searchTerm: "",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));
