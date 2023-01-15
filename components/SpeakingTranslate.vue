<script lang="ts" setup>
import { useGlobalStore } from "~~/stores/global";

const globalStore = useGlobalStore();

let synth: SpeechSynthesis;
const sourceText = ref("");

const { data: translationData, refresh } = await useFetch("/api/translation", {
    query: { text: sourceText, lang: globalStore.lang.code },
});
const destText = computed(() =>
    translationData.value ? translationData.value.translations[0].text : ""
);

const speech = useSpeechSynthesis(destText, {
    voice: globalStore.voice,
    volume: 1,
    rate: 0.85,
});

onMounted(() => {
    if (speech.isSupported.value) {
        // load at last
        setTimeout(() => {
            synth = window.speechSynthesis;
            globalStore.setVoices(synth.getVoices());
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
                    v-model="globalStore.langIndex"
                >
                    <option disabled selected>Select language</option>
                    <template v-for="(l, i) in globalStore.languages" :key="i">
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
