import type { ComputedRef, MaybeRef } from "vue";
import type { SelectedFile } from "shared/ui/common/InputFile";
import type { UpdateLeagueAvatarDto } from "../types";
import { updateLeagueAvatarRequest } from "../api";
import type { CallbackType } from "shared/types";
import { useLeaguesStore } from "entities/League";

export const useUpdateLeagueAvatar = (leagueId: MaybeRef<number | undefined | null>, newAvatar: MaybeRef<SelectedFile | undefined>): {
	newAvatarData: ComputedRef<UpdateLeagueAvatarDto | undefined>
	updatingLeagueAvatar: () => Promise<{
		updateLeagueAvatar: (successCallback?: CallbackType, errorCallback?: CallbackType) => Promise<void>
	}>
} => {
	const newAvatarData = computed<UpdateLeagueAvatarDto | undefined>(() => {
		if (unref(newAvatar)) {
			return {
				file: [
					{
						base64: unref(newAvatar)?.base64 ?? "",
						name: unref(newAvatar)?.file.name ?? ""
					}
				]
			};
		} else {
			return undefined;
		}
	});
	const leaguesStore = useLeaguesStore();

	const updatingLeagueAvatar = async (): Promise<{
		updateLeagueAvatar: (successCallback?: CallbackType, errorCallback?: CallbackType) => Promise<void>
	}> => {
		const { execute, status, data, error } = await updateLeagueAvatarRequest(leagueId, newAvatarData);
		const updateLeagueAvatar = async (successCallback?: CallbackType, errorCallback?: CallbackType): Promise<void> => {
			await execute();
			switch (status.value) {
				case "success": {
					if (data.value) {
						const changeableLeagueIndex = leaguesStore.personalLeagues.value.findIndex(league => league.id === unref(leagueId));
						if (changeableLeagueIndex !== -1) {
							leaguesStore.personalLeagues.value[changeableLeagueIndex].avatar = { ...data.value };
						}
					}
					if (successCallback) {
						successCallback();
					}
					break;
				}
				case "error": {
					if (errorCallback) {
						errorCallback();
					}
					break;
				}
			}
		};
		return {
			updateLeagueAvatar
		};
	};

	return {
		updatingLeagueAvatar,
		newAvatarData
	};
};