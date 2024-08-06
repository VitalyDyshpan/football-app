<template>
	<slot
		:logout="logout"
		:logout-with-confirm="logoutWithConfirm"
	>
		<prime-button
			:label="$t('exit')"
			size="large"
			class="max-w-[188px]"
			:data-test="props.triggerDataTest"
			@click="logoutWithConfirm"
		/>
	</slot>
	<v-confirm-dialog
		:group="props.group ?? 'logout'"
		append-to="#teleports"
		:accept-data-test="props.acceptDataTest"
		:reject-data-test="props.rejectDataTest"
		:close-data-test="props.closeDataTest"
	/>
</template>

<script setup lang="ts">
import { VConfirmDialog } from "shared/ui/common";
import { useLogout } from "../model";

const props = defineProps<{
	acceptDataTest: string
	rejectDataTest: string
	closeDataTest: string
	triggerDataTest?: string
	group?: string
}>();

const { logoutWithConfirm, logout } = await useLogout(props.group);
</script>

<style scoped>

</style>