<template>
	<v-form
		ref="formInst"
		:model="authModel"
		:rules="schema"
		@keyup.enter="submitAuthForm"
	>
		<v-form-item
			prop="login"
			:error="authErrorMessage"
		>
			<v-input-text
				v-model="authModel.login"
				:label="$t('login')"
				data-test="input_of_login"
			/>
		</v-form-item>
		<v-form-item
			prop="password"
			:error="authErrorMessage"
		>
			<v-input-password
				v-model="authModel.password"
				:label="$t('password')"
				data-test="input_of_password"
			/>
		</v-form-item>
		<div
			class="slot-wrap"
		>
			<div
				class="form-buttons"
			>
				<v-checkbox
					v-model="rememberMe"
					:checkbox-props="{
						binary: true
					}"
					:label="$t('rememberMe')"
					data-test="checkbox_of_rememberMe"
				/>
				<prime-button
					:label="$t('enter')"
					data-test="button_of_login"
					size="large"
					@click="submitAuthForm"
				/>
			</div>
			<slot
				name="additional"
			/>
		</div>
	</v-form>
</template>

<script setup lang="ts">
import { VCheckbox, VForm, VFormItem, VInputPassword, VInputText } from "shared/ui/common";
import type { FormInstance, ValidationSchemaType } from "shared/ui/common/Form";
import type { LoginRequestDto } from "../types";
import { z } from "zod";
import { login } from "../api";
import { useUserSession } from "entities/Session";

const { t } = useI18n();
const localePath = useLocalePath();
const { createSession } = useUserSession();
const authModel = reactive<LoginRequestDto>({
	login: "",
	password: ""
});
const rememberMe = ref<boolean>(false);

const formInst = ref<FormInstance>();
const authErrorMessage = ref<string>("");

const schema = reactive<ValidationSchemaType<LoginRequestDto>>({
	login: z.string({
		required_error: t("requiredField")
	}),
	password: z.string({
		required_error: t("requiredField")
	}).min(6, t("minLenSixSymbols"))
});

const { data: response, error, execute, status } = await login(authModel);

const submitAuthForm = async (): Promise<void> => {
	if (!formInst.value) return;
	authErrorMessage.value = "";
	await formInst.value.validate(async (valid: boolean | undefined): Promise<void> => {
		if (valid) {
			await execute();
			switch (status.value) {
				case "success": {
					await createSession(response.value?.token, rememberMe.value);
					await navigateTo(localePath("/"));
					break;
				}
				case "error": {
					authErrorMessage.value = error.value?.data?.message ?? "Error";
					break;
				}
			}
		}
	});
};
</script>

<style scoped>
.slot-wrap {
	@apply mt-8 flex gap-4 justify-between;
}
.form-buttons {
	@apply flex flex-col gap-8 w-full;
}
</style>