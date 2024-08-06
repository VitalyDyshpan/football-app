import type { CheckCodeRequestDto } from "../types";
export const checkCodeRequest = (
  data: CheckCodeRequestDto | Ref<CheckCodeRequestDto>,
  requestUrl?: string
) => {
  return useApi(() => requestUrl ?? "/api/auth/code/confirm", {
    method: "post",
    body: data,
    immediate: false,
    watch: false,
  });
};
