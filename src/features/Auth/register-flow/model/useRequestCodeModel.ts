import type { FormInstance, ValidationSchemaType } from "shared/ui/common";
import type { GetCodeForRegistrationModelType } from "features/Auth/register-flow/types";
import { z } from "zod";
import { useGetCodeModel } from "features/@abstract/get-code";
import type { ComputedRef, MaybeRef } from "vue";
import type { CallbackType } from "shared/types";

export const useRequestCodeModel = async (type: MaybeRef<"email" | "phone">): Promise<{
	getCodeSubjectErrorMessage: Ref<string>
	getCodeRequestPending: Ref<boolean>
	getCodeForRegistrationFormSubmit: (formEl: FormInstance | undefined, successCallback?: CallbackType) => Promise<void>
	getCodeForRegistrationRules: ComputedRef<ValidationSchemaType<GetCodeForRegistrationModelType>>
	getCodeForRegistrationForm: Ref<FormInstance | undefined>
	getCodeForRegistrationModel: GetCodeForRegistrationModelType
	getCodeRequestExecute: (successCallback?: CallbackType | null, errorCallback?: CallbackType | null) => Promise<void>
	maskedPhone: ComputedRef<string | undefined>
}> => {
	const { t } = useI18n();

	const getCodeForRegistrationForm = ref<FormInstance>();
	const getCodeForRegistrationModel = reactive<GetCodeForRegistrationModelType>({
		subject: "",
		agreeProcessing: false,
		agreeConfidencePolicy: false
	});

	const getCodeForRegistrationRules = computed<ValidationSchemaType<GetCodeForRegistrationModelType>>(() =>{
		switch (unref(type)) {
			case "phone": {
				return {
					subject: z.string({
						required_error: t("requiredField")
					}).regex(/^\d{10}$/, t("enterCorrectPhone")),
					agreeProcessing: z.boolean({
						required_error: t("requiredField")
					}),
					agreeConfidencePolicy: z.boolean({
						required_error: t("requiredField")
					})
				};
			}
			case "email": {
				return {
					subject: z.string({
						required_error: t("requiredField")
					}).email(t("enterCorrectEmail")),
					agreeProcessing: z.boolean({
						required_error: t("requiredField")
					}),
					agreeConfidencePolicy: z.boolean({
						required_error: t("requiredField")
					})
				};
			}
		}
	});

	const { contactSubject, getCodeSubjectErrorMessage, getCodeRequestExecute, getCodeRequestPending, maskedPhone } = await useGetCodeModel("dont_exist", type);
	const getCodeForRegistrationFormSubmit = async (formEl: FormInstance | undefined, successCallback?: CallbackType): Promise<void> => {
		if (!formEl) return;
		await formEl.validate(async (valid: boolean | undefined): Promise<void> => {
			if (valid) {
				contactSubject.subject = getCodeForRegistrationModel.subject;
				await getCodeRequestExecute(successCallback);
			}
		});
	};

	return {
		getCodeSubjectErrorMessage,
		getCodeRequestPending,
		getCodeForRegistrationFormSubmit,
		getCodeForRegistrationRules,
		getCodeForRegistrationForm,
		getCodeForRegistrationModel,
		getCodeRequestExecute,
		maskedPhone
	};
};