import type { LoginRequestDto, LoginResponseDto } from "../types";

export const login = (data: LoginRequestDto) => {
  return useApi<LoginResponseDto>("/api/auth/login", {
    method: "post",
    body: data,
    immediate: false,
    watch: false,
  });
};
