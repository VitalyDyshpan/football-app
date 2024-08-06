import type { RecoverPasswordRequestDto } from "features/Auth/recover-password";

export const recoverPasswordRequest = (data: RecoverPasswordRequestDto) => {
	return useApi("/api/auth/forgot", {
		method: "post",
		body: data,
		immediate: false,
		watch: false
	});
};