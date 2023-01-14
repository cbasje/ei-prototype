<script lang="ts" setup>
import type { Language } from "~~/lib/types";

const languages: Language[] = [
    { code: "nl-BE", name: "🇳🇱 Nederlands" },
    { code: "en-GB", name: "🇬🇧 English" },
    { code: "de-DE", name: "🇩🇪 Deutsch" },
    { code: "fr-FR", name: "🇫🇷 Français" },
    { code: "it-IT", name: "🇮🇹 Italiano" },
    { code: "es-MX", name: "🇪🇸 Español" },
    { code: "zh-CN", name: "🇨🇳 汉语/漢語" },
    { code: "ja-JP", name: "🇯🇵 日本語" },
    { code: "id-ID", name: "🇮🇩 Bahasa Indonesia" },
    { code: "tr-TR", name: "🇹🇷 Türkçe" },
    { code: "pl-PL", name: "🇵🇱 Polski" },
];

let synth: SpeechSynthesis;
const voices = ref<SpeechSynthesisVoice[]>([]);
const sourceText = ref("");
const destLangIndex = ref(0);

const destLangCode = computed(() => voices.value[destLangIndex.value].lang);
const voice = computed(() => voices.value[destLangIndex.value]);

const { data: translationData, refresh } = await useFetch("/api/translation", {
    query: { text: sourceText, lang: destLangCode },
});
const destText = computed(() =>
    translationData.value ? translationData.value.translations[0].text : ""
);

const speech = useSpeechSynthesis(destText, {
    voice,
    volume: 1,
    rate: 0.85,
});

onMounted(() => {
    if (speech.isSupported.value) {
        // load at last
        setTimeout(() => {
            synth = window.speechSynthesis;
            voices.value = synth
                .getVoices()
                .reduce((prevValue, curValue, i) => {
                    let newArr = prevValue;
                    const index = languages.findIndex(
                        (l) => l.code === curValue.lang
                    );

                    if (
                        curValue.localService &&
                        index !== -1 &&
                        !prevValue.some((v) => v.lang === curValue.lang)
                    ) {
                        newArr[index] = curValue;
                    }

                    return newArr;
                }, [] as SpeechSynthesisVoice[]);
        });
    }
});

const translateAndPlay = async () => {
    // getTranslation();
    await refresh();
    play();
};
const play = () => {
    if (speech.status.value === "pause") {
        window.speechSynthesis.resume();
    } else {
        speech.speak();
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
    destLangIndex.value = lang;
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
                <select class="select select-bordered" v-model="destLangIndex">
                    <option disabled selected>Select language</option>
                    <template v-for="(l, i) in languages" :key="i">
                        <option :value="i">{{ l.name }}</option>
                    </template>
                </select>
            </form>
        </li>
        <li class="flex flex-row self-stretch justify-between gap-3 pl-0">
            <div class="btn-group">
                <button
                    class="btn btn-primary"
                    :disabled="speech.isPlaying.value"
                    @click="() => translateAndPlay()"
                >
                    {{ speech.status.value === "pause" ? "Resume" : "Speak" }}
                </button>
                <button
                    class="btn btn-warning"
                    :disabled="!speech.isPlaying.value"
                    @click="pause"
                >
                    Pause
                </button>
                <button
                    class="btn btn-error"
                    :disabled="!speech.isPlaying.value"
                    @click="stop"
                >
                    Stop
                </button>
            </div>
        </li>
    </ul>
</template>
