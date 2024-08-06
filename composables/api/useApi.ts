import {
  type AsyncData,
  refreshCookie,
  useCookie,
  useFetch,
  type UseFetchOptions,
} from "nuxt/app";
import type { ResponseDto, ResponseErrorType } from "./types";
import { navigateTo } from "#app";
import type { KeysOf, PickFrom } from "#app/composables/asyncData";
import type { FetchError } from "ofetch";

export const useApi = <
  ResponseT,
  ErrorT = ResponseErrorType,
  MappedResponseT = ResponseT,
>(
  url: (() => string) | string,
  options?: UseFetchOptions<ResponseDto<ResponseT>, MappedResponseT>,
  withToken: boolean = true,
  showSuccessMessage: boolean = true,
  showError: boolean = false
) => {
  const token = useCookie<string | null>("token");
  // const { locale } = useI18n();
  const nuxtApp = useNuxtApp();
  const { decrypt } = useEncryption();
  const result: AsyncData<
    PickFrom<MappedResponseT, KeysOf<MappedResponseT>> | null,
    FetchError<ErrorT> | null
  > = useFetch(url, {
    transform: (input: ResponseDto<ResponseT>): MappedResponseT =>
      input.data as unknown as MappedResponseT,
    ...options,
    onRequest: async ({ options }): Promise<void> => {
      const decryptTokenPayload = await decrypt<{ token: string }>(
        token.value ?? ""
      );
      if (withToken) {
        options.headers = {
          ...options.headers,
          authorization: `Bearer ${decryptTokenPayload?.token}`,
          accept: "application/json",
          "content-type": "application/json",
          "Accept-Language": nuxtApp.$i18n.locale.value,
        };
      } else {
        options.headers = {
          ...options.headers,
          accept: "application/json",
          "content-type": "application/json",
          "Accept-Language": nuxtApp.$i18n.locale.value,
        };
      }
    },
    onResponse: ({ response }) => {
      if (
        showSuccessMessage &&
        response.ok &&
        (response._data.message !== "OK" && response._data.message !== true) &&
        import.meta.client
      ) {
        nuxtApp.$toast.add({
          severity: "success",
          detail: response._data.message,
          life: 3000,
        });
      }
    },
    async onResponseError({ response }): Promise<void> {
      const responseErrorMessage = response._data?.messageError?.error;
      const nativeMessages: Record<number, string> = {
        401: nuxtApp.$i18n.t("authorizationError"),
        404: nuxtApp.$i18n.t("theRequestedObjectWasNotFound"),
        500: nuxtApp.$i18n.t("serverError"),
      };
      const responseError = {
        message: nativeMessages[response.status],
      };

      const unknownError = nuxtApp.$i18n.t("unknownError");

      if (typeof responseError.message === "undefined") {
        if (responseErrorMessage) responseError.message = responseErrorMessage;
        else responseError.message = unknownError + `: ${response.status}`;
      }

      if (showError && import.meta.client) {
        nuxtApp.$toast.add({
          severity: "error",
          summary: nuxtApp.$i18n.t("error"),
          detail: responseError.message,
          life: 3000,
        });
      }

      if (response.status === 401) {
        token.value = null;
        refreshCookie("token");
        await navigateTo("/auth");
      }
    },
  });
  result.pending.value = false;
  return result;
};
