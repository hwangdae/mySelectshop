import { create } from "zustand";

interface MyLocationType {
  center: { lat: number; lng: number };
  setCenter: (lat: number, lng: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface BoundsType {
  bounds: kakao.maps.LatLngBounds | null;
  setBounds: (bounds: kakao.maps.LatLngBounds) => void;
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
