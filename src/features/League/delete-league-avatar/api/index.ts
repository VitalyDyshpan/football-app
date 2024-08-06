import type { MaybeRef } from "vue";

export const deleteLeagueAvatar = (leagueId: MaybeRef<number>) => {
	return useApi(() => `/api/organization/avatar/${unref(leagueId)}/delete`, {
		method: "delete",
		immediate: false,
		watch: false
	}, true, true, true);
};