<script lang="ts" setup>
const voice = ref<SpeechSynthesisVoice>(
    undefined as unknown as SpeechSynthesisVoice
);
const text = ref("Hello");

const speech = useSpeechSynthesis(text, { voice });

let synth: SpeechSynthesis;
const voices = ref<SpeechSynthesisVoice[]>([]);

onMounted(() => {
    if (speech.isSupported.value) {
        setTimeout(() => {
            synth = window.speechSynthesis;
            voices.value = synth.getVoices();
            voice.value = voices.value[0];
        });
    }
});

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
    <div>
        <div v-if="!speech.isSupported">Your browser is stupid</div>
        <div v-else>
            <input type="text" v-model="text" />

            <br />
            <select v-model="voice">
                <option selected disabled>Select language</option>
                <option v-for="(v, i) in voices" :key="i" :value="v">
                    {{ `${v.name} (${v.lang})` }}
                </option>
            </select>
            {{ voices.map((v) => v.name) }}

            <button :disabled="speech.isPlaying.value" @click="play">
                {{ speech.status.value === "pause" ? "Resume" : "Speak" }}
            </button>
            <button :disabled="!speech.isPlaying.value" @click="pause">
                Pause
            </button>
            <button :disabled="!speech.isPlaying.value" @click="stop">
                Stop
            </button>
        </div>
    </div>
</template>
