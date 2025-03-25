import { TMarker, TPlace } from "@/types";
import { create } from "zustand";

interface MyLocationType {
  center: { lat: number; lng: number };
  setCenter: (lat: number, lng: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface BoundsType {
  bounds: null;
  setBounds: (bounds: any) => void;
}
interface SearchTermType {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

interface ShowFollowListType {
  showFollowListToggle: boolean;
  setShowFollowListToggle: (showFollowList: boolean) => void;
}

interface MyAddressType {
  myAddress: string;
  setMyAddress: (myAddress: string) => void;
}
interface MarkersType {
  markers: TMarker[];
  setMarkers: (markers: TMarker[]) => void;
}
interface SelectshopsType {
  selectshops: TPlace[];
  setSelectshops: (selectshops: TPlace[]) => void;
}
interface ShopCoordinatesType {
  shopCoordinates: TPlace[];
  setShopCoordinates: (shopCoordinates: TPlace[]) => void;
}
interface CurrentPageType {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}
export const myLocationStore = create<MyLocationType>((set) => ({
  center: {
    lat: 33.450701,
    lng: 126.570667,
  },
  setCenter: (lat, lng) => set((state) => ({ ...state, center: { lat, lng } })),
  isLoading: true,
  setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
}));

export const boundsStore = create<BoundsType>((set) => ({
  bounds: null,
  setBounds: (bounds) => set({ bounds }),
}));

export const searchTermStore = create<SearchTermType>((set) => ({
  searchTerm: "",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));

export const showFollowListStore = create<ShowFollowListType>((set) => ({
  showFollowListToggle: false,
  setShowFollowListToggle: (state) => set({ showFollowListToggle: state }),
}));

export const myAddressStore = create<MyAddressType>((set) => ({
  myAddress: "",
  setMyAddress: (myAddress) => set({ myAddress }),
}));

export const markersStore = create<MarkersType>((set) => ({
  markers: [],
  setMarkers: (markers) => set({ markers }),
}));

export const selectshopsStore = create<SelectshopsType>((set) => ({
  selectshops: [],
  setSelectshops: (selectshops) => set({ selectshops }),
}));

export const shopCoordinatesStore = create<ShopCoordinatesType>((set) => ({
  shopCoordinates: [],
  setShopCoordinates: (shopCoordinates) => set({ shopCoordinates }),
}));

export const currentPageStore = create<CurrentPageType>((set) => ({
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
}));
