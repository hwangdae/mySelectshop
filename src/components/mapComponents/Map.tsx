"use client";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import RenderMarkers from "./RenderMarkers";
import MyLocationMaker from "./MyLocationMaker";
import { boundsStore, myLocationStore } from "@/globalState/zustand";

const MapComponent = () => {
  const [map, setMap] = useState<any>();
  const { center, setCenter,isLoading, setIsLoading } = myLocationStore();
  const { bounds } = boundsStore();

  useEffect(() => {
    if (map && bounds) {
      map.setBounds(bounds);
    }
  }, [map, bounds]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              setCenter(lat, lng);
              setIsLoading(false);
            },
            (error) => console.error("Geolocation error:", error.message)
          );
        }
      });
    }
  }, []);

  return (
    <Map
      id="map"
      center={{ lat: center.lat, lng: center.lng }}
      style={{ width: "100%", height: "100%" }}
      onCreate={setMap}
    >
      <RenderMarkers />
      {!isLoading && <MyLocationMaker center={center} />}
    </Map>
  );
};

export default MapComponent;
