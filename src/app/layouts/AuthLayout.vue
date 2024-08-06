<template>
	<div
		class="h-full flex flex-col items-center"
	>
		<app-header class="md:mt-3 mb-6" />
		<div class="grow max-w-[1120px] w-full mx-auto py-6 px-[20px]">
			<div class="flex gap-10 justify-between w-full items-center">
				<aside
					class="max-w-[464px] w-full flex flex-col gap-6 items-center"
				>
					<h2 class="text-[32px] font-bold text-text text-center">
						{{ $t("footballInYourPhone") }}
					</h2>
					<p class="text-text text-center text-lg font-medium">
						{{ $t("gentelmenDescription") }}
					</p>
					<div class="flex gap-6">
						<nuxt-link
							to="#"
							target="_blank"
						>
							<img
								src="/images/rustore.png"
								:alt="$t('appStoreIcon')"
							>
						</nuxt-link>
						<nuxt-link
							to="#"
							target="_blank"
						>
							<img
								src="/images/app-store.png"
								:alt="$t('appStoreIcon')"
								class="h-10"
							>
						</nuxt-link>
						<nuxt-link
							to="#"
							target="_blank"
						>
							<img
								src="/images/google-play.png"
								:alt="$t('googlePlayIcon')"
								class="h-10"
							>
						</nuxt-link>
					</div>
				</aside>
				<main
					class="grow"
				>
					<slot />
				</main>
			</div>
		</div>
		<app-footer />
	</div>
</template>

<script setup lang="ts">

import { AppHeader } from "widgets/header";
import { AppFooter } from "widgets/footer";
</script>

<style scoped>

</style>