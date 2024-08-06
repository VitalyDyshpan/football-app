# Gentelmen-app

Для корректной работа авторизации необходимо создать ключ приложения:

`openssl rand -base64 32`

и записать его в переменную `NUXT_PUBLIC_APP_SECRET_KEY` в .env

# Nuxt 3 template

## Минимальные требования Nuxt 3

Node.js - v16.10.0 или новее (желательно не ниже v18).

## Локальный запуск приложения (без использования Docker)

### Устанавливаем зависимости
``npm install``

### Создаем .env из .env.example

### Запускаем сервер разработки

``npm run dev``

### Запускаем StoryBook

``npm run storybook``

Storybook будет доступен на [localhost:6006](http://localhost:6006/)

### Запуск production-сборки

``npm run build``

## Локальный запуск приложения (с использованием Docker)

### Устанавливаем пакет make

``apt install make``

### Просмотр доступных команд

``make all``

### Запускаем сервер разработки

``make start``


## Особенности установки дополнительных библиотек в Nuxt 3.

Установка дополнительных библиотек в Nuxt 3 может осуществляться путем добавления в приложения соответствующих модулей, которые можно найти на странице [Modules](https://nuxt.com/modules) на официальном сайте Nuxt 3. Установка модулей упрощает интеграцию и настройку необходимых библиотек и плагинов.

Если соответствующего модуля нет или его поведение не подходит, то для установки библиотек (которые требуют подключения к приложению с помощью `app.use()`) может потребоваться написание необходимого [плагина](https://nuxt.com/docs/guide/directory-structure/plugins#vue-plugins). 
________
Ниже представлена полная инструкция по развороту проекта с нуля.

## Инициализация Nuxt

``npx nuxi@latest init <project-name>``

``npm install``

Когда мы инициализируем проект, то nuxt создает папку по названию проекта в которую разворачивает все файлы. Убираем лишнюю вложенность путем переноса всех файлов на уровень выше, а созданную nuxt папку удаляем

При необходимости создаем .env файл.
Переменные должны начинаться с NUXT_ и использовать "_" в качестве разделителя.
NUXT_PUBLIC_ - доступны на фронте.
NUXT_SECRET_ - доступны только на сервере

Необходимые переменные окружения из .env-файла добавляем в nuxt.config.ts:

```
runtimeConfig: {
        public: {
            sentryUrl: process.env.NUXT_PUBLIC_SENTRY_DSN,
            // ... другие переменные
        }
    },
```

Так же отключаем автоматический импорт из папок `components/`, `composables/` и `utils/`:

```
export default defineNuxtConfig({
  imports: {
    autoImport: false
  }
})
```

и автоматический импорт компонентов:
```
export default defineNuxtConfig({
  components: {
    dirs: []
  }
})
```

Разработка проекта ведется в папках внутри папки `/src`.
В папке `pages` в корне проекта создаем компоненты страниц для автоматической генерации роутов и монтируем в них компоненты из папки `/src/pages`.

В папке `layouts` в корне проекта создаем компоненты лайоутов приложения для использования вместе с компонентом `<NuxtLayout>` и монтируем в них компоненты из папки `/src/app/layouts` 

## Устанавливаем axios

``
npm install axios
``

## Устанавливаем sass

``
npm install -D sass
``

## Устанавливаем tailwindcss

```
npx nuxi module add @nuxtjs/tailwindcss
npx tailwindcss init
```

## Установка pinia

``npm install pinia @pinia/nuxt``

добавляем pinia в список модулей nuxt:

```
// nuxt.config.js
export default defineNuxtConfig({
  // ... other options
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
```

## Устанавливаем Storybook

``npx storybook@latest init``

команда запуска Storybook:

``npm run storybook``

## Устанавливаем eslint

``npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-vue``

устанавливаем модуль eslint для nuxt

``npm install -D @nuxtjs/eslint-module``

Добавляем модуль в nuxt.config.ts:

```
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/eslint-module'
  ],
  eslint: {
    failOnError: true  //устанавливаем значение true для сбоя сборки в случае ошибок
  }
})
```

## Устанавливаем Sentry

``npm install --save @sentry/vue``

Создаем в корне проекта папку plugins и создаем внутри файл sentry.client.ts c следующим содержимым:

```
import * as Sentry from "@sentry/vue"

export default defineNuxtPlugin((nuxtApp) => {
	const app = nuxtApp.vueApp
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
			}),
		],
		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
})
```

## Устанавливаем i18n

``npm install @nuxtjs/i18n@next --save-dev``

И добавляем установленный модуль в список модулей:

```
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    /* module options */
  }
})
```

В корне проекта создаем папку locales в которой храним переводы в формате json.

Так же в корне проекта создаем файл i18n.config.ts для настроек

## Устанавливаем Element+

``npm i element-plus @element-plus/nuxt -D``

Добавляем установленный модуль в список модулей:
 ```
 export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: { /** Options */ }
})
 ```

## Устанавливаем Vitest

``npm i -D nuxt-vitest vitest happy-dom  @vue/test-utils``

Добавляем в список модулей:

```export default defineNuxtConfig({
  // ...
  modules: [
    'nuxt-vitest'
  ]
})
```

Создаем в корне проекта файл vitest.config.mjs со следующим содержимым: 
```
import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  // any custom vitest config you require
})

```

## Устанавливаем Cypress

``npm install cypress --save-dev``

Запускаем для завершения настройки Cypress

``npx cypress open``

## Запуск Development Server

Запуск development server на `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production-сборка

Сборка приложения в production:

```bash
# npm
npm run build
```

Локальный предпросмотр production-сборки:

```bash
# npm
npm run preview
```
