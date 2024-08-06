<template>
	<nuxt-loading-indicator />
	<nuxt-layout>
		<nuxt-page />
	</nuxt-layout>
	<prime-toast />
</template>

<script setup lang="ts">
import primevue_ru from "~/locales/primevue_ru.json";
import primevue_en from "~/locales/primevue_en.json";
const { locale } = useI18n();

const primeVue = usePrimeVue();

const primeVueLocale = computed(() => {
	switch (locale.value) {
		case "ru": {
			return primevue_ru;
		}
		case "en": {
			return primevue_en;
		}
		default: {
			return primevue_en;
		}
	}
});
primeVue.config.locale = primeVueLocale.value;
watch(primeVueLocale, (newLocale) => {
	primeVue.config.locale = newLocale;
});
</script>