export interface TPlace {
  address_name: string;
  category_group_code: string | undefined;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

export interface TMarker {
  position: {
    lat: number;
    lng: number;
  };
}
export interface TMyLocation {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: null;
  isLoading: boolean;
}

export interface TPagination {
  current: number;
  first: number;
  last: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: (page: number) => void;
  prevPage: (page: number) => void;
}

export interface TShop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}
