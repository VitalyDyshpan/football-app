<template>
	<footer class="px-4 w-full bg-text py-[48px] flex justify-center">
		<div
			class="w-[1080px] flex flex-col gap-4 text-[14px]/[20px] text-primary-700 max-w-[1080px]"
		>
			<div class="w-full flex flex-wrap items-center gap-[17px] text-white pb-4 border-b border-primary-700 md:flex-nowrap">
				<div class="w-full">
					<logo />
				</div>
				<div class="w-fit flex flex-col gap-2 md:w-full">
					<a href="https://example.com">{{ $t("mobileApp") }}</a>
					<a href="https://example.com">{{ $t("opportunities") }}</a>
				</div>
				<div class="w-fit ml-auto flex flex-col gap-2 md:ml-0 md:w-full md:max-w-[326px]">
					<a href="https://example.com">{{ $t("indicators") }}</a>
					<a href="https://example.com">{{ $t("profile") }}</a>
				</div>
			</div>
			<div class="w-full flex flex-wrap gap-[17px] md:flex-nowrap">
				<div class="w-full flex flex-col gap-2">
					<div class="flex">
						<icon-envelope class="mr-2 text-additional" />
						<span class="text-white">gentelmen.com</span>
					</div>
					<div class="flex">
						<icon-phone-call class="mr-2 text-additional" />
						<span class="text-white">+7 999 999 99 99</span>
					</div>
				</div>
				<div class="w-full flex flex-col gap-2 text-additional">
					<a href="https://example.com">{{ $t("PDPP") }}</a>
					<a href="https://example.com">{{ $t("informationalVoluntaryConsent") }}</a>
				</div>
				<div class="w-full max-w-[326px] flex flex-col gap-2 text-additional">
					<a href="https://example.com">{{ $t("privacyPolicy") }}</a>
				</div>
			</div>
			<div class="flex flex-wrap gap-y-6 gap-x-2 justify-between py-4 text-[12px]/[14px] text-additional">
				<span>{{ $t("acceptCookie") }}</span>
				<span>©{{ new Date().getFullYear() }} - {{ $t("allRightsReserved") }}</span>
			</div>
		</div>
	</footer>
</template>
<script setup lang="ts">
import { Logo } from "shared/ui/branding";
import { IconEnvelope, IconPhoneCall } from "shared/ui/icons";
</script>