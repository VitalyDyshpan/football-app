<template>
	<v-float-label
		:html-id="htmlId"
		:label="props.label"
	>
		<prime-auto-complete
			v-bind="props.autoCompleteProps"
			:id="htmlId"
			v-model="modelValue"
			:invalid="unref(formItemContext?.isErrorField) ?? props.autoCompleteProps?.invalid"
			:data-test="props.dataTest"
			@hide="onBlur"
			@update:model-value="onInput"
			@complete="emit('complete', $event.query)"
		/>
	</v-float-label>
</template>

<script setup lang="ts" generic="T = unknown">
import { VFloatLabel } from "../FloatLabel";
import { useId } from "#imports";
import { inject } from "vue";
import { formItemContextKey } from "shared/ui/common/config";
import type { FormItemContextType } from "shared/ui/common/Form";
import type { AutoCompleteProps } from "primevue/autocomplete";

const props = defineProps<{
	label?: string
	autoCompleteProps?: AutoCompleteProps
	dataTest?: string
	validateTrigger?: "input" | "blur"
}>();

const emit = defineEmits<{
	(event: "complete", value: string ): void
}>();

const modelValue = defineModel<T>();
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
</script>