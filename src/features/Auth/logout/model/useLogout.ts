import { logoutRequest } from "../api";
export const useLogout = async (confirmDialogGroup: string = "logout"): Promise<{
	logout: () => Promise<void>
	logoutWithConfirm: () => void
}> => {
	const { t } = useI18n();
	const toast = useToast();
	const token = useCookie("token");
	const localePath = useLocalePath();
	const confirm = useConfirm();

	const { execute } = await logoutRequest();

	const logout = async (): Promise<void> => {
		await execute();
		token.value = null;
		refreshCookie("token");
		toast.add({
			severity: "success",
			detail: t("logout_successfulAccountLogout"),
			life: 1000
		});
		await navigateTo(localePath("/auth"));
	};

	const logoutWithConfirm = (): void => {
		if (!confirmDialogGroup) return;
		confirm.require({
			group: confirmDialogGroup,
			header: t("logout_logoutOfYourAccount"),
			message: t("logout_doYouReallyWantToGetOut"),
			acceptLabel: t("logout_logout"),
			rejectLabel: t("logout_cancel"),
			accept() {
				logout();
			},
		});
	};

	return {
		logout,
		logoutWithConfirm
	};
};