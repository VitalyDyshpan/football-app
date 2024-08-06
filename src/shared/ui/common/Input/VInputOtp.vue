<template>
	<prime-input-otp
		v-bind="props"
		v-model="modelValue"
		:pt="ptOptions"
	>
		<template #default="{ attrs, events, index }">
			<input
				type="text"
				v-bind="attrs"
				class="w-[50px] h-[64px] border-none outline-none text-center text-title font-bold text-text placeholder:text-filling placeholder:text-[65px]"
				placeholder="&#183;"
				:autofocus="index === 1"
				v-on="events"
			>
		</template>
	</prime-input-otp>
</template>

<script setup lang="ts">
import type { InputOtpPassThroughOptions, InputOtpProps } from "primevue/inputotp";
const props = defineProps<InputOtpProps>();

const modelValue = defineModel<string>({
	required: true
});

const ptOptions: InputOtpPassThroughOptions = {
	root: "flex justify-center"
};

const emit = defineEmits<{
	(event: "completed"): void
}>();

watch(modelValue, (newValue: string) => {
	if (newValue.length === (props.length ?? 4)) {
		emit("completed");
	}
});
</script>

<style scoped>

</style>