<template>
	<div class="flex gap-10 py-6 w-full">
		<user-menu />
		<section class="grow max-w-[816px]">
			<nuxt-page />
		</section>
	</div>
</template>

<script setup lang="ts">
import { UserMenu } from "widgets/user-menu";
import { definePageMeta } from "#imports";

definePageMeta({
	middleware: ["only-authorized"]
});
</script>