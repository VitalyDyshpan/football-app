<template>
	<v-float-label
		:html-id="htmlId"
		:label="props.label"
	>
		<prime-textarea
			v-bind="props"
			:id="htmlId"
			v-model="modelValue"
			:invalid="unref(formItemContext?.isErrorField) ?? props.invalid"
			:data-test="props.dataTest"
		/>
	</v-float-label>
</template>

<script setup lang="ts">
import { type FormItemContextType, VFloatLabel } from "shared/ui/common";
import { formItemContextKey } from "shared/ui/common/config";
import type { TextareaProps } from "primevue/textarea";
import { inject } from "vue";

interface VTextareaProps extends /* @vue-ignore */ TextareaProps {
	label?: string
	dataTest?: string
	validateTrigger?: "input" | "blur"
}

const props = defineProps<VTextareaProps>();
const modelValue = defineModel<string>();
const htmlId = useId();
const formItemContext = inject<FormItemContextType | undefined>(formItemContextKey, void 0);
</script>

<style scoped>

</style>