<template>
	<v-float-label
		:html-id="htmlId"
		:label="props.label"
	>
		<prime-password
			v-model="modelValue"
			v-bind="props.inputProps"
			:feedback="false"
			:input-id="htmlId"
			append-to="#teleports"
			toggle-mask
			:invalid="unref(formItemContext?.isErrorField) ?? props.inputProps?.invalid"
			:data-test="props.dataTest"
			@update:model-value="onInput"
			@blur="onBlur"
		>
			<template
				#showicon="{
					toggleCallback
				}">
				<icon-eye
					class="absolute right-4 top-1/2 -translate-y-1/2 text-additional"
					@click="toggleCallback"
				/>
			</template>
			<template #hideicon="{toggleCallback}">
				<icon-eye-close
					class="absolute right-4 top-1/2 -translate-y-1/2 text-additional"
					@click="toggleCallback"
				/>
			</template>
		</prime-password>
	</v-float-label>
</template>

<script setup lang="ts">
import { VFloatLabel } from "../FloatLabel";
import { useId } from "#imports";
import type { PasswordProps } from "primevue/password";
import { IconEye, IconEyeClose } from "shared/ui/icons";
import { inject } from "vue";
import { formItemContextKey } from "shared/ui/common/config";
import type { FormItemContextType } from "shared/ui/common";

const props = defineProps<{
	label?: string,
	inputProps?: PasswordProps
	dataTest?: string
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