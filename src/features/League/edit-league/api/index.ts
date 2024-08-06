import type { MaybeRef } from "vue";
import type { EditLeagueRequestDto } from "../types";
import type { League } from "entities/League";

export const editLeague = (leagueId: MaybeRef<number>, data: MaybeRef<EditLeagueRequestDto>) => {
	return useApi<League>(() => `/api/organization/${leagueId}/update`, {
		method: "put",
		body: data,
		immediate: false,
		watch: false
	}, true, true, true);
};