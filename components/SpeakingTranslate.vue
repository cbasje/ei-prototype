<script lang="ts" setup>
interface Language {
    code: string;
    name: string;
    speechCode?: string;
}
const languages: Language[] = [
    { code: "EN", name: "English", speechCode: "en-ZA" },
    { code: "NL", name: "Dutch", speechCode: "nl-BE" },
    { code: "DE", name: "German" },
    { code: "FR", name: "French" },
    { code: "IT", name: "Italian" },
    { code: "ES", name: "Spanish", speechCode: "es-CO" },
    { code: "ZH", name: "Chinese", speechCode: "zh-CN" },
    { code: "JA", name: "Japanese" },
    { code: "ID", name: "Indonesian" },
    { code: "TR", name: "Turkish" },
    { code: "PL", name: "Polish" },
];

const sourceText = ref("");
const destinationLang = ref(0);

const destinationLangCode = computed(
    () => languages[destinationLang.value].code
);
const destinationSpeechLang = computed(
    () =>
        languages[destinationLang.value].speechCode ??
        languages[destinationLang.value].code
);

const { data: translationData, refresh } = await useFetch("/api/translation", {
    query: { text: sourceText, lang: destinationLangCode },
});
const destinationText = computed(() =>
    translationData.value ? translationData.value.translations[0].text : ""
);

const { isPlaying, status, speak } = useSpeechSynthesis(destinationText, {
    lang: destinationSpeechLang,
    volume: 1,
    rate: 0.85,
});

const translateAndPlay = async () => {
    // getTranslation();
    await refresh();
    play();
};
const play = () => {
    if (status.value === "pause") {
        window.speechSynthesis.resume();
    } else {
        speak();
    }
};
const pause = () => {
    window.speechSynthesis.pause();
};
const stop = () => {
    window.speechSynthesis.cancel();
};

// SocketIO emits
const { $io } = useNuxtApp();

$io.on("dial", (lang: number) => {
    destinationLang.value = lang;
});
</script>

<template>
    <ul class="w-full flex flex-col gap-3 list-none pl-0">
        <li class="flex flex-row self-stretch justify-between gap-3 pl-0">
            <form
                @submit.prevent="translateAndPlay()"
                class="flex-1 flex flex-row gap-3"
            >
                <input
                    type="text"
                    v-model.lazy="sourceText"
                    placeholder="Type an extra option here..."
                    class="input input-bordered w-full"
                />
                <select
                    class="select select-bordered"
                    v-model="destinationLang"
                >
                    <option disabled selected>Select language</option>
                    <template v-for="(l, i) in languages" :key="l.code">
                        <option :value="i">{{ l.name }}</option>
                    </template>
                </select>
            </form>
        </li>
        <li class="flex flex-row self-stretch justify-between gap-3 pl-0">
            <div class="btn-group">
                <button
                    class="btn btn-primary"
                    :disabled="isPlaying"
                    @click="() => translateAndPlay()"
                >
                    {{ status === "pause" ? "Resume" : "Speak" }}
                </button>
                <button
                    class="btn btn-warning"
                    :disabled="!isPlaying"
                    @click="pause"
                >
                    Pause
                </button>
                <button
                    class="btn btn-error"
                    :disabled="!isPlaying"
                    @click="stop"
                >
                    Stop
                </button>
            </div>
        </li>
    </ul>
</template>
