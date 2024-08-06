// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "url";

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    app: fileURLToPath(new URL("./src/app", import.meta.url)),
    entities: fileURLToPath(new URL("./src/entities", import.meta.url)),
    pages: fileURLToPath(new URL("./src/pages", import.meta.url)),
    widgets: fileURLToPath(new URL("./src/widgets", import.meta.url)),
    features: fileURLToPath(new URL("./src/features", import.meta.url)),
    shared: fileURLToPath(new URL("./src/shared", import.meta.url)),
  },
  dir: {
    pages: "./src/pages",
    layouts: "./src/app/layouts",
  },
  routeRules: {
    "/home": { redirect: "/home/leagues" }
  },
  css: ["primeicons/primeicons.css", "@/src/app/assets/montserrat.scss"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "nuxt-primevue",
    "@nuxt/test-utils/module",
    "@nuxt/image"
  ],
  primevue: {
    options: {
      unstyled: true,
    },
    components: {
      prefix: "Prime",
    },
    importPT: { from: "@/src/app/config/globalPtConfig.ts" },
  },
  tailwindcss: {
    cssPath: "@/src/app/assets/style.scss",
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en"],
    vueI18n: "./i18n.config.ts",
  },
  eslint: {
    checker: true,
  },
  components: {
    dirs: [],
  },
  runtimeConfig: {
    public: {
      sentryUrl: process.env.NUXT_PUBLIC_SENTRY_DSN,
      appSecretKey: "",
    },
  },
  nitro: {
    routeRules: {
      "/api/**": {
        proxy: `${process.env.NUXT_PUBLIC_API_BASE_URL}/api/**`,
      },
      "/storage/**": {
        proxy: `${process.env.NUXT_PUBLIC_API_BASE_URL}/storage/**`,
      },
      "/docs/**": {
        proxy: `${process.env.NUXT_PUBLIC_API_BASE_URL}/docs/**`,
      },
    }
  },
  image: {
    alias: {
      app: process.env.NUXT_PUBLIC_API_BASE_URL ?? ""
    },
    quality: 80
  }
});