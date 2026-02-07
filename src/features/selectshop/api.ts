import axios from "axios";

export const getVisitedPlaceIds = async (
  placeIds: string[],
  userId: string
): Promise<Set<string>> => {
  const res = await axios.get("/api/selectshop/visited", {
    params: {
      placeIds: placeIds.join(","),
      userId,
    },
  });

  // 서버는 string[] 반환 → Set으로 변환
  return new Set(res.data);
};