<script lang="ts" setup>
type Option = {
    text: string;
    lang: string;
};

const options: Option[] = [
    {
        text: "Hoi, bedankt voor het oppakken! Dit is een telefoon voor iedereen die hulp nodig heeft in het station.",
        lang: "nl-BE",
    },
    {
        text: "Aan de andere kant van de lijn is iemand die hulp nodig heeft met het vinden van een trein. Kun je daar mee helpen?",
        lang: "nl-BE",
    },
    {
        text: "Oké, dat is prima. Fijne dag!",
        lang: "nl-BE",
    },
    {
        text: "Oké, dan verbind ik jullie nu! De persoon spreekt Engels.",
        lang: "nl-BE",
    },
    {
        text: "Hey, thanks for picking up! This phone connects you to locals who can help you.",
        lang: "en-ZA",
    },
    {
        text: "What do you need help with?",
        lang: "en-ZA",
    },
    {
        text: "Okay, I am calling now!",
        lang: "en-ZA",
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
                    placeholder="Type an extra option here..."
                    class="input input-bordered w-full max-w-sm"
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
    <!-- <div
        class="collapse collapse-arrow w-full border border-base-content bg-base-100 rounded-box"
    >
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
            Focus me to see content
        </div>
        <div class="collapse-content">
            <p>tabindex="0" attribute is necessary to make the div focusable</p>
        </div>
    </div> -->
    <!-- <div className="overflow-x-auto">
        <ul className="steps">
            <li className="step">start</li>
            <li className="step step-secondary">2</li>
            <li className="step step-secondary">3</li>
            <li className="step step-secondary">4</li>
            <li className="step">5</li>
            <li className="step step-accent">6</li>
            <li className="step step-accent">7</li>
            <li className="step">8</li>
            <li className="step step-error">9</li>
            <li className="step step-error">10</li>
            <li className="step">11</li>
            <li className="step">12</li>
            <li className="step step-warning">13</li>
            <li className="step step-warning">14</li>
            <li className="step">15</li>
            <li className="step step-neutral">16</li>
            <li className="step step-neutral">17</li>
            <li className="step step-neutral">18</li>
            <li className="step step-neutral">19</li>
            <li className="step step-neutral">20</li>
            <li className="step step-neutral">21</li>
            <li className="step step-neutral">22</li>
            <li className="step step-neutral">23</li>
            <li className="step step-neutral">end</li>
        </ul>
    </div> -->
</template>
