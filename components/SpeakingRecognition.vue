<script lang="ts" setup>
import type {
    Language,
    SpeechRecognitionErrorEvent,
    SpeechRecognition,
} from "~~/lib/types";

const languages: Language[] = [
    { code: "en-GB", name: "🇬🇧 English" },
    { code: "nl-BE", name: "🇳🇱 Nederlands" },
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

const isListening = ref(false);
const isFinal = ref(false);
const result = ref("");
const error = ref<SpeechRecognitionErrorEvent | undefined>(undefined);
const destinationLang = ref("en-GB");

const toggle = (value = !isListening.value) => {
    isListening.value = value;
};

const start = () => {
    isListening.value = true;
};
const stop = () => {
    isListening.value = false;
};

const SpeechRecognition =
    window &&
    ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition);
const isSupported = useSupported(() => SpeechRecognition);

let recognition: SpeechRecognition | undefined;

if (isSupported.value) {
    recognition = new SpeechRecognition() as SpeechRecognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-GB";

    watch(isListening, (value) => {
        if (value) recognition!.start();
        else recognition!.stop();
    });

    watch(destinationLang, (lang) => {
        if (recognition && !isListening.value) recognition.lang = lang;
    });

    recognition.onstart = () => {
        isFinal.value = false;
    };
    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map((result) => {
                isFinal.value = result.isFinal;
                return result[0];
            })
            .map((result) => result.transcript)
            .join("");

        result.value = transcript;
        error.value = undefined;
    };
    recognition.onerror = (event) => {
        error.value = event;
    };
    recognition.onend = () => {
        isListening.value = false;
    };
}
</script>

<template>
    <div>{{ result }}</div>
    <div>Error: {{ error?.message }}</div>

    <select class="select select-bordered" v-model="destinationLang">
        <option disabled selected>Select language</option>
        <template v-for="(l, i) in languages" :key="i">
            <option :value="l.code">{{ l.name }}</option>
        </template>
    </select>
    <div class="btn-group">
        <button
            class="btn btn-primary"
            :disabled="isListening"
            @click="() => start()"
        >
            Start
        </button>
        <button class="btn btn-error" :disabled="!isListening" @click="stop">
            Stop
        </button>
    </div>
</template>
