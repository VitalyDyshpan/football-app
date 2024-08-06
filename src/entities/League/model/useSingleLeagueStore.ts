import type { ComputedRef, MaybeRef, Ref } from "vue";
import type { League } from "entities/League";
import { getDetailPersonalLeagueRequest } from "entities/League";

type UseSingleLeagueStore = {
  singlePersonalLeague: Ref<League>;
  maskedPhone: ComputedRef<string>;
  gettingSinglePersonalLeague: () => Promise<{
    getSinglePersonalLeague: () => Promise<void>;
    leagueRequestPending: Ref<boolean>;
  }>;
  maskedAdditionalPhones: ComputedRef<string[]>;
};
export const useSingleLeagueStore = (
  leagueId: MaybeRef<number>
): UseSingleLeagueStore => {
  const singlePersonalLeague = useState<League>("singlePersonalLeague");
  const maskedPhone = computed<string>(() => {
    const phone = singlePersonalLeague.value.phone;
    return phone
      ? `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`
      : "";
  });

  const maskedAdditionalPhones = computed<string[]>(() => {
    if (!singlePersonalLeague.value.phone_additional) {
      return [];
    }

    return singlePersonalLeague.value.phone_additional.map(
      (phone) =>
        `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`
    );
  });

  const gettingSinglePersonalLeague = async (): Promise<{
    getSinglePersonalLeague: () => Promise<void>;
    leagueRequestPending: Ref<boolean>;
  }> => {
    const {
      data: leagueData,
      execute: leagueRequestExecute,
      status: leagueRequestStatus,
      error: leagueRequestError,
      pending: leagueRequestPending,
    } = await getDetailPersonalLeagueRequest(leagueId);

    const getSinglePersonalLeague = async (): Promise<void> => {
      await leagueRequestExecute();
      switch (leagueRequestStatus.value) {
        case "success": {
          if (leagueData.value) {
            singlePersonalLeague.value = {
              ...leagueData.value,
            };
          }
          break;
        }
        case "error": {
          if (leagueRequestError.value) {
            showError({
              status: leagueRequestError.value?.statusCode,
              message:
                leagueRequestError.value?.statusCode === 404
                  ? "Resource not found"
                  : leagueRequestError.value.message,
            });
          }
        }
      }
    };
    return {
      leagueRequestPending,
      getSinglePersonalLeague,
    };
  };

  return {
    singlePersonalLeague,
    gettingSinglePersonalLeague,
    maskedPhone,
    maskedAdditionalPhones,
  };
};
