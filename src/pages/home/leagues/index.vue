<template>
	<div class="w-full flex flex-col gap-4">
		<header class="py-[11px]">
			<h1 class="text-xxl font-bold">{{ $t("myLeagues") }}</h1>
		</header>
		<div
			class="bg-primary rounded-28 p-6 flex bg-[url('/images/logo.png')] bg-no-repeat bg-right bg-contain"
		>
			<div
				class="flex flex-col gap-4 max-w-[375px]"
			>
				<div
					class="flex flex-col gap-2"
				>
					<p
						class="text-lg font-bold text-white"
					>
						{{ $t("createYourLeague") }}
					</p>
					<p
						class="text-base text-white text-medium"
					>
						{{ $t("andOrganizeAFootballTournament") }}
					</p>
				</div>
				<nuxt-link-locale
					to="/home/leagues/create"
				>
					<prime-button
						outlined
						class="py-[11px] px-6 max-w-fit"
					>
						<span class="text-xs/[12px] font-bold text-primary">{{ $t("create") }}</span>
					</prime-button>
				</nuxt-link-locale>
			</div>
		</div>
		<personal-leagues />
	</div>
</template>

<script setup lang="ts">
import { PersonalLeagues } from "widgets/Leagues/personal-leagues";
definePageMeta({
	alias: "/"
})
</script>

<style scoped>

</style>