<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useGlobalStore } from "~~/stores/global";

const globalStore = useGlobalStore();
const { langIndex } = storeToRefs(globalStore);

const speech = useSpeechSynthesis("");
let synth: SpeechSynthesis;

onMounted(() => {
    if (speech.isSupported.value) {
        // load at last
        setTimeout(() => {
            synth = window.speechSynthesis;
            globalStore.setVoices(synth.getVoices());
        }, 10);
    }
});
</script>

<template>
    <div class="flex gap-3">
        <select
            class="flex-grow select select-bordered mb-3"
            v-model="langIndex"
            :disabled="!globalStore.voice"
        >
            <option disabled selected>Select language</option>
            <template v-for="(l, i) in globalStore.languages" :key="i">
                <option :value="i">
                    {{ `${i}: ${l.name}` }}
                </option>
            </template>
        </select>
        <div
            v-if="globalStore.voice"
            class="btn btn-success btn-square no-animation"
        >
            <Icon name="ph:check-fill" />
        </div>
        <div v-else class="btn btn-error btn-square no-animation">
            <Icon name="ph:x-fill" />
        </div>
    </div>
</template>
