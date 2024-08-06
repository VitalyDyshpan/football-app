<template>
	<div
		class="flex gap-6 flex-wrap"
	>
		<template
			v-for="league in props.leagues"
			:key="league.id"
		>
			<league-preview
				v-bind="league"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { LeaguePreview } from "./index";
import type { League } from "../types";

const props = defineProps<{
	leagues: League[]
}>();
</script>

<style scoped>

</style>