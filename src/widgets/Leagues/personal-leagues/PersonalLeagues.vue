<template>
	<section>
		<leagues-list :leagues="personalLeagues" />
	</section>
</template>

<script setup lang="ts">
import { LeaguesList, useLeaguesStore } from "entities/League";

const { personalLeagues, gettingPersonalLeagues } = useLeaguesStore();
const { getPersonalLeagues } = await gettingPersonalLeagues();
await callOnce(async (): Promise<void> => {
	await getPersonalLeagues();
});
</script>

<style scoped>

</style>