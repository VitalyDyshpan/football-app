import type { LeagueAvatar } from "entities/League";

export type UpdateLeagueAvatarDto = {
	file: {
		base64: string,
		name: string
	}[]
}

export type UpdateLeagueAvatarResponseDto = LeagueAvatar