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
		<league-detail
			:league-id="+route.params.league"
		/>
		<nuxt-page
			:league-id="route.params.league"
		/>
	</div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import { LeagueDetail } from "widgets/Leagues/league-detail";

definePageMeta({
	redirect(to) {
		return `${to.path}/tournaments`;
	},
	validate: async (route) => {
		// Check if the id is made up of digits
		return typeof route.params.league === "string" && /^\d+$/.test(route.params.league);
	}
});

const route = useRoute();
</script>

<style scoped>

</style>