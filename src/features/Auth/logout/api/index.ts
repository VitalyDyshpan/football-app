export const logoutRequest = () => {
	return useApi("/api/profile/user/logout", {
		method: "post",
		immediate: false,
		watch: false
	});
};