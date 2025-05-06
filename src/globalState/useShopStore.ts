import { TMarker, TPlace } from "@/types";
import { create } from "zustand";

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

interface OpenDetailShopIdType {
  openDetailShopId: string | null;
  setOpenDetailShopId: (openDetailShopId: string | null) => void;
}

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

export const openDetailShopIdStore = create<OpenDetailShopIdType>((set) => ({
  openDetailShopId: null,
  setOpenDetailShopId: (state) => set({ openDetailShopId: state }),
}));
