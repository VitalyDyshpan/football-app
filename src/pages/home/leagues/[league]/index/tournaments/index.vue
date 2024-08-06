<template>
	<div
		class="flex flex-col gap-6"
	>
		<div
			class="flex gap-4 justify-between items-center"
		>
			<h3
				class="text-xxl text-text font-bold"
			>
				Турниры
			</h3>
		</div>
		<div
			class="p-6 rounded-28 border border-solid border-stroke"
		>
			<p class="text-xl text-text font-bold text-center">
				Пока вы не организовали ни одного турнира
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	leagueId: string
}>();
</script>

<style scoped>

</style>