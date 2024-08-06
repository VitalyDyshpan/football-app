<template>
	<div class="w-full">
		<v-form
			ref="createLeagueForm"
			:model="createLeagueModel"
			:rules="createLeagueRules"
		>
			<v-form-item
				class="mb-6"
				prop="title"
				:error="createLeagueErrors.title?.toString()"
			>
				<v-input-text
					v-model="createLeagueModel.title"
					:label="$t('createLeague_title')"
					validate-trigger="input"
					data-test="input_of_leagueTitle"
					required
				/>
			</v-form-item>
			<v-form-item
				class="mb-6"
				prop="title_short"
				:error="createLeagueErrors.title_short?.toString()"
			>
				<v-input-text
					v-model="createLeagueModel.title_short"
					:label="$t('createLeague_titleShort')"
					validate-trigger="input"
					data-test="input_of_leagueTitle"
					required
				/>
			</v-form-item>
			<v-form-item
				class="mb-6"
				prop="city_id"
				:error="createLeagueErrors.city_id?.toString()"
				:hint="$t('createLeague_theLocationOfTheOwner')"
			>
				<city-auto-complete
					v-model="city"
					validate-trigger="blur"
					data-test="input_of_leagueCity"
					required
					@update:model-value="changeCity"
				/>
			</v-form-item>
			<v-form-item
				class="mb-6"
				prop="fio_manager"
				:error="createLeagueErrors.fio_manager?.toString()"
			>
				<v-input-text
					v-model="createLeagueModel.fio_manager"
					:label="$t('createLeague_managersName')"
					validate-trigger="input"
					data-test="input_of_leagueManager"
					required
				/>
			</v-form-item>
			<v-form-item
				prop="phone"
				:style="{
					marginBottom: createLeagueModel.phone_additional.length > 0 ? '24px' : '8px'
				}"
				:error="createLeagueErrors.phone?.toString()"
			>
				<v-input-mask
					v-model="createLeagueModel.phone"
					mask="+7 999 999-99-99"
					:input-props="{
						unmask: true
					}"
					:label="$t('createLeague_managersPhone')"
					validate-trigger="blur"
					data-test="input_of_leagueManagerPhone"
					required
				/>
			</v-form-item>
			<v-form-item
				v-for="(_, index) in createLeagueModel.phone_additional"
				:key="`additionalPhone_${index}`"
				:style="{
					marginBottom: createLeagueModel.phone_additional.length === index + 1 ? '8px' : '24px'
				}"
				prop="phone_additional"
			>
				<v-input-mask
					v-model="createLeagueModel.phone_additional[index]"
					mask="+7 999 999-99-99"
					:input-props="{
						unmask: true
					}"
					:label="$t('createLeague_phoneAdditional')"
					validate-trigger="blur"
					data-test="input_of_leagueManagerPhone"
				/>
			</v-form-item>
			<div
				class="flex justify-end text-secondary font-bold text-xs mb-6 gap-4"
			>
				<div
					v-if="createLeagueModel.phone_additional.length === 0"
					class="flex items-center gap-2 cursor-pointer"
					@click="onAddPhoneAdditional"
				>
					<icon-plus class="w-4 h-4"/>
					{{ $t('createLeague_add') }}
				</div>
				<prime-button
					v-else
					outlined
					severity="danger"
					class="px-4 py-1 text-error font-bold"
					:style="{
						width: 'fit-content'
					}"
					@click="onDeletePhoneAdditional"
				>
					{{ $t('createLeague_delete') }}
				</prime-button>
			</div>
			<div>{{ createLeagueErrors.link }}</div>
			<v-form-item
				prop="link"
				:error="createLeagueErrors.link?.toString()"
				class="mb-6"
			>
				<prime-input-group>
					<prime-input-group-addon>
						<icon-globe class="w-[30px] h-[30px] text-stroke" />
					</prime-input-group-addon>
					<v-input-text
						v-model="createLeagueModel.link"
						:label="$t('createLeague_https')"
						data-test="input_of_leagueLink"
					/>
				</prime-input-group>
			</v-form-item>
			<v-form-item
				prop="description"
				:error="createLeagueErrors.description?.toString()"
			>
				<v-textarea
					v-model="createLeagueModel.description"
					:label="$t('createLeague_leagueDescription')"
				/>
			</v-form-item>
			<prime-button
				:label="$t('createLeague_save')"
				size="large"
				:loading="pending"
				class="create-league-button"
				data-test="button_of_saveNewLeague"
				@click="createLeagueFormSubmit"
			/>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import {
  type FormInstance,
  type ValidationSchemaType,
  VForm,
  VFormItem,
  VInputMask,
  VInputText, VTextarea
} from "shared/ui/common";
import { type City, CityAutoComplete } from "entities/City";
import type { CreateLeagueModelType } from "../types";
import { createLeagueRequest } from "../api";
import { z } from "zod";
import { useLeaguesStore } from "entities/League";
import { IconGlobe, IconPlus } from "shared/ui/icons";

const { t } = useI18n();
const createLeagueForm = ref<FormInstance>();

const createLeagueModel = reactive<CreateLeagueModelType>({
	title: "",
	city_id: null,
  phone: "",
  description: "",
  link: "",
  phone_additional: [],
	fio_manager: "",
	title_short: ""
});

const emit = defineEmits<{
	(event: "success", createdLeagueId: number | undefined): void
}>();

const city = ref<City | null>(null);

const createLeagueRules = reactive<ValidationSchemaType<CreateLeagueModelType>>({
	title: z.string({
		required_error: t("requiredField")
	})
		.min(3, t("moreThenNCharacters", 3))
		.max(30, t("noMoreThenNCharacters", 30)),
	city_id: z.number({
		required_error: t("requiredField")
	}),
	phone: z.string({
		required_error: t("requiredField")
	})
    .regex(/^\d{10}$/, t("enterCorrectPhone")),
  description: z.string().optional(),
  phone_additional: z.array(z.string().optional()),
	fio_manager: z.string({
		required_error: t("requiredField")
	})
		.min(3, t("moreThenNCharacters", 3))
		.max(30, t("noMoreThenNCharacters", 30)),
	link: z.string().url({
		message: t("createLeague_enterCorrectURL")
	}).optional()
});

const changeCity = (city: City | null): void => {
	if (!city) {
		createLeagueModel.city_id = null;
	} else {
		createLeagueModel.city_id = city.id;
	}
};

const { data, execute, status, pending, error } = await createLeagueRequest(createLeagueModel);
const { personalLeagues } = useLeaguesStore();

const createLeagueErrors = ref<{ [Property in keyof CreateLeagueModelType]?: string[] }>({});
const createLeagueFormSubmit = async (): Promise<void> => {
	if (!createLeagueForm.value) return;
	createLeagueModel.phone_additional = createLeagueModel.phone_additional.filter(phone => !!phone);
	await createLeagueForm.value.validate(async (valid: boolean | undefined): Promise<void> => {
		if (valid) {
			await execute();
			switch (status.value) {
				case "success": {
					if (data.value) {
						emit("success", data.value?.id);
						personalLeagues.value = [data.value, ...personalLeagues.value];
					}
					break;
				}
				case "error": {
					createLeagueErrors.value = error.value?.data?.errors ?? {};
				}
			}
		}
	});
};

const onAddPhoneAdditional = () => {
  if (createLeagueModel.phone_additional.length === 0) {
    createLeagueModel.phone_additional.push("");
  }
};
const onDeletePhoneAdditional = () => createLeagueModel.phone_additional = [];
</script>

<style scoped>
.create-league-button {
	@apply max-w-[188px];
}
</style>