<template>
	<template
		v-if="registerStep === 1"
	>
		<div
			class="flex flex-col gap-8"
		>
			<p
				class="text-text text-sm font-medium text-center"
			>
				{{ $t("enterPhoneNumber") }}
			</p>
			<v-form
				ref="getCodeForRegistrationForm"
				:model="getCodeForRegistrationModel"
				:rules="getCodeForRegistrationRules"
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
							:error="getCodeSubjectErrorMessage"
						>
							<prime-input-text
								v-model="getCodeForRegistrationModel.subject"
								placeholder="E-mail"
								data-test="input_of_email"
							/>
						</v-form-item>
					</prime-tab-panel>
					<prime-tab-panel
						:header="$t('phone')"
						data-test="tab_of_phone"
					>
						<v-form-item
							prop="subject"
							:error="getCodeSubjectErrorMessage"
						>
							<prime-input-mask
								v-model="getCodeForRegistrationModel.subject"
								mask="+7 999 999-99-99"
								placeholder="+7 ___ ___-__-__"
								unmask
								data-test="input_of_phone"
							/>
						</v-form-item>
					</prime-tab-panel>
				</prime-tab-view>
				<v-form-item
					prop="agreeProcessing"
				>
					<v-checkbox
						v-model="getCodeForRegistrationModel.agreeProcessing"
						:checkbox-props="{
							binary: true
						}"
						data-test="checkbox_of_agreeProcessing"
					>
						<span class="text-xs">{{ $t("IGiveMyConsentTo") }} <a
							href="/politics/data_processing_consent.pdf"
							class="text-additional transition hover:opacity-80"
							target="_blank">{{ $t("processingOfPersonalData") }}</a></span>
					</v-checkbox>
				</v-form-item>
				<v-form-item
					prop="agreeConfidencePolicy"
					class="mb-8"
				>
					<v-checkbox
						v-model="getCodeForRegistrationModel.agreeConfidencePolicy"
						:checkbox-props="{
							binary: true
						}"
						data-test="checkbox_of_agreeConfidencePolicy"
					>
						<span class="text-xs">{{ $t("IHaveReadAndAgreeToTheTerms") }} <a
							href="/politics/privacy_policy.pdf"
							class="text-additional transition hover:opacity-80"
							target="_blank">{{ $t("privacyPolicies") }}</a></span>
					</v-checkbox>
				</v-form-item>
				<prime-button
					:label="$t('send')"
					:loading="getCodeRequestPending"
					data-test="button_of_getCodeMessage"
					size="large"
					@click="getCodeForRegistrationFormSubmit(getCodeForRegistrationForm, onCodeGotSuccessfully)"
				/>
			</v-form>
		</div>
	</template>
	<template
		v-if="registerStep === 2"
	>
		<div
			class="flex flex-col gap-8"
		>
			<p class="text-center text-sm text-text font-medium">
				{{ $t("weSentTheCodeToTheNumber") }} {{ maskedPhone }}
			</p>
			<check-code
				:subject="getCodeForRegistrationModel.subject"
				:refresh-callback="getCodeRequestExecute"
				:pending="getCodeRequestPending"
				@success="onCodeChecked"
			/>
		</div>
	</template>
	<template
		v-if="registerStep === 3"
	>
		<v-form
			ref="registerForm"
			:model="registerModel"
			:rules="registerRules"
			@submit.prevent
		>
			<v-form-item
				prop="last_name"
			>
				<v-input-text
					v-model="registerModel.last_name"
					:label="$t('lastName')"
					:input-props="{
						autocomplete: 'off',
						name: 'lastname'
					}"
					data-test="input_of_lastname"
				/>
			</v-form-item>
			<v-form-item
				prop="first_name"
			>
				<v-input-text
					v-model="registerModel.first_name"
					:label="$t('firstName')"
					:input-props="{
						autocomplete: 'off',
						name: 'firstname'
					}"
					data-test="input_of_firstname"
				/>
			</v-form-item>
			<v-form-item
				prop="middle_name"
			>
				<v-input-text
					v-model="registerModel.middle_name"
					:label="$t('middleName')"
					:input-props="{
						autocomplete: 'off',
						name: 'middlename'
					}"
					data-test="input_of_middleName"
				/>
			</v-form-item>
			<v-form-item
				prop="password"
			>
				<v-input-password
					v-model="registerModel.password"
					:label="$t('password')"
					:input-props="{
						autocomplete: 'off',
						name: 'password'
					}"
					data-test="input_of_password"
				/>
			</v-form-item>
			<v-form-item
				prop="password_confirmation"
				class="mb-8"
			>
				<v-input-password
					v-model="registerModel.password_confirmation"
					:label="$t('confirmPassword')"
					:input-props="{
						autocomplete: 'off',
						name: 'confirmPassword'
					}"
					data-test="input_of_confirmPassword"
				/>
			</v-form-item>
			<prime-button
				:label="$t('completeRegistration')"
				size="large"
				:loading="sendRegisterRequestPending"
				data-test="button_of_completeRegistration"
				@click="submitRegisterForm(registerForm)"
			/>
		</v-form>
	</template>
</template>

<script setup lang="ts">
import { VCheckbox, VForm, VFormItem, VInputPassword, VInputText } from "shared/ui/common";
import { useRequestCodeModel, useRegisterModel } from "../model";
import { CheckCode, type CheckCodeRequestDto } from "features/@abstract/check-code";

const registerStep = ref<1 | 2 | 3>(1);

const emit = defineEmits<{
	(event: "code-sent" | "code-checked"): void
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

const {
	getCodeRequestPending,
	getCodeForRegistrationRules,
	getCodeForRegistrationForm,
	getCodeForRegistrationFormSubmit,
	getCodeSubjectErrorMessage,
	getCodeForRegistrationModel,
	getCodeRequestExecute,
	maskedPhone
} = await useRequestCodeModel(activeTabName);
const onCodeGotSuccessfully = (): void => {
	emit("code-sent");
	registerStep.value = 2;
};

const { registerForm, sendRegisterRequestPending, submitRegisterForm, registerRules, registerModel } = await useRegisterModel();
const onCodeChecked = ({ code, subject }: CheckCodeRequestDto): void => {
	emit("code-checked");
	registerStep.value = 3;
	registerModel.code = code;
	if (activeTabName.value === "email") {
		registerModel.email = subject;
	} else {
		registerModel.phone = subject;
	}
};

const onTabChange = () => {
	getCodeForRegistrationModel.subject = "";
	if (getCodeForRegistrationForm.value) {
		getCodeForRegistrationForm.value?.resetValidation();
	}
};
</script>

<style scoped>

</style>