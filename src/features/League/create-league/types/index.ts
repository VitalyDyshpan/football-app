import type { League } from "entities/League";
export type CreateLeagueModelType = {
  title: string;
  city_id: number | null;
  phone: string;
  phone_additional: (string | undefined)[];
  description: string;
  link: string;
  fio_manager: string;
  title_short: string;
};

export type CreateLeagueResponseDto = League;
