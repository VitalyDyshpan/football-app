<template>
	<div>
		<v-form
			ref="formEl"
			:model="getCodeModel"
			:rules="getCodeRules"
			@submit.prevent
		>
			<prime-tab-view
				v-model:active-index="activeTabIndex"
				lazy
				@tab-change="onTabChange"
			>
				<prime-tab-panel
					:header="$t('email')"
					data-test="tab_of_email"
				>
					<v-form-item
						prop="subject"
						:error="props.getCodeError"
					>
						<template
							#default="{ isError }"
						>
							<prime-input-text
								v-model="getCodeModel.subject"
								placeholder="E-mail"
								data-test="input_of_email"
								:invalid="isError"
							/>
						</template>
					</v-form-item>
				</prime-tab-panel>
				<prime-tab-panel
					:header="$t('phone')"
					data-test="tab_of_phone"
				>
					<v-form-item
						prop="subject"
						:error="props.getCodeError"
					>
						<template
							#default="{ isError }"
						>
							<prime-input-mask
								v-model="getCodeModel.subject"
								mask="+7 999 999-99-99"
								placeholder="+7 ___ ___-__-__"
								unmask
								data-test="input_of_phone"
								:invalid="isError"
							/>
						</template>
					</v-form-item>
				</prime-tab-panel>
			</prime-tab-view>
			<prime-button
				:loading="props.pending"
				:label="$t('send')"
				size="large"
				data-test="button_of_getCode"
				@click="submitForm(formEl)"
			/>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, ValidationSchemaType } from "shared/ui/common";
import { VForm, VFormItem } from "shared/ui/common";
import type { GetCodeModelType } from "../types";
import { z } from "zod";

const props = defineProps<{
	pending?: boolean,
	getCodeError?: string
}>();

const { t } = useI18n();

const emit = defineEmits<{
	(event: "filling", value: { type: "email" | "phone", subject: string }): void
}>();

const activeTabName = computed<"email" | "phone">(() => {
	switch (activeTabIndex.value) {
		case 0: {
			return "email";
		}
		case 1: {
			return "phone";
		}
		default: {
			return "email";
		}
	}
});

const activeTabIndex = ref<number>(0);
const formEl = ref<FormInstance>();

const getCodeModel = reactive<GetCodeModelType>({
	subject: ""
});

const getCodeRules = computed<ValidationSchemaType<GetCodeModelType>>(() => {
	if (activeTabName.value === "email") {
		return {
			subject: z.string({
				required_error: t("requiredField")
			}).email({
				message: t("enterCorrectEmail")
			})
		};
	} else {
		return {
			subject: z.string({
				required_error: t("requiredField")
			}).regex(/^\d{10}$/, t("enterCorrectPhone"))
		};
	}
});
const onTabChange = () => {
  getCodeModel.subject = "";
	if (formEl.value) {
		formEl.value?.resetValidation();
	}
};

const submitForm = async (formElement: FormInstance | undefined): Promise<void> => {
  if (!formElement) return;
	await formElement.validate((valid: boolean | undefined): void => {
		if (valid) {
			emit("filling", {
				type: activeTabName.value,
				subject: getCodeModel.subject
			});
		}
	});
};
</script>

<style scoped>

</style>