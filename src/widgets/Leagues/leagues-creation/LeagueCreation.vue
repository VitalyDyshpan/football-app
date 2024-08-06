<template>
	<div
		class="border border-solid border-stroke rounded-28 p-6"
	>
		<div
			class="flex gap-6"
		>
			<edit-league-avatar
				:organisation-id="createdLeagueId"
				@selected="onAvatarSelected"
			/>
			<create-league
				@success="onSuccessLeagueCreation"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CreateLeague } from "features/League/create-league";
import { EditLeagueAvatar, useUpdateLeagueAvatar } from "features/League/update-league-avatar";
import type { SelectedFile } from "shared/ui/common/InputFile";

const localePath = useLocalePath();

const createdLeagueId = ref<number>();
const selectedAvatar = ref<SelectedFile>();

const { updatingLeagueAvatar } = useUpdateLeagueAvatar(createdLeagueId, selectedAvatar);
const { updateLeagueAvatar } = await updatingLeagueAvatar();
const onSuccessLeagueCreation = async (id: number | undefined): Promise<void> => {
	createdLeagueId.value = id;
	if (selectedAvatar.value) {
		await updateLeagueAvatar();
	}
	await navigateTo(localePath(`/home/leagues/${createdLeagueId.value}`));
};

const onAvatarSelected = (avatar: SelectedFile | undefined): void => {
	selectedAvatar.value = avatar;
};
</script>

<style scoped>

</style>