<template>
	<div
		class="flex gap-2 group"
	>
		<prime-checkbox
			v-model="modelValue"
			v-bind="props.checkboxProps"
			:input-id="labelId"
			:data-test="props.dataTest"
			@change="emit('change', $event)"
		/>
		<label
			v-if="$slots.default || props.label"
			:for="labelId"
		>
			<slot>
				<span class="text-base text-text font-medium cursor-pointer group-has-[:disabled]:cursor-not-allowed group-has-[:disabled]:opacity-50">{{ props.label }}</span>
			</slot>
		</label>
	</div>
</template>

<script setup lang="ts" generic="T">
import type { CheckboxProps } from "primevue/checkbox";

const props = defineProps<{
	label?: string
	checkboxProps?: CheckboxProps
	dataTest?: string
}>();

const emit = defineEmits<{
	(event: "change", value: Event ): void
}>();

const modelValue = defineModel<T>();
const labelId = useId();
</script>

<style scoped>

</style>