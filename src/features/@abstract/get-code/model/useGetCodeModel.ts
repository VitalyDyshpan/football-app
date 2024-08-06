import type {
  GetCodeModelType,
  GetCodeQueryParametersType,
} from "../types";
import type { CallbackType } from "shared/types";
import { getCodeRequest } from "../api";
import type { ComputedRef, MaybeRef } from "vue";

export const useGetCodeModel = async (
  rule: "exist" | "dont_exist" = "exist",
  type: MaybeRef<"phone" | "email" | null> = null,
  url: string = "/api/auth/code/send"
): Promise<{
  getCodeSubjectErrorMessage: Ref<string>;
  isCodeSent: Ref<boolean>;
  getCodeRequestPending: Ref<boolean>;
  getCodeRequestExecute: (
    successCallback?: CallbackType | null,
    errorCallback?: CallbackType | null
  ) => Promise<void>;
  contactSubject: GetCodeModelType;
  onFilling: (
    arg: { type: "email" | "phone"; subject: string },
    successCallback?: CallbackType | null,
    errorCallback?: CallbackType | null
  ) => Promise<void>;
  getCodeQueries: Ref<GetCodeQueryParametersType>;
  maskedPhone: ComputedRef<string | undefined>;
}> => {
  const getCodeQueries = computed<GetCodeQueryParametersType>(() => ({
    rule: rule,
    type: unref(type),
  }));
  const contactSubject = reactive<GetCodeModelType>({
    subject: "",
  });

  const maskedPhone = computed<string | undefined>(() => {
    if (type === "phone" && contactSubject.subject.length) {
      if (contactSubject.subject.length <= 3) {
        return `+7 (${contactSubject.subject})`;
      }
      if (
        contactSubject.subject.length > 3 &&
        contactSubject.subject.length <= 6
      ) {
        return `+7 (${contactSubject.subject.slice(0, 3)}) ${contactSubject.subject.slice(3)}`;
      }
      if (
        contactSubject.subject.length > 6 &&
        contactSubject.subject.length <= 8
      ) {
        return `+7 (${contactSubject.subject.slice(0, 3)}) ${contactSubject.subject.slice(3, 6)}-${contactSubject.subject.slice(6)}`;
      }
      if (contactSubject.subject.length > 8 && contactSubject.subject.length) {
        return `+7 (${contactSubject.subject.slice(0, 3)}) ${contactSubject.subject.slice(3, 6)}-${contactSubject.subject.slice(6, 8)}-${contactSubject.subject.slice(8)}`;
      }
    }
  });

  const getCodeSubjectErrorMessage = ref<string>("");
  const isCodeSent = ref<boolean>(false);
  const {
    execute: getCodeExecute,
    status: getCoderRequestStatus,
    pending: getCodeRequestPending,
    error: getCodeRequestError,
  } = await getCodeRequest(url, contactSubject, getCodeQueries);
  const getCodeRequestExecute = async (
    successCallback?: CallbackType | null,
    errorCallback?: CallbackType | null
  ): Promise<void> => {
    getCodeSubjectErrorMessage.value = "";
    await getCodeExecute();
    switch (getCoderRequestStatus.value) {
      case "success": {
        isCodeSent.value = true;
        if (successCallback) {
          successCallback();
        }
        break;
      }
      case "error": {
        getCodeSubjectErrorMessage.value =
          getCodeRequestError.value?.data?.errors?.subject?.toString() ??
          "Error";
        if (errorCallback) {
          errorCallback();
        }
        break;
      }
    }
  };

  const onFilling = async (
    { type, subject }: { type: "email" | "phone"; subject: string },
    successCallback?: CallbackType | null,
    errorCallback?: CallbackType | null
  ): Promise<void> => {
    getCodeQueries.value.type = type;
    contactSubject.subject = subject;
    await getCodeRequestExecute(successCallback, errorCallback);
  };

  return {
    getCodeSubjectErrorMessage,
    isCodeSent,
    getCodeRequestPending,
    getCodeRequestExecute,
    contactSubject,
    onFilling,
    getCodeQueries,
    maskedPhone,
  };
};
