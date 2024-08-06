<template>
	<div class="relative">
		<div
			class="h-full w-[52px] absolute top-0 left-0 z-10 border-r-2 border-solid flex justify-center items-center text-stroke"
			:class="{
				'border-white': !unref(formItemContext?.isErrorField) && !isInputFocused && modelValue?.length === 0,
				'border-error': unref(formItemContext?.isErrorField),
				'border-stroke': !unref(formItemContext?.isErrorField) && (isInputFocused || (modelValue && modelValue?.length > 0))
			}"
		>
			<icon-globe class="w-[30px] h-[30px]"/>
		</div>
		<v-input-text
			v-bind="$attrs"
			ref="inputRef"
			v-model="modelValue"
			:input-props="{
				pt: {
					root: {
						class:'pl-[68px]'
					}
				},
				ptOptions: {
					mergeProps: true,
				}
			}"
			label-padding-left="54px"
			data-test=""
			@focus="isInputFocused = true"
			@focusout="isInputFocused = false"/>
	</div>
</template>

<script setup lang="ts">
import { IconGlobe } from "shared/ui/icons";
import { type FormItemContextType, VInputText } from "shared/ui/common";
import { ref, inject } from "vue";
import { formItemContextKey } from "shared/ui/common/config";

defineProps({
  error: {
    type: Boolean,
    default: false
  }
});

const inputRef = ref(null);

const formItemContext = inject<FormItemContextType | undefined>(formItemContextKey, void 0);

const modelValue = defineModel<string>();

const isInputFocused = ref(false);
</script>

<style scoped>

</style>