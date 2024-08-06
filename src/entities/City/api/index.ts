import type { City } from "../types";

export type GetCitiesQueryParams = {
  search?: string;
  limit: number;
  offset?: number;
};
export const getCities = (queryParams: Ref<GetCitiesQueryParams>) => {
  return useApi<City[]>("/api/city/find", {
    method: "get",
    query: queryParams,
    immediate: false,
    watch: [queryParams],
  });
};
