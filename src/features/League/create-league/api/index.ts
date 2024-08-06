import type { MaybeRef } from "vue";
import type { CreateLeagueModelType, CreateLeagueResponseDto } from "../types";
import type { FormResponseErrorType } from "~/composables/api";

export const createLeagueRequest = (data: MaybeRef<CreateLeagueModelType>) => {
	return useApi<CreateLeagueResponseDto, FormResponseErrorType<CreateLeagueModelType>>("/api/organization/store", {
		method: "post",
		immediate: false,
		watch: false,
		body: data
	});
};