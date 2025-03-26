import { create } from "zustand";

interface ShowFollowListType {
  showFollowListToggle: boolean;
  setShowFollowListToggle: (showFollowList: boolean) => void;
}

export const showFollowListStore = create<ShowFollowListType>((set) => ({
  showFollowListToggle: false,
  setShowFollowListToggle: (state) => set({ showFollowListToggle: state }),
}));
