<template>
	<div class="flex flex-col items-center min-w-[335px] h-full">
		<app-header class="md:mt-3 max-w-[1080px]" />
		<main class="w-full max-w-[1080px] grow">
			<slot />
		</main>
		<app-footer />
	</div>
</template>

<script setup lang="ts">
import { AppHeader } from "widgets/header";
import { AppFooter } from "widgets/footer";
</script>