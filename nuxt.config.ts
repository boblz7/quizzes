// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image"],
  css: ["~/assets/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/variables.scss" as *;',
        },
      },
    },
  },
  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 430,
      sm: 744,
      md: 1024,
      lg: 1280,
      xl: 1728,
    },
  },
});
