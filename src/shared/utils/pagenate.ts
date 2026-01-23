import { TPlace } from "@/shared/types";

export const getPaginatedItems = (items: TPlace[], currentPage: number) => {
  const indexOfLastItem = currentPage * 15;
  const indexOfFirstItem = indexOfLastItem - 15;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  return currentItems;
};
