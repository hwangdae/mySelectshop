import { TPlace } from "@/shared/types";
import { getVisitedPlaceIds } from "../api";

export async function getUnvisitedSelectshops(
  userId: string | undefined,
  lat: number,
  lng: number,
) {
  const RESULT_LIMIT = 15;

  let page = 1;
  const unvisited = [];

  while (unvisited.length < RESULT_LIMIT) {
    // const places: TPlace[] = await fetchKakaoPlaces(page);
    const res = await fetch(
      `http://localhost:3000/api/kakao/category?page=${page}&lat=${lat}&lng=${lng}`,
    );
    const places: TPlace[] = await res.json();
    console.log(
      places,
      "---------------------------------------------------------",
    );
    if (places.length === 0) break;

    const placeIds = places.map((p) => p.id);
    const visitedSet = await getVisitedPlaceIds(placeIds, userId!);

    const filtered = places.filter((place) => !visitedSet.has(place.id));

    unvisited.push(...filtered);

    page += 1;
  }

  return unvisited.slice(0, RESULT_LIMIT);
}
