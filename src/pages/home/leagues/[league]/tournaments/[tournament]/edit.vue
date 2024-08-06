<template>
	<div
		v-if="tournament"
		class="w-full"
	>
		<nuxt-link-locale
			:to="`/home/leagues/${route.params.league}/tournaments/${tournamentId}`"
			class="text-base/[18px] font-bold text-secondary transition-all hover:opacity-80"
			data-test="link_of_leagues"
		>
			<i class="pi pi-arrow-left" />
			{{ $t('back') }}
		</nuxt-link-locale>
		<header class="my-4">
			<h1 class="text-xxl font-bold">{{ $t("edit") }}</h1>
		</header>

		<div class="flex gap-4 border border-solid border-stroke rounded-28 h-fit p-6 mt-8">
			<edit-tournament :tournament="tournament" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "#app";
import { getDetailPersonalTournamentRequest, type Tournament } from "entities/Tournament";
import { EditTournament } from "features/Tournament/edit-tournament";

const route = useRoute();

const tournament = ref<Tournament | null>(null);
const loading = ref<boolean>(false);

const tournamentId = computed(() => route.params?.tournament || null);

const fetchTournament = async () => {
  if (tournamentId.value !== null) {
	loading.value = true;
    const { data, status } = await getDetailPersonalTournamentRequest(+tournamentId.value);
    if (status.value === "success") {
      tournament.value = data.value;
    }
	loading.value = false;
  }
};

fetchTournament();
</script>