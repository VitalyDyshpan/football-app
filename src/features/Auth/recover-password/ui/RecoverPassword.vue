<template>
	<div
		v-if="step === 1"
		class="wrap"
	>
		<p
			class="text-text text-sm font-medium text-center"
		>
			{{ $t("chooseAConvenientWayToRecoverYourPassword") }}
		</p>
		<get-code
			:get-code-error="getCodeSubjectErrorMessage"
			:pending="getCodeRequestPending"
			@filling="onFilling($event, onCodeSent)"
		/>
	</div>
	<div
		v-else-if="step === 2"
		class="wrap"
	>
		<template
			v-if="getCodeQueries.type === 'email'"
		>
			<div>
				<p class="text-center text-sm text-text font-medium">
					{{ $t("weHaveSentTheCodeToYourEmail") }}
				</p>
				<p class="text-center text-sm text-text font-medium">
					{{ contactSubject.subject }}
				</p>
				<p class="text-center text-sm text-text font-medium">
					({{ $t("makeSureThatTheEmailIsNotInTheSpamFolder") }})
				</p>
			</div>
		</template>
		<template
			v-else
		>
			<p class="text-center text-sm text-text font-medium">
				{{ $t("weSentTheCodeToTheNumber") }} {{ maskedPhone }}
			</p>
		</template>
		<check-code
			:subject="contactSubject.subject"
			:refresh-callback="getCodeRequestExecute"
			:pending="getCodeRequestPending"
			@success="onSuccessCodeCheck"
		/>
	</div>
	<template
		v-else-if="step === 3"
	>
		<div
			class="wrap"
		>
			<p
				class="text-center text-text text-sm font-medium"
			>
				{{ $t("enterNewPassword") }}
			</p>
			<v-form
				ref="newPasswordForm"
				:model="newPasswordModel"
				:rules="newPasswordRules"
			>
				<v-form-item
					prop="password"
				>
					<v-input-password
						v-model="newPasswordModel.password"
						:label="$t('password')"
						data-test="input-of_newPassword"
					/>
				</v-form-item>
				<v-form-item
					prop="password_confirmation"
				>
					<v-input-password
						v-model="newPasswordModel.password_confirmation"
						:label="$t('repeatThePassword')"
						data-test="input-of_newPasswordConfirmation"
					/>
				</v-form-item>
				<prime-button
					size="large"
					:label="$t('send')"
					class="new-password-button"
					:loading="recoverPasswordPending"
					data-test="button_of_sendNewPassword"
					@click="newPasswordFormSubmit(newPasswordForm)"
				/>
			</v-form>
		</div>
	</template>
</template>

<script setup lang="ts">
import { GetCode, useGetCodeModel } from "features/@abstract/get-code";
import { CheckCode, type CheckCodeRequestDto } from "features/@abstract/check-code";
import { VForm, VFormItem, VInputPassword } from "shared/ui/common";
import { useRecoverPassword } from "../model";

const emit = defineEmits<{
	(event: "code-sent" | "code-checked"): void
}>();

const step = ref<1 | 2 | 3>(1);
const {
	getCodeRequestPending,
	getCodeRequestExecute,
	getCodeSubjectErrorMessage,
	onFilling,
	contactSubject,
	getCodeQueries,
	maskedPhone
} = await useGetCodeModel();

const { newPasswordRules, newPasswordForm, newPasswordFormSubmit, newPasswordModel, pending: recoverPasswordPending } = await useRecoverPassword();

const onCodeSent = (): void => {
	step.value = 2;
	emit("code-sent");
};

const onSuccessCodeCheck = ({ code, subject }: CheckCodeRequestDto) => {
	step.value = 3;
	emit("code-checked");
	newPasswordModel.code = code;
	newPasswordModel.phone = subject;
};
</script>

<style scoped>
.wrap {
	@apply flex flex-col gap-8;
}

.new-password-button {
	@apply mt-8;
}
</style>