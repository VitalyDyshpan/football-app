<template>
	<section
		class="px-6 py-10 border border-solid border-stroke rounded-28 max-w-[576px] w-full"
	>
		<header
			class="mb-6"
		>
			<h3
				class="text-center text-xxl text-text font-bold"
			>
				{{ widgetTitle }}
			</h3>
		</header>
		<register-flow
			@code-sent="widgetTitle = t('enterCode')"
			@code-checked="onCodeChecked"
		/>
		<prime-button
			v-if="showContactSupportButton"
			label="Связаться с поддержкой"
			outlined
			size="large"
			class="mt-4"
		/>
	</section>
</template>

<script setup lang="ts">
import { RegisterFlow } from "features/Auth/register-flow";

const { t } = useI18n();

const widgetTitle = ref<string>(t("registration"));
const showContactSupportButton = ref<boolean>(false);
const onCodeChecked = (): void => {
	widgetTitle.value = t("registration");
	showContactSupportButton.value = false;
};
</script>

<style scoped>

</style>