import { boundsStore } from "@/globalState";
import React, { useEffect } from "react";

const useInitializeMapState = (y?: number, x?: number) => {
  const { setBounds } = boundsStore();
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services &&
      y &&
      x
    ) {
      let bounds = new kakao.maps.LatLngBounds();
      let position = new kakao.maps.LatLng(y, x);
      bounds.extend(position);
      setBounds(bounds);
    }
  }, [setBounds, x, y]);
};

export default useInitializeMapState;
