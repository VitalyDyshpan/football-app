<template>
	<prime-confirm-dialog
		v-bind="props"
		:pt="confirmDialogPt"
		:pt-options="{
			mergeProps: true
		}"
		dismissable-mask
	>
		<template
			v-if="$slots.message"
			#message="{ message }"
		>
			<slot
				name="message"
				:message="message"
			/>
		</template>
	</prime-confirm-dialog>
</template>

<script setup lang="ts">
import { confirmDialogPt } from "./config";
import type { ConfirmDialogProps } from "primevue/confirmdialog";

interface VConfirmDialogProps extends ConfirmDialogProps {
	rejectDataTest: string
	acceptDataTest: string
	closeDataTest: string
}

const props = defineProps<VConfirmDialogProps>();
</script>