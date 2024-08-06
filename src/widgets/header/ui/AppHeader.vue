<template>
	<header class="w-full md:px-4 min-[1080px]:px-0 min-[1080px]:w-270">
		<nav
			class="flex items-center justify-between h-[64px] px-8 md:rounded-[100px] md:border md:border-stroke md:h-[68px]"
		>
			<nuxt-link-locale
				to="/"
			>
				<logo />
			</nuxt-link-locale>
			<ul class="hidden gap-8 md:flex">
				<li
					v-for="item in menuItems"
					:key="item.title"
				>
					<nuxt-link-locale
						:to="item.path"
						active-class="text-secondary"
						class="font-semibold transition-colors hover:text-secondary"
						:data-test="item.dataTest"
					>
						{{ item.title }}
					</nuxt-link-locale>
				</li>
			</ul>
			<div
				class="flex gap-10 items-center"
			>
				<div
					class="flex gap-4"
				>
					<switch-locale-path-link
						locale="ru"
						class="text-base font-bold transition-colors hover:text-secondary"
						:class="[locale === 'ru' ? 'text-secondary' : 'text-text']"
					>
						RU
					</switch-locale-path-link>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup lang="ts">
import { Logo } from "shared/ui/branding";

const { locale } = useI18n();
const menuItems = [
	{
		title: "О приложении",
		path: "https://example.com/",
		dataTest: "link_of_headerLinkToTournaments"
	},
];
</script>