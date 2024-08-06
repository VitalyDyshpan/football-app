<template>
	<v-form
		ref="editLeagueForm"
		:model="editLeagueModel"
		:rules="editLeagueRules"
	>
		<v-form-item
			prop="fio_manager"
		>
			<v-input-text
				v-model="editLeagueModel.fio_manager"
				:label="$t('editLeague_managersName')"
				validate-trigger="input"
				data-test="input_of_managersName"
			/>
		</v-form-item>
		<v-form-item
			prop="phone"
		>
			<v-input-mask
				v-model="editLeagueModel.phone"
				mask="+7 999 999-99-99"
				:input-props="{
					unmask: true
				}"
				:label="$t('editLeague_managersPhone')"
				data-test="input_of_managersPhone"
			/>
		</v-form-item>
		<v-form-item
			prop="phone_additional"
		>
			<v-input-mask
				v-model="additionalPhones[0]"
				mask="+7 999 999-99-99"
				:input-props="{
					unmask: true
				}"
				:label="$t('createLeague_phoneAdditional')"
				data-test="input_of_leagueManagerPhone"
			/>
		</v-form-item>
		<v-form-item
			prop="link"
			class="mb-6"
		>
			<prime-input-group>
				<prime-input-group-addon>
					<icon-globe class="w-[30px] h-[30px] text-stroke" />
				</prime-input-group-addon>
				<v-input-text
					v-model="editLeagueModel.link"
					:label="$t('createLeague_https')"
					data-test="input_of_leagueLink"
				/>
			</prime-input-group>
		</v-form-item>
		<v-form-item
			prop="description"
		>
			<v-textarea
				v-model="editLeagueModel.description"
				:label="$t('createLeague_leagueDescription')"
			/>
		</v-form-item>
		<prime-button
			size="large"
			:label="$t('editLeague_saveChanges')"
			class="submit"
			:loading="pending"
			data-test="button_of_saveChanges"
			@click="submitForm"
		/>
	</v-form>
</template>

<script setup lang="ts">
import {
	VForm,
	VFormItem,
	VInputText,
	VInputMask,
	type ValidationSchemaType,
	type FormInstance,
	VTextarea
} from "shared/ui/common";
import type { EditLeagueRequestDto } from "../types";
import type { League } from "entities/League";
import { z } from "zod";
import { editLeague } from "features/League/edit-league/api";
import { IconGlobe } from "shared/ui/icons";

const props = defineProps<{
	league: League
}>();

const emit = defineEmits<{
	(event: "success", value: League): void
}>();

const { t } = useI18n();

const editLeagueForm = ref<FormInstance>();

const editLeagueModel = reactive<EditLeagueRequestDto>({
	fio_manager: props.league?.fio_manager,
	phone: props.league?.phone,
	link: props.league.link ?? undefined,
	phone_additional: [],
	description: props.league.description ?? undefined
});

const additionalPhones = ref<(string | undefined)[]>(props.league.phone_additional);

const editLeagueRules = reactive<ValidationSchemaType<EditLeagueRequestDto>>({
	fio_manager: z.string({
		required_error: t("requiredField")
	})
		.min(3, t("moreThenNCharacters", 3))
		.max(30, t("noMoreThenNCharacters", 30)),
	phone: z.string({
		required_error: t("requiredField")
	})
		.regex(/^\d{10}$/, t("enterCorrectPhone")),
});

const { data, pending, status, execute } = await editLeague(props.league.id, editLeagueModel);
const submitForm = async () => {
	if (!editLeagueForm.value) return;
	editLeagueModel.phone_additional = additionalPhones.value.filter(phone => !!phone);
	await editLeagueForm.value.validate(async (valid: boolean | undefined): Promise<void> => {
		if (valid) {
			await execute();
			switch (status.value) {
				case "success": {
					if (data.value) {
						emit("success", data.value);
					}
				}
			}
		}
	});
};
</script>

<style scoped>
.submit {
	@apply max-w-[243px] mt-6;
}
</style>