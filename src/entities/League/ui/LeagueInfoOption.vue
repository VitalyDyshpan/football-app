<template>
	<div class="flex flex-col gap-1">
		<span class="text-additional text-sm">{{ label }}</span>
		<span class="text-text text-base">{{ value }}</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	label: string,
	value?: string | number | null
}>();
</script>

<style scoped>

</style>