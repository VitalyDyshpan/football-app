<template>
	<div class="flex justify-end">
		<auth-form />
	</div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import { AuthForm } from "widgets/Auth/auth-form";

definePageMeta({
	layout: "auth-layout",
	middleware: ["only-unauthorized"]
});
</script>

<style scoped>

</style>