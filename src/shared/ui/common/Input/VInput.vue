<template>
	<v-float-label
		:html-id="htmlId"
		:label="props.label"
		:padding-left="props.labelPaddingLeft"
		:required="props.required"
	>
		<prime-input-text
			v-bind="props.inputProps"
			:id="htmlId"
			v-model="modelValue"
			:invalid="unref(formItemContext?.isErrorField) ?? props.inputProps?.invalid"
			:data-test="props.dataTest"
			@blur="onBlur"
			@update:model-value="onInput"
			@focus="onFocus"
		/>
	</v-float-label>
</template>

<script setup lang="ts">
import type { InputTextProps } from "primevue/inputtext";
import { VFloatLabel } from "../FloatLabel";
import { useId } from "#imports";
import { inject } from "vue";
import { formItemContextKey } from "shared/ui/common/config";
import type { FormItemContextType } from "shared/ui/common/Form";

const emit = defineEmits(["focus"]);

const props = defineProps<{
	label?: string
	inputProps?: InputTextProps
	labelPaddingLeft?: string
	dataTest: string
	validateTrigger?: "input" | "blur"
	required?: boolean
}>();

const modelValue = defineModel<string>();
const htmlId = useId();

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

const onFocus = () => emit("focus");
</script>

<style scoped>

</style>