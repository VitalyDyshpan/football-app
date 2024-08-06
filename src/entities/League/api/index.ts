import type { League } from "../types";
import type { MaybeRef } from "vue";

export const getPersonalLeaguesRequest = () => {
  return useApi<League[]>("/api/organization/personal", {
    immediate: false,
    watch: false,
    method: "get",
  });
};

export const getDetailPersonalLeagueRequest = (leagueId: MaybeRef<number>) => {
  return useApi<League>(
    () => `/api/organization/${unref(leagueId)}/detail`,
    {
      immediate: false,
      watch: false,
      method: "get",
    },
    true,
    false
  );
};
