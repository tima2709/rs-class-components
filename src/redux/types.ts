export interface Berry {
  name: string;
  url: string;
}

export interface GetBerriesResponse {
  results: Berry[];
}

export interface GetBerriesQueryResult {
  data: GetBerriesResponse | null;
  isLoading: boolean;
  error: boolean | null;
}

export interface GetBerryByIdResponse {
  name: string;
}
