import { myAddressStore, myLocationStore } from "@/globalState";
import { useEffect } from "react";

interface RegionCodeResult {
  region_type: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  code: string;
}

const useMyAddress = () => {
  const { center } = myLocationStore();
  const { myAddress, setMyAddress } = myAddressStore();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      const geocoder = new kakao.maps.services.Geocoder();

      const updateAddressFromGeocode = function (
        data: RegionCodeResult[],
        status: string
      ) {
        if (status === kakao.maps.services.Status.OK) {
          setMyAddress(data[0].address_name);
        }
      };
      geocoder.coord2RegionCode(
        center.lng,
        center.lat,
        updateAddressFromGeocode
      );
    }
  }, [center]);
  return { myAddress };
};

export default useMyAddress;
