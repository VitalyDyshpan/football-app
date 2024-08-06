<template>
	<div
		class="check-code-wrap"
	>
		<v-form-item
			:error="checkCodeErrorMessage"
			error-position="center"
		>
			<v-input-otp
				v-model="codeValue"
				integer-only
				data-test="input_of_otpCode"
				@completed="checkCodeExecute"
			/>
		</v-form-item>
		<prime-button
			size="large"
			:disabled="!!countValue"
			:loading="props.pending"
			data-test="button_of_refreshOtpCode"
			@click="refreshCode"
		>
			<span class="text-white font-bold">{{ $t("requestAgain") }} <template v-if="countValue">({{leaveTimeValue}})</template></span>
		</prime-button>
	</div>
</template>

<script setup lang="ts">
import { VFormItem, VInputOtp } from "shared/ui/common";
import type { CheckCodeRequestDto } from "../types";
import { checkCodeRequest } from "../api";

const props = defineProps<{
	subject: string
	checkCodeUrl?: string
	refreshCallback?: () => Promise<void> | void
	pending?: boolean
}>();

const emit = defineEmits<{
	(event: "success", value: CheckCodeRequestDto): void
}>();

const codeValue = ref<string>("");

const checkCodeData = computed<CheckCodeRequestDto>(() => {
	return {
		subject: props.subject,
		code: codeValue.value
	};
});

const { status, execute, error } = await checkCodeRequest(checkCodeData, props.checkCodeUrl);
const checkCodeErrorMessage = ref<string>("");

const checkCodeExecute = async (): Promise<void> => {
	checkCodeErrorMessage.value = "";
  await execute();
	switch (status.value) {
		case "success": {
			emit("success", checkCodeData.value);
			break;
		}
		case "error": {
			checkCodeErrorMessage.value = error.value?.data?.message ?? "Error";
			break;
		}
	}
};

const { leaveTimeValue, resetCountDown, countValue } = useCountdown();

const refreshCode = async (): Promise<void> => {
  if (props.refreshCallback) {
		await props.refreshCallback();
		resetCountDown();
	}
};
</script>

<style scoped>
.check-code-wrap {
	@apply flex flex-col gap-8;
}
</style>