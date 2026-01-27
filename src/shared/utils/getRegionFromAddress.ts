import { normalizeAddress } from "./normalizeAddress";

export const getRegionFromAddress = (myAddress: string) => {
  if (!myAddress) return "";
  const parts = myAddress.split(" ");
  const city = parts[0];
  const district = parts[1] ?? "";
  return normalizeAddress(city) + district;
};
