import { boundsStore } from "@/globalState";
import { useEffect } from "react";

const useInitializeMapState = (y: number, x: number) => {
  if (!y || !x) return;
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
      const bounds = new kakao.maps.LatLngBounds();
      const position = new kakao.maps.LatLng(y, x);
      bounds.extend(position);
      setBounds(bounds);
    }
  }, [setBounds, x, y]);
};

export default useInitializeMapState;
