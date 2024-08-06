import { deleteLeagueAvatar } from "../api";
import { useLeaguesStore, useSingleLeagueStore } from "entities/League";
import type { ComputedRef, MaybeRef, Ref } from "vue";
export const useDeleteLeagueAvatar = (leagueId: MaybeRef<number>, confirmDialogGroup?: string): {
	leagueAvatarDeleting: () => Promise<{
		pending: Ref<boolean>
		deleteAvatar: () => Promise<void>
		deleteAvatarWithConfirm: () => void
	}>
	disableDeleting: ComputedRef<boolean>
} => {
	const { personalLeagues } = useLeaguesStore();
	const { singlePersonalLeague } = useSingleLeagueStore(leagueId);
	const confirm = useConfirm();
	const disableDeleting = computed<boolean>(() => !singlePersonalLeague.value.avatar);

	const leagueAvatarDeleting = async (): Promise<{
		pending: Ref<boolean>
		deleteAvatar: () => Promise<void>
		deleteAvatarWithConfirm: () => void
	}> => {
		const { t } = useI18n();
		const { status, execute, pending } = await deleteLeagueAvatar(leagueId);
		const deleteAvatar = async (): Promise<void> => {
			await execute();
			switch (status.value) {
				case "success": {
					singlePersonalLeague.value.avatar = null;
					const leagueIndexInList: number = personalLeagues.value.findIndex(league => league.id === leagueId);
					if (leagueIndexInList !== -1) {
						personalLeagues.value[leagueIndexInList].avatar = null;
					}
				}
			}
		};
		const deleteAvatarWithConfirm = (): void => {
			if (!confirmDialogGroup) return;
			confirm.require({
				group: confirmDialogGroup,
				header: t("deleteLeagueAvatar_areYouSureYouWantToDeleteTheAvatar"),
				message: t("deleteLeagueAvatar_itWillBeImpossibleToCancelThisAction"),
				acceptLabel: t("deleteLeagueAvatar_delete"),
				rejectLabel: t("deleteLeagueAvatar_cancel"),
				accept: async () => {
					await deleteAvatar();
				}
			});
		};
		return {
			pending, deleteAvatar, deleteAvatarWithConfirm
		};
	};
	return {
		leagueAvatarDeleting,
		disableDeleting
	};
};