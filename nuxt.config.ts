export default defineNuxtConfig({
    runtimeConfig: {
        apiKey: process.env.NUXT_DEEPL_API_KEY,
    },
    modules: ["@vueuse/nuxt", "nuxt-icon", "@nuxtjs/tailwindcss"],
});
