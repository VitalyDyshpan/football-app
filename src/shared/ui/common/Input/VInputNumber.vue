<template>
	<v-float-label
		:html-id="htmlId"
		:label="props.label"
		:required="props.required"
	>
		<prime-input-number
			v-bind="props.inputProps"
			:id="htmlId"
			v-model="modelValue"
			:invalid="unref(formItemContext?.isErrorField) ?? props.inputProps?.invalid"
			:data-test="props.dataTest"
			@blur="onBlur"
			@input="onInput"
		/>
	</v-float-label>
</template>

<script setup lang="ts">
import type { InputNumberInputEvent, InputNumberProps } from "primevue/inputnumber";
import { VFloatLabel } from "../FloatLabel";
import { useId } from "#imports";
import { inject } from "vue";
import { formItemContextKey } from "shared/ui/common/config";
import type { FormItemContextType } from "shared/ui/common/Form";

const props = defineProps<{
	label?: string
	inputProps?: InputNumberProps
	dataTest: string
	validateTrigger?: "input" | "blur",
	required?: boolean
}>();

const modelValue = defineModel<number | null>();
const htmlId = useId();

const formItemContext = inject<FormItemContextType | undefined>(formItemContextKey, void 0);

const onBlur = () => {
	if (props.validateTrigger === "blur") {
		formItemContext?.validateField();
	}
};

const onInput = (event: InputNumberInputEvent): void => {
	modelValue.value = event.value as number;
	if (props.validateTrigger === "input") {
		formItemContext?.validateField();
	}
};
</script>

<style scoped>

</style>