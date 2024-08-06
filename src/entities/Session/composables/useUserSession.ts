export const useUserSession = (): {
	createSession: (token: string | undefined, remember?: boolean) => Promise<void>
} => {
  const { encrypt } = useEncryption();
	const sessionExpiresAt = ref<{ maxAge?: number }>({});
	const createSession = async (token: string | undefined, remember: boolean = false): Promise<void> => {
		if (!token) return;
		if (remember) {
			sessionExpiresAt.value.maxAge = 14 * 24 * 3600;
		}
		const sessionToken = useCookie("token", sessionExpiresAt.value);
		sessionToken.value = await encrypt<{ token: string }>({ token });
		refreshCookie("token");
	};

	return {
		createSession
	};
};