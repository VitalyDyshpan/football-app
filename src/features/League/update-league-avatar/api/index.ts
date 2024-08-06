import type { MaybeRef } from "vue";
import type { UpdateLeagueAvatarDto, UpdateLeagueAvatarResponseDto } from "../types";

export const updateLeagueAvatarRequest = (organizationId: MaybeRef<number | undefined | null>, file: MaybeRef<UpdateLeagueAvatarDto | undefined>) => {
	return useApi<UpdateLeagueAvatarResponseDto>(() => `/api/organization/avatar/${unref(organizationId)}/set`, {
		method: "post",
		immediate: false,
		watch: false,
		body: file
	}, true, true, true);
};