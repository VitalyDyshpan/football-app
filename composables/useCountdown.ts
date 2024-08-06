export const useCountdown = (countSeconds: number = 30, immediate: boolean = true) => {
  const countValue = ref<number>(countSeconds);
	const intervalId = ref<NodeJS.Timeout>();

	const stopCountdown = (): void => {
	  if (intervalId.value) {
			clearInterval(intervalId.value);
		}
	};
	const startCountDown = (): void => {
		intervalId.value = setInterval(() => {
			if (countValue.value) {
				countValue.value --;
			} else {
				stopCountdown();
			}
		}, 1000);
	};

	const resetCountDown = (): void => {
		stopCountdown();
		countValue.value = countSeconds;
		startCountDown();
	};

	function getObjectTime(ms: number): {
		days: number
		hours: number
		minutes: number
		seconds: number
	} {
		const checkNum = (num: number): number => {
			return num < 0 ? 0 : num;
		};

		const daysMs: number = ms % (24*60*60*1000);
		const hoursMs: number = ms % (60*60*1000);
		const minutesMs: number = ms % (60*1000);

		const days: number = checkNum(Math.floor(ms / (24*60*60*1000)));
		const hours: number = checkNum(Math.floor(daysMs / (60*60*1000)));
		const minutes: number = checkNum(Math.floor(hoursMs / (60*1000)));
		const seconds: number = checkNum(Math.floor(minutesMs / 1000));

		return {
			days,
			hours,
			minutes,
			seconds,
		};
	}

	const getTwoDigitsNumber = (value: number): string => {
	  return `${value < 10 ? "0" + value : value}`;
	};

	const leaveTimeValue = computed<string>(() => {
		const { days, hours, minutes, seconds } = getObjectTime(countValue.value * 1000);
		if (countSeconds >= 86400) {
			return `${days} д. ${getTwoDigitsNumber(hours)}:${getTwoDigitsNumber(minutes)}:${getTwoDigitsNumber(seconds)}`;
		} else if (countSeconds >= 3600 && countSeconds < 86400) {
			return `${getTwoDigitsNumber(hours)}:${getTwoDigitsNumber(minutes)}:${getTwoDigitsNumber(seconds)}`;
		} else {
			return `${getTwoDigitsNumber(minutes)}:${getTwoDigitsNumber(seconds)}`;
		}
	});

	onMounted((): void => {
		if (immediate) {
			startCountDown();
		}
	});
	onBeforeUnmount((): void => {
		stopCountdown();
	});

	return {
		leaveTimeValue,
		stopCountdown,
		resetCountDown,
		startCountDown,
		countValue
	};
};