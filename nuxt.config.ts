export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        apiKey: process.env.NUXT_DEEPL_API_KEY,
    },
    modules: ["@vueuse/nuxt", "nuxt-icon", "@nuxtjs/tailwindcss"],
});
