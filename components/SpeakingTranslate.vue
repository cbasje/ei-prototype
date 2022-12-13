<script lang="ts" setup>
interface Language {
    code: string;
    title: string;
    speechCode?: string;
}
const languages: Language[] = [
    { code: "BG", title: "Bulgarian" },
    { code: "CS", title: "Czech" },
    { code: "DA", title: "Danish" },
    { code: "DE", title: "German" },
    { code: "EL", title: "Greek" },
    { code: "EN", title: "English", speechCode: "en-ZA" },
    { code: "ES", title: "Spanish", speechCode: "es-CO" },
    { code: "ET", title: "Estonian" },
    { code: "FI", title: "Finnish" },
    { code: "FR", title: "French" },
    { code: "HU", title: "Hungarian" },
    { code: "ID", title: "Indonesian" },
    { code: "IT", title: "Italian" },
    { code: "JA", title: "Japanese" },
    { code: "LT", title: "Lithuanian" },
    { code: "LV", title: "Latvian" },
    { code: "NL", title: "Dutch", speechCode: "nl-BE" },
    { code: "PL", title: "Polish" },
    { code: "PT", title: "Portuguese" },
    { code: "RO", title: "Romanian" },
    { code: "RU", title: "Russian" },
    { code: "SK", title: "Slovak" },
    { code: "SL", title: "Slovenian" },
    { code: "SV", title: "Swedish" },
    { code: "TR", title: "Turkish" },
    { code: "UK", title: "Ukrainian" },
    { code: "ZH", title: "Chinese", speechCode: "zh-CN" },
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
                        <option :value="i">{{ l.title }}</option>
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
