<template>
	<div
		class="flex flex-col gap-4 p-4 rounded-20 bg-white border border-solid border-stroke max-w-[256px] w-full"
	>
		<div
			class="flex flex-col gap-2"
		>
			<prime-tag
				:severity="props.status !== 'public' ? 'danger' : undefined"
				:value="props.status === 'public' ? $t('public') : $t('nonpublic')"
				class="self-end"
			/>
			<div
				class="flex gap-2">
				<v-avatar
					:path="props.avatar ? `/app/${props.avatar?.path}` : undefined"
					class="shrink-0"
				>
					<template
						v-if="!props.avatar"
						#icon
					>
						<i class="pi pi-image text-stroke" />
					</template>
				</v-avatar>
				<div
					class="flex flex-col gap-2 grow"
				>
					<p
						class="text-text text-sm font-medium text-wrap break-all"
					>
						{{ props.title }}
					</p>
					<p
						class="text-additional text-xs font-medium text-wrap break-all"
					>
						{{ leagueRegion }}
					</p>
				</div>
			</div>
		</div>
		<nuxt-link-locale
			:to="`/home/leagues/${props.id}`"
		>
			<prime-button
				:label="$t('moreDetail')"
				size="small"
			/>
		</nuxt-link-locale>
	</div>
</template>

<script setup lang="ts">
import type { League } from "../types";
import { VAvatar } from "shared/ui/common";

const props = defineProps<League>();

const leagueRegion = computed<string>(() => {
	if (props.city?.region) {
		if (props.city.region.type === "обл") {
			return `${props.city.region.name} область`;
		}
		if (props.city.region.type === "Респ") {
			return `Республика ${props.city.region.name}`;
		}
		return `${props.city.region.name} ${props.city.region.type}`;
	}
	return props.city?.name ?? "";
});
</script>

<style scoped>

</style>