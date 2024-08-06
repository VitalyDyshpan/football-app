export type EditLeagueRequestDto = {
	fio_manager: string
	phone: string
	link?: string
	phone_additional: (string | undefined)[]
	description: string | undefined
}