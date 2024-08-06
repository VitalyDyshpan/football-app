import type { RegisterModelType } from "../types";

export const sendRegisterRequest = (data: RegisterModelType) => {
  return useApi<{ token: string }>("/api/auth/register", {
    method: "post",
    body: data,
    immediate: false,
    watch: false,
  });
};
