import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import Shop from "@/assets/Shop.svg"

interface PropsType {
  center: { lat: number; lng: number };
}

const MyLocationMaker = ({ center }: PropsType) => {
  return (
    <MapMarker
      position={center}
      image={{
        src: `${<Shop/>}`,
        size: {
          width: 60,
          height: 60,
        },
      }}
    />
  );
};

export default MyLocationMaker;
