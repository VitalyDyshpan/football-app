<template>
	<div class="flex flex-col items-center gap-2 set-image-wrap">
		<div class="max-w-[120px] min-w-[120px] h-[120px] rounded-[120px]">
			<v-avatar
				:avatar-props="{
					size: 'xlarge'
				}"
				:path="selectedFile?.objectUrl ?? props.avatarUrl"
			/>
		</div>
		<v-input-file
			v-model="selectedFile"
			data-test="button_of_selectPhoto"
			accept="image/png, image/jpeg"
		/>
	</div>
</template>

<script setup lang="ts">
import { type SelectedFile, VInputFile, VAvatar } from "shared/ui/common";
import { useUpdateLeagueAvatar } from "../model";
import { watch } from "vue";

const props = defineProps<{
	avatarUrl?: string
	immediate?: boolean
	organisationId: number | undefined
}>();

const emit = defineEmits<{
	(event: "selected", value: SelectedFile | undefined): void
}>();

const selectedFile = ref<SelectedFile>();

const { updatingLeagueAvatar } = useUpdateLeagueAvatar(props.organisationId, selectedFile);

const { updateLeagueAvatar } = await updatingLeagueAvatar();
const selectFileHandler = async (): Promise<void> => {
	if (props.immediate) {
		await updateLeagueAvatar();
	} else {
		emit("selected", selectedFile.value);
	}
};

watch(selectedFile, async (newFile: SelectedFile | undefined): Promise<void> => {
	if (newFile) {
		await selectFileHandler();
	}
});
</script>

<style scoped>
.set-image-wrap {
	@apply max-w-[148px] w-full;
}
</style>