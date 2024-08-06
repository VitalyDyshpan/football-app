<template>
	<prime-float-label
		:pt="{
			root: 'inline-block relative group w-full'
		}"
	>
		<slot />
		<label
			v-if="props.label"
			:for="props.htmlId"
			class="cursor-text pointer-events-none text-base font-medium text-additional absolute transition-all left-4 top-1/2 -translate-y-1/2 group-has-[textarea]:top-4 group-has-[textarea:not(:focus):not(.p-filled)]:translate-y-0 group-has-[:focus]:top-3 group-has-[:focus]:text-xs group-has-[.p-filled]:top-3 group-has-[.p-filled]:text-xs group-has-[.p-inputwrapper-filled]:top-3 group-has-[.p-inputwrapper-filled]:text-xs group-has-[.p-inputwrapper-focus]:text-xs group-has-[.p-inputwrapper-focus]:top-3"
			:style="{paddingLeft}"
		>
			{{ props.label }}{{ props.required ? " *" : "" }}
		</label>
	</prime-float-label>
</template>

<script setup lang="ts">
const props = defineProps<{
	label?: string
	htmlId: string,
	paddingLeft?: string,
	required?: boolean
}>();
</script>