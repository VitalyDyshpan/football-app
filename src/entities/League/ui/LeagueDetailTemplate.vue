<template>
	<div
		class="p-6 border border-stroke border-solid rounded-28 flex gap-6"
	>
		<v-avatar
			:avatar-props="{
				size: 'xlarge'
			}"
			:path="props.avatar ? `/app/${props.avatar?.path}` : undefined"
			class="shrink-0"
		/>
		<div
			class="flex flex-col gap-6 w-full"
		>
			<div
				class="flex gap-6 justify-between"
			>
				<h3 class="text-xxl font-bold">
					{{ props.title }}
				</h3>
				<div
					class="flex gap-2"
				>
					<prime-tag
						:severity="props.status !== 'public' ? 'danger' : undefined"
						:value="props.status !== 'public' ? $t('nonpublic') : $t('public')"
						class="shrink-0"
					/>
					<slot name="edit" />
				</div>
			</div>
			<div class="grid grid-cols-[minmax(190px,240px)_auto] gap-x-8 gap-y-4">
				<league-info-options
					:label="$t('league_location')"
					:value="props.city?.name ?? ''"
				/>
				<league-info-options
					:label="$t('league_managersPhone')"
					:value="props.phone"
				/>
				<league-info-options
					v-if="props.fio_manager"
					:label="$t('manager')"
					:value="props.fio_manager"
				/>
				<div v-else-if="props.phone_additional?.length"/>
				<league-info-options
					v-if="props.phone_additional?.length"
					:label="$t('league_managersAdditionalPhone')"
					:value="props.phone_additional?.[0]"
				/>
				<league-info-options
					v-if="description && description.length > 0"
					:label="$t('league_description')"
					:value="props.description"
					class="col-span-2"
				/>
			</div>
			<prime-button
				class="h-10 max-w-[240px] text-primary font-bold"
				outlined
				@click="onLinkClick"
			>
				<div
					class="flex gap-2"
				>
					<icon-globe class="h-6 w-6" />
					{{ $t("league_link") }}
				</div>
			</prime-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { League } from "../types";
import { LeagueInfoOptions } from "./index";
import { IconGlobe } from "shared/ui/icons";
import { VAvatar } from "shared/ui/common";

const props = defineProps<League>();

const onLinkClick = async () => await navigateTo(props.link, {
	external: true
});
</script>

<style scoped>

</style>