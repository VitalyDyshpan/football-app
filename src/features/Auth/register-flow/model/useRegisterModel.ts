import { useUserSession } from "entities/Session";
import type { FormInstance, ValidationSchemaType } from "shared/ui/common";
import type { RegisterModelType } from "features/Auth/register-flow/types";
import { z } from "zod";
import { sendRegisterRequest } from "features/Auth/register-flow/api";
import type { ComputedRef } from "vue";

export const useRegisterModel = async (): Promise<{
	registerForm: Ref<FormInstance | undefined>
	registerModel: RegisterModelType
	registerRules: ComputedRef<ValidationSchemaType<RegisterModelType>>
	sendRegisterRequestExecute: () => Promise<void>
	submitRegisterForm: (formEl: FormInstance | undefined) => Promise<void>
	sendRegisterRequestPending: Ref<boolean>
}> => {
	const { t } = useI18n();
	const toast = useToast();
	const localePath = useLocalePath();
	const { createSession } = useUserSession();

	const registerForm = ref<FormInstance>();

	const registerModel = reactive<RegisterModelType>({
		last_name: undefined,
		middle_name: undefined,
		first_name: undefined,
		password: "",
		password_confirmation: "",
		code: ""
	});

	const registerRules = computed<ValidationSchemaType<RegisterModelType>>(() => {
		return {
			last_name: z.string({
				required_error: t("requiredField")
			}).min(3, t("moreThenNCharacters", 3)),
			first_name: z.string({
				required_error: t("requiredField")
			}).min(2, t("moreThenNCharacters", 2)),
			middle_name: z.string().min(3, t("moreThenNCharacters", 3)).optional(),
			password: z.string({
				required_error: t("requiredField")
			}).min(6, t("moreThenNCharacters", 6)),
			password_confirmation: z.string({
				required_error: t("requiredField")
			}).regex(new RegExp(registerModel.password), t("passwordsMustMatch"))
		};
	});

	const { execute, status, data, pending: sendRegisterRequestPending } = await sendRegisterRequest(registerModel);

	const sendRegisterRequestExecute = async (): Promise<void> => {
		await execute();
		switch (status.value) {
			case "success": {
				await createSession(data.value?.token);
				await navigateTo(localePath("/home/profile"));
				break;
			}
			case "error": {
				toast.add({
					severity: "error",
					detail: t("registrationFailed"),
					life: 1000
				});
				break;
			}
		}
	};
	const submitRegisterForm = async (formEl: FormInstance | undefined): Promise<void> => {
		if (!formEl) return;
		await formEl.validate(async (valid: boolean | undefined): Promise<void> => {
			if (valid) {
				await sendRegisterRequestExecute();
			}
		});
	};

	return {
		registerForm,
		registerModel,
		registerRules,
		sendRegisterRequestExecute,
		submitRegisterForm,
		sendRegisterRequestPending
	};
};