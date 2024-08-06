<template>
	<league-detail-template
		v-if="singlePersonalLeague"
		:id="singlePersonalLeague.id"
		:title="singlePersonalLeague.title"
		:phone="maskedPhone"
		:city="singlePersonalLeague.city"
		:fio_manager="singlePersonalLeague.fio_manager"
		:avatar="singlePersonalLeague.avatar"
		:status="singlePersonalLeague.status"
		:description="singlePersonalLeague.description"
		:phone_additional="maskedAdditionalPhones"
		:link="singlePersonalLeague.link"
	>
		<template #edit>
			<nuxt-link-locale
				:to="`/home/leagues/${singlePersonalLeague.id}/edit`"
				class="transition-colors text-accentuation hover:text-secondary"
				data-test="link_of_leagueEdit"
			>
				<icon-pencil />
			</nuxt-link-locale>
		</template>
	</league-detail-template>
</template>

<script setup lang="ts">
import { useSingleLeagueStore, LeagueDetailTemplate } from "entities/League";
import { IconPencil } from "shared/ui/icons";

const props = defineProps<{
	leagueId: number
}>();

const { leagueId } = toRefs(props);

const { singlePersonalLeague, gettingSinglePersonalLeague, maskedPhone, maskedAdditionalPhones } = useSingleLeagueStore(leagueId);
const { getSinglePersonalLeague } = await gettingSinglePersonalLeague();
await getSinglePersonalLeague();
</script>

<style scoped>

</style>