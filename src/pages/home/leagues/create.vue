<template>
	<div
		class="flex flex-col gap-6"
	>
		<nuxt-link-locale
			to="/home/leagues"
			class="text-base/[18px] font-bold text-secondary transition-all hover:opacity-80"
			data-test="link_of_leagues"
		>
			<i class="pi pi-arrow-left" />
			{{ $t('back') }}
		</nuxt-link-locale>
		<h1
			class="text-text text-xxl font-bold"
		>
			{{ $t("leagueCreation") }}
		</h1>
		<league-creation />
	</div>
</template>

<script setup lang="ts">

import { LeagueCreation } from "widgets/Leagues/leagues-creation";
</script>

<style scoped>

</style>