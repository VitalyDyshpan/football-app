<template>
	<div class="w-full">
		<slot
			name="trigger"
			:open-file-dialog="openFileDialog"
		>
			<prime-button
				class="edit-button"
				outlined
				:label="$t('changePhoto')"
				:data-test="props.dataTest"
				@click="openFileDialog"
			/>
		</slot>
		<input
			ref="fileInput"
			type="file"
			class="hidden"
			@change="handleFiles"
		>
	</div>
</template>

<script setup lang="ts">
import { convertToBase64 } from "shared/lib";
import type { SelectedFile } from "./types";

const props = defineProps<{
	dataTest?: string
}>();

const modelValue = defineModel<SelectedFile>();

const fileInput = ref<HTMLInputElement | null>(null);
const openFileDialog = () => {
	fileInput.value?.click();
};

const getFirstFileFromEvent = (event: Event): File | null => {
	const input = event.target as HTMLInputElement;
	return input.files?.length ? input.files[0] : null;
};

const handleFiles = async (event: Event): Promise<void> => {
	const file = getFirstFileFromEvent(event);
	if (!file) {
		return;
	}

	try {
		const fileUrl = URL.createObjectURL(file);
		const base64 = await convertToBase64(file);
		modelValue.value = { file, base64, objectUrl: fileUrl };
	} catch (error) {
		console.error(error);
	}
};
</script>

<style scoped>
.edit-button {
	@apply text-xs font-bold h-[36px] w-full;
}
</style>