<template>
	<v-float-label
		:html-id="htmlId"
		:label="props.label"
	>
		<prime-input-mask
			v-bind="{ ...props.inputProps }"
			:id="htmlId"
			v-model="modelValue"
			:invalid="unref(formItemContext?.isErrorField) ?? props.inputProps?.invalid"
			:mask="props.mask"
			:data-test="props.dataTest"
			@update:model-value="onInput"
			@blur="onBlur"
		/>
	</v-float-label>
</template>

<script setup lang="ts">
import { VFloatLabel } from "../FloatLabel";
import { useId } from "#imports";
import type { InputMaskProps } from "primevue/inputmask";
import { inject } from "vue";
import { formItemContextKey } from "shared/ui/common/config";
import type { FormItemContextType } from "shared/ui/common";
const props = defineProps<{
	label?: string
	inputProps?: InputMaskProps
	mask: string
	dataTest: string
	validateTrigger?: "input" | "blur"
}>();

const htmlId = useId();
const modelValue = defineModel<string>();
const formItemContext = inject<FormItemContextType | undefined>(formItemContextKey, void 0);

const onBlur = () => {
	if (props.validateTrigger === "blur") {
		formItemContext?.validateField();
	}
};

const onInput = () => {
	if (props.validateTrigger === "input") {
		formItemContext?.validateField();
	}
};
</script>

<style scoped>

</style>