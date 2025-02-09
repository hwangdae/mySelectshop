import { MyLocationType } from "@/types/placeType";
import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";

interface PropsType {
  center: { lat: number; lng: number };
}

const MyLocationMaker = ({ center }: PropsType) => {
  return (
    <MapMarker
      position={center}
      image={{
        src: "/images/MyLocation.png",
        size: {
          width: 60,
          height: 60,
        },
      }}
    />
  );
};

export default MyLocationMaker;
