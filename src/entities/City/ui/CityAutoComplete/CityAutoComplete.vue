<template>
	<v-auto-complete
		v-model="modelValue"
		:label="$t('city')"
		:auto-complete-props="{
			suggestions:cities ?? [],
			optionLabel: 'name',
			forceSelection: true,
			emptySearchMessage: $t('nothingWasFound'),
			appendTo: '#teleports'
		}"
		:validate-trigger="props.validateTrigger"
		:data-test="props.dataTest"
		@complete="search"
	/>
</template>

<script setup lang="ts" generic="T = unknown">
import { VAutoComplete } from "shared/ui/common";
import { getCities, type GetCitiesQueryParams } from "../../api";

const props = defineProps<{
	validateTrigger?: "blur" | "input"
	dataTest?: string
}>();

const searchParams = ref<GetCitiesQueryParams>({
	limit: 30,
});
const { data: cities } = getCities(searchParams);

const search = async (query: string) => {
	searchParams.value = {
        ...searchParams.value,
        search: query,
    };
};

const modelValue = defineModel<T>();
</script>