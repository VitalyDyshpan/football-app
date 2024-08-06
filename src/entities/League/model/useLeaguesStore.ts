import type { League } from "../types";
import { getPersonalLeaguesRequest } from "../api";
import type { Ref } from "vue";

type LeaguesStore = {
	personalLeagues: Ref<League[]>
	gettingPersonalLeagues: () => Promise<{
		getPersonalLeagues: () => Promise<void>
	}>
}
export const useLeaguesStore = (): LeaguesStore => {
	const personalLeagues = useState<League[]>("personalLeagues", () => []);

	const gettingPersonalLeagues = async (): Promise<{
		getPersonalLeagues: () => Promise<void>
	}> => {
		const {
			data: getPersonalLeaguesData,
			error: getPersonalLeaguesError,
			status: getPersonalLeaguesStatus,
			execute: getPersonalLeaguesExecute
		} = await getPersonalLeaguesRequest();
		const getPersonalLeagues = async (): Promise<void> => {
			await getPersonalLeaguesExecute();
			switch (getPersonalLeaguesStatus.value) {
				case "success": {
					if (getPersonalLeaguesData.value) {
						personalLeagues.value = [...getPersonalLeaguesData.value];
					}
					break;
				}
				case "error": {
					console.log(getPersonalLeaguesError.value?.data);
				}
			}
		};
		return {
			getPersonalLeagues
		};
	};

	return {
		gettingPersonalLeagues,
		personalLeagues
	};
};