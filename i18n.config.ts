import ru from "~/locales/ru.json";
import widgets_ru from "widgets/localization/widgets_ru.json";
import features_ru from "features/localization/features_ru.json";
import entity_city_ru from "entities/City/localization/entity_city_ru.json";
import feature_createLeague_ru from "features/League/create-league/localization/feature_createLeague_ru.json";
import entity_league_ru from "entities/League/localization/entity_league_ru.json";
import feature_editLeague_ru from "features/League/edit-league/localization/feature_editLeague_ru.json";
import feature_deleteLeagueAvatar_ru from "features/League/delete-league-avatar/localization/feature_deleteLeagueAvatar_ru.json";
import feature_logout_ru from "features/Auth/logout/localization/feature_logout_ru.json";
import { defineI18nConfig } from "#i18n";

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: "ru",
  messages: {
    ru: {
      ...ru,
      ...widgets_ru,
      ...features_ru,
      ...entity_city_ru,
      ...feature_createLeague_ru,
      ...entity_league_ru,
      ...feature_editLeague_ru,
      ...feature_deleteLeagueAvatar_ru,
      ...feature_logout_ru
    },
  },
}));
