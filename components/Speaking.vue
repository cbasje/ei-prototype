<script lang="ts" setup>
type Option = {
    text: string;
    lang: string;
};

const options: Option[] = [
    {
        text: "Hey, this is the hotline for everyone who needs help.",
        lang: "en-ZA",
    },
    {
        text: "Hoi, dit is de hotline voor iedereen die hulp nodig heeft.",
        lang: "nl-BE",
    },
    {
        text: "Hey, esta es la línea directa para todos los que necesitan ayuda.",
        lang: "es-US",
    },
    {
        text: "Hej, det här är en telefonjour för alla som behöver hjälp.",
        lang: "sv-SE",
    },
    {
        text: "嘿，这是每个需要帮助的人的热线电话",
        lang: "zh-CN",
    },
];
const optionIndex = ref(0);
const extraOption = reactive<Option>({
    text: "",
    lang: "en-ZA",
});

const text = computed(() =>
    optionIndex.value === 999
        ? extraOption.text
        : options[optionIndex.value].text
);
const lang = computed(() =>
    optionIndex.value === 999
        ? extraOption.lang
        : options[optionIndex.value].lang
);

const { isPlaying, status, speak } = useSpeechSynthesis(text, {
    lang,
    volume: 1,
    rate: 0.85,
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
    <ul class="w-full flex flex-col gap-3 list-none pl-0">
        <h2 class="mb-2">Speaking</h2>

        <li
            v-for="(o, i) in options"
            :key="o.text"
            class="flex flex-row self-stretch justify-between gap-3 pl-0"
        >
            <span>{{ o.text }}</span>
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
        <li class="flex flex-row self-stretch justify-between gap-3 pl-0">
            <form @submit.prevent="play(999)" class="flex-1">
                <input
                    type="text"
                    v-model="extraOption.text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-sm"
                />
            </form>
            <div class="btn-group">
                <button
                    class="btn btn-primary"
                    :disabled="isPlaying && optionIndex === 999"
                    @click="() => play(999)"
                >
                    {{
                        status === "pause" && optionIndex === 999
                            ? "Resume"
                            : "Speak"
                    }}
                </button>
                <button
                    class="btn btn-warning"
                    :disabled="!(isPlaying && optionIndex === 999)"
                    @click="pause"
                >
                    Pause
                </button>
                <button
                    class="btn btn-error"
                    :disabled="!(isPlaying && optionIndex === 999)"
                    @click="stop"
                >
                    Stop
                </button>
            </div>
        </li>
    </ul>
</template>
