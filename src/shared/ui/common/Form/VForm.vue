<template>
	<form>
		<slot />
	</form>
</template>

<script setup lang="ts">
import type { FormContextType, ValidationSchemaType } from "./types";
import { computed, type MaybeRef, provide, reactive, ref, unref } from "vue";
import { z, type ZodIssue } from "zod";
import { formContextKey } from "../config";
import _ from "lodash";

const props = defineProps<{
	model?: MaybeRef<Record<string, unknown>>
	rules?: ValidationSchemaType<Record<string, unknown>>
}>();

const initialModel = { ...unref(props.model) };

const validationErrors = ref<ZodIssue[]>();
const formValidationSchema = computed<z.ZodObject<ValidationSchemaType<Record<string, unknown>>> | undefined>(() => {
	if (props.rules) {
		return z.object<ValidationSchemaType<Record<string, unknown>>>(props.rules);
	} else {
		return undefined;
	}
});
const validateFields = async () => {
  if (!props.rules || !props.model) return;
	const normalizedModel: Record<string, unknown> = {};
	for (const key in unref(props.model)) {
		if (unref(props.model)[key] !== "" && unref(props.model)[key] !== null) {
			normalizedModel[key] = unref(props.model)[key];
		}
	}
	return unref(formValidationSchema)?.safeParseAsync(normalizedModel);
};

const validate = async (callback?: (valid?: boolean, errors?: ZodIssue[] | undefined) => unknown) => {
	validationErrors.value = undefined;
	const validationResult = await validateFields();
	if (!validationResult?.success) {
		validationErrors.value = validationResult?.error?.issues;
	}
	if (callback) {
		callback(validationResult?.success, validationResult?.error?.issues);
	}
};

const resetValidation = (): void => {
	validationErrors.value = undefined;
};

const setValidationError = (error: ZodIssue[] | undefined): void => {
	if (error) {
		if (validationErrors.value) {
			!validationErrors.value.some(validationError => validationError.path[0] === error[0].path[0])
				? validationErrors.value = [...validationErrors.value, ...error]
				: validationErrors.value.some(validationError => validationError.path[0] === error[0].path[0] && validationError.code !== error[0].code)
					? validationErrors.value = [...validationErrors.value.filter(err => err.path[0] !== error[0].path[0]), ...error]
					: null;
		} else {
			validationErrors.value = [...error];
		}
	}
};

const resetFields = async (): Promise<void> => {
	const model = props.model;
	if (!model) {
		return;
	} else {
		const computedModel = computed({
			get: () => model,
			set: (val) => Object.assign(model, val)
		});
		computedModel.value = _.clone(initialModel);
		await nextTick();
		resetValidation();
	}
};
const removeValidationError = (prop: string): void => {
	if (validationErrors.value) {
		validationErrors.value = validationErrors.value.filter(error => error.path[0] !== prop);
	}
};

provide(formContextKey, reactive<FormContextType>({
	model: toRef(props.model),
	rules: toRef(props.rules),
	validationErrors,
	formValidationSchema,
	setValidationError,
	removeValidationError
}));

defineExpose({
	validate,
	resetValidation,
	resetFields
});
</script>

<style scoped>

</style>