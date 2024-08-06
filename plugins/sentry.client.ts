import * as Sentry from "@sentry/vue";
import { defineNuxtPlugin, useRuntimeConfig, useRouter } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
	const app = nuxtApp.vueApp;
	const runtimeConfig = useRuntimeConfig();
	Sentry.init({
		app,
		dsn: runtimeConfig.public.sentryUrl,
		// This sets the sample rate to be 10%. You may want this to be 100% while
		// in development and sample at a lower rate in production
		replaysSessionSampleRate: 0.1,
		// If the entire session is not sampled, use the below sample rate to sample
		// sessions when an error occurs.
		replaysOnErrorSampleRate: 1.0,
		integrations: [
			new Sentry.BrowserTracing({
				// Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
				tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
				routingInstrumentation: Sentry.vueRouterInstrumentation(useRouter()),
			})
		],
		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
});