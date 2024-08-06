<template>
	<aside class="border border-solid border-stroke rounded-28 h-fit overflow-hidden">
		<ul class="p-4 w-[222px]">
			<li
				v-for="(item, index) in menuItems"
				:key="item.label"
				:class="[
					'cursor-pointer hover:bg-filling rounded-8',
					{'bg-filling': index === selectedMenuItemIndex}
				]"
			>
				<nuxt-link-locale
					class="h-full p-4 flex items-center gap-4 "
					:to="item.routeLink"
				>
					<component
						:is="item.icon"
						class="shrink-0"
					/>
					{{ item.label }}
				</nuxt-link-locale>
			</li>
			<li
				class="hover:bg-filling rounded-8"
			>
				<logout-flow
					close-data-test="button_of_menuLogoutConfirmationClose"
					accept-data-test="button_of_menuAcceptLogout"
					reject-data-test="button_of_menuRejectLogout"
					group="menuLogout"
				>
					<template
						#default="{ logoutWithConfirm }"
					>
						<button
							class="flex gap-4 p-4 w-full h-full"
							@click="logoutWithConfirm"
						>
							<icon-exit />
							Выйти
						</button>
					</template>
				</logout-flow>
			</li>
		</ul>
	</aside>
</template>

<script setup lang="ts">
import type { UserMenuItem } from "./config";
import { IconCup, IconExit } from "shared/ui/icons";
import { LogoutFlow } from "features/Auth/logout";

const route = useRoute();

const menuItems: UserMenuItem[] = [
	{
		label: "Мои лиги",
		icon: IconCup,
		routeLink: "/home/leagues"
	}
];

const selectedMenuItemIndex = computed(() => menuItems.findIndex(item => route.path.startsWith(item.routeLink)));
</script>