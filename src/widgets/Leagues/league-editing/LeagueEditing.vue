<template>
	<div
		class="p-6 border border-solid border-stroke rounded-28 flex gap-6"
	>
		<div
			class="flex flex-col gap-2"
		>
			<edit-league-avatar
				:organisation-id="props.leagueId"
				:immediate="true"
				:avatar-url="singlePersonalLeague?.avatar ? `/app/${singlePersonalLeague?.avatar?.path}` : undefined"
			/>
			<delete-league-avatar
				:league-id="props.leagueId"
			/>
		</div>
		<div
			class="flex flex-col gap-4 grow"
		>
			<header>
				<h3
					class="text-lg/[20px] font-bold"
				>
					{{ singlePersonalLeague.title }}
				</h3>
				<span class="text-sm text-additional font-medium">{{ singlePersonalLeague.city?.name }}</span>
			</header>
			<edit-league
				:league="singlePersonalLeague"
				@success="onLeagueSuccessfullyUpdated"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { EditLeagueAvatar } from "features/League/update-league-avatar";
import { type League, useSingleLeagueStore } from "entities/League";
import { EditLeague } from "features/League/edit-league";
import { DeleteLeagueAvatar } from "features/League/delete-league-avatar/";

const props = defineProps<{
	leagueId: number
}>();

const localePath = useLocalePath();

const { singlePersonalLeague, gettingSinglePersonalLeague } = useSingleLeagueStore(props.leagueId);

if (singlePersonalLeague.value?.id !== props.leagueId) {
	const { getSinglePersonalLeague } = await gettingSinglePersonalLeague();
	await getSinglePersonalLeague();
}

const onLeagueSuccessfullyUpdated = (newLeagueData: League): ReturnType<typeof navigateTo> => {
	Object.assign(singlePersonalLeague.value, newLeagueData);
	return navigateTo(localePath(`/home/leagues/${props.leagueId}`));
};
</script>

<style scoped>

</style>