<template>
	<div>
		<slot
			:delete="deleteAvatarWithConfirm"
		>
			<prime-button
				:label="$t('deleteLeagueAvatar_delete')"
				severity="danger"
				outlined
				:loading="deleteLeagueAvatarPending"
				:disabled="disableDeleting"
				class="text-xs font-bold h-[36px]"
				@click="deleteAvatarWithConfirm"
			/>
		</slot>
		<v-confirm-dialog
			group="deleteLeagueAvatar"
			append-to="#teleports"
			accept-data-test="button_of_acceptDelete"
			reject-data-test="button_of_rejectDelete"
			close-data-test="button_of_closeDeleteConfirmation"
		/>
	</div>
</template>

<script setup lang="ts">
import { VConfirmDialog } from "shared/ui/common";
import { useDeleteLeagueAvatar } from "../model";
const props = defineProps<{
	leagueId: number
}>();

const { leagueAvatarDeleting, disableDeleting } = useDeleteLeagueAvatar(props.leagueId, "deleteLeagueAvatar");
const { deleteAvatarWithConfirm, pending: deleteLeagueAvatarPending } = await leagueAvatarDeleting();
</script>

<style scoped>

</style>