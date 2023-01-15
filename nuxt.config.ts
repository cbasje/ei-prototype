export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        apiKey: process.env.NUXT_DEEPL_API_KEY,
        public: { socketURL: "http://192.168.178.82:3333" },
    },
    modules: [
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "nuxt-icon",
        "@nuxtjs/tailwindcss",
    ],
});
