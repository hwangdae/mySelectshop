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
        src: "public/images/myLocation.png",
        size: {
          width: 60,
          height: 60,
        },
      }}
    />
  );
};

export default MyLocationMaker;
