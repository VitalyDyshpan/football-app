<template>
	<div
		class="w-full"
	>
		<nuxt-link-locale
			:to="`/home/leagues/${leagueId}`"
			class="text-base/[18px] font-bold text-secondary transition-all hover:opacity-80"
			data-test="link_of_profile"
		>
			<i class="pi pi-arrow-left" />
			{{ $t('back') }}
		</nuxt-link-locale>
		<header class="my-4">
			<h1 class="text-xxl font-bold">{{ $t("edit") }}</h1>
		</header>
		<league-editing
			:league-id="+leagueId"
		/>
	</div>
</template>

<script setup lang="ts">
import { LeagueEditing } from "widgets/Leagues/league-editing";

const route = useRoute();
const leagueId: string = route.params.league as string;
</script>

<style scoped>

</style>