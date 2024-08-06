import type { FormInstance, ValidationSchemaType } from "shared/ui/common";
import type { NewPasswordModelType } from "features/Auth/recover-password";
import { z } from "zod";
import { recoverPasswordRequest } from "features/Auth/recover-password/api";

export const useRecoverPassword = async (): Promise<{
	newPasswordForm: Ref<FormInstance | undefined>
	newPasswordModel: NewPasswordModelType
	newPasswordRules: ComputedRef<ValidationSchemaType<NewPasswordModelType>>
	newPasswordFormSubmit: (formEl: FormInstance | undefined) => Promise<void>
	pending: Ref<boolean>
}>  => {
	const toast = useToast();
	const { t } = useI18n();
	const localePath = useLocalePath();
	const newPasswordForm = ref<FormInstance>();
	const newPasswordModel = reactive<NewPasswordModelType>({
		password: "",
		password_confirmation: "",
		phone: "",
		code: ""
	});

	const newPasswordRules = computed<ValidationSchemaType<NewPasswordModelType>>(() => ({
		password: z.string({
			required_error: t("requiredField")
		}).min(6, t("moreThenNCharacters", 6)),
		password_confirmation: z.string({
			required_error: t("requiredField")
		}).regex(new RegExp(newPasswordModel.password), t("passwordsMustMatch")).min(6, t("moreThenNCharacters", 6))
	}));

	const { status, pending, execute, error } = await recoverPasswordRequest(newPasswordModel);
	const newPasswordFormSubmit = async (formEl: FormInstance | undefined): Promise<void> => {
		if (!formEl) return;
		await formEl.validate(async (valid: boolean | undefined): Promise<void> => {
			if (valid) {
				await execute();
				switch (status.value) {
					case "success": {
						toast.add({
							severity: "success",
							detail: "Success",
							life: 1000
						});
						await navigateTo(localePath("/auth"));
						break;
					}
					case "error": {
						toast.add({
							severity: "error",
							detail: error.value?.data?.message ?? t("error"),
							life: 1000
						});
					}
				}
			}
		});
	};
	return {
		newPasswordForm,
		newPasswordFormSubmit,
		newPasswordModel,
		newPasswordRules,
		pending
	};
};