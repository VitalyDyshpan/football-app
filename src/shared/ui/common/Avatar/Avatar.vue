<template>
	<prime-avatar
		v-bind="props.avatarProps"
		class="shrink-0"
		:shape="props.avatarProps?.shape ?? 'circle'"
	>
		<template
			v-if="!props.path"
			#icon
		>
			<slot
				name="icon"
			>
				<i class="pi pi-image text-stroke" />
			</slot>
		</template>
		<nuxt-img
			v-if="props.path"
			v-bind="props.imageProps"
			:src="path"
			:width="props.imageProps?.width ?? imageSizes.width"
			:height="props.imageProps?.height ?? imageSizes.height"
			:class="[
				props.path.startsWith('blob') ? `w-[${imageSizes.width}px] h-[${imageSizes.height}px] object-cover` : null
			]"
		/>
	</prime-avatar>
</template>

<script setup lang="ts">
import type { AvatarProps } from "primevue/avatar";
import type { ExtractPropTypes } from "vue";
import type { imgProps } from "#image/components/nuxt-img";

const props = defineProps<{
	path?: string
	avatarProps?: AvatarProps
	imageProps?: ExtractPropTypes<typeof imgProps>
}>();

const imageSizes = computed<{
	width: number
	height: number
}>(() => {
	switch (props.avatarProps?.size) {
		case "xlarge": {
			return {
				width: 120,
				height: 120
			};
		}
		case "large": {
			return {
				width: 80,
				height: 80
			};
		}
		case "normal": {
			return {
				width: 40,
				height: 40
			};
		}
		default: {
			return {
				width: 40,
				height: 40
			};
		}
	}
});
</script>