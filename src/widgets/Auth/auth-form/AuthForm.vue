<template>
	<section
		class="px-6 py-10 border border-solid border-stroke rounded-28 max-w-[576px] w-full"
	>
		<header
			class="mb-8"
		>
			<h3
				class="text-center text-xxl text-text font-bold"
			>
				{{ $t('loginOrRegister') }}
			</h3>
		</header>
		<login-flow>
			<template
				#additional
			>
				<div
					class="flex flex-col items-end gap-8 w-full"
				>
					<nuxt-link-locale
						to="/reset-password"
						data-test="link_of_resetPassword"
					>
						<prime-button
							:label="$t('forgotPassword')"
							text
							size="large"
							severity="info"
							class="py-0.5 px-1.5"
						/>
					</nuxt-link-locale>
					<nuxt-link-locale
						to="/register"
						class="w-full"
						data-test="link_of_register"
					>
						<prime-button
							:label="$t('register')"
							outlined
							size="large"
						/>
					</nuxt-link-locale>
				</div>
			</template>
		</login-flow>
	</section>
</template>

<script setup lang="ts">
import { LoginFlow } from "features/Auth/login-flow";
</script>

<style scoped>

</style>