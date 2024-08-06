export default defineNuxtRouteMiddleware(() => {
	const token = useCookie("token");
	const localePath = useLocalePath();
	if (token.value) {
		return navigateTo(localePath("/home/profile"));
	}
});