<template>
	<div class="flex justify-end">
		<div
			class="flex flex-col gap-8 w-full"
		>
			<nuxt-link-locale
				to="/auth"
				class="text-base/[18px] font-bold text-secondary transition-all hover:opacity-80"
				data-test="link_of_authPage"
			>
				<i class="pi pi-arrow-left" />
				{{ $t('back') }}
			</nuxt-link-locale>
			<register-form />
		</div>
	</div>
</template>

<script setup lang="ts">
import { RegisterForm } from "widgets/Auth/register-form";

definePageMeta({
	layout: "auth-layout",
	middleware: ["only-unauthorized"]
});
</script>

<style scoped>

</style>