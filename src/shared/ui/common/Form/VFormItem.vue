<template>
	<div
		class="relative mb-4"
	>
		<slot
			:is-error="isErrorField"
			:validate="validateField"
		/>
		<p
			v-if="hint"
			class="mt-1 text-xs font-medium text-additional"
		>
			{{ hint }}
		</p>
		<transition
			name="error-transition"
		>
			<p
				v-if="inputErrorMessage"
				:class="[
					'overflow-hidden text-xs font-medium absolute top-full text-error',
					errorPositionClass
				]"
			>
				{{ inputErrorMessage }}
			</p>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, provide } from "vue";
import { formContextKey, formItemContextKey } from "../config";
import type { z, ZodIssue } from "zod";
import type { FormContextType, FormItemContextType } from "shared/ui/common";

const props = defineProps<{
	error?: string
	hint?: string
	prop?: string
	errorPosition?: "left" | "center" | "right"
}>();

const parentFormItemContext = inject<FormContextType | undefined>(formContextKey, void 0);

const inputErrorMessage = computed<string>(() => {
	if (props.error) {
		return props.error;
	} else {
		return unref(parentFormItemContext?.validationErrors)?.find(el => el.path[0] === props.prop)?.message ?? "";
	}
});

const isErrorField = computed<boolean>(() => {
	return !!inputErrorMessage.value;
});

const errorPositionClass = computed<string>(() => {
	switch (props.errorPosition) {
		case "left":
		default:{
			return "left-0";
		}
		case "right": {
      return "right-0";
		}
		case "center": {
      return "left-1/2 -translate-x-1/2";
		}
	}
});

const fieldValidateRule = computed<z.ZodType<unknown, z.ZodTypeDef, unknown> | undefined>(() => {
	return unref(parentFormItemContext?.formValidationSchema)?.shape[props.prop ?? ""];
});

const validateField = async (): Promise<void> => {
	if (parentFormItemContext && parentFormItemContext.model && props.prop) {
		const unwrappedModel = unref(parentFormItemContext.model);
		if (unwrappedModel) {
			const validateResult = await unref(fieldValidateRule)?.spa(unwrappedModel[props.prop] === "" || unwrappedModel[props.prop] === undefined || unwrappedModel[props.prop] === null ? undefined : unwrappedModel[props.prop]);
			if (!validateResult?.success) {
				const mappedValidateError = ref<ZodIssue[]>();
				validateResult?.error?.issues ? mappedValidateError.value = validateResult?.error?.issues.map(error => ({ ...error, path: [props?.prop ?? ""] })) : undefined;
				parentFormItemContext.setValidationError(mappedValidateError.value);
			} else {
				parentFormItemContext.removeValidationError(props.prop);
			}
		}
	}
};

const formItemContext = reactive<FormItemContextType>({
	isErrorField,
	validateField,
});

provide(formItemContextKey, formItemContext);
</script>

<style scoped>
.error-transition-enter-from,
.error-transition-leave-to {
	@apply opacity-0 -translate-y-2;
}
.error-transition-enter-active,
.error-transition-leave-active {
	@apply transition-all;
}
</style>