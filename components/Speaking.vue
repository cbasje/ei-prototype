<script lang="ts" setup>
const options = [
    "Hello!",
    "Qui incididunt laboris nulla sunt deserunt cillum sunt ipsum magna aute nostrud laborum.",
];
const optionIndex = ref(0);

const text = computed(() => options[optionIndex.value]);

const { isPlaying, status, speak } = useSpeechSynthesis(text, {
    lang: "en-GB",
    volume: 1,
});

const play = (index: number) => {
    optionIndex.value = index;

    if (status.value === "pause") {
        console.log("resume");
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
    <ul class="flex flex-col gap-3 list-none pl-0">
        <h2 class="mb-2">Speaking</h2>

        <li
            v-for="(o, i) in options"
            :key="o"
            class="flex flex-row self-stretch justify-between pl-0"
        >
            <span>{{ o }}</span>
            <div class="btn-group">
                <button
                    class="btn btn-primary"
                    :disabled="isPlaying && optionIndex === i"
                    @click="() => play(i)"
                >
                    {{
                        status === "pause" && optionIndex === i
                            ? "Resume"
                            : "Speak"
                    }}
                </button>
                <button
                    class="btn btn-warning"
                    :disabled="!(isPlaying && optionIndex === i)"
                    @click="pause"
                >
                    Pause
                </button>
                <button
                    class="btn btn-error"
                    :disabled="!(isPlaying && optionIndex === i)"
                    @click="stop"
                >
                    Stop
                </button>
            </div>
        </li>
    </ul>
</template>
