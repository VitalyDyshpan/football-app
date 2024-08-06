import type { City } from "entities/City/@x/league";
import type { Avatar } from "entities/@abstract/Avatar";

export type League = {
	id: number
	title: string
	description: string | null
	fio_manager: string
	phone: string
	link: string | null
	phone_additional: string[]
	city: City | null
	avatar: Avatar | null
	status: string | null
}