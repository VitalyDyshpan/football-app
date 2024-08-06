import type { GetCodeModelType, GetCodeQueryParametersType } from "../types";
import type { FormResponseErrorType } from "~/composables/api";

export const getCodeRequest = (
  requestUrl: string,
  requestBody: GetCodeModelType,
  requestQuery: Ref<GetCodeQueryParametersType>
) => {
  return useApi<null, FormResponseErrorType<GetCodeModelType>>(
    () => requestUrl,
    {
      method: "post",
      body: requestBody,
      query: requestQuery,
      immediate: false,
      watch: false,
    }
  );
};
