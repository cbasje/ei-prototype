<script lang="ts" setup>
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();

const globalStore = useGlobalStore();
const receiverState = ref(false);

const { speak } = useSpeechSynthesis(
    `








Hey, how are you?`,
    {
        lang: "en-GB",
        volume: 1,
        rate: 0.9,
    }
);

$io.on("receiver", (state: boolean) => {
    receiverState.value = state;

    if (state) {
        console.log("🗣️");
        speak();
    }
});
$io.on("dial", (lang: number) => {
    globalStore.langIndex = lang;
});
const play = async () => {
    $io.emit("ring");
};
</script>

<template>
    <div class="flex flex-row items-stretch gap-3 mb-3">
        <div v-if="receiverState" class="alert alert-success">
            <div>
                <Icon
                    name="ph:check-circle-fill"
                    class="flex-shrink-0 text-xl"
                />
                <span>Picked up</span>
            </div>
        </div>
        <div v-else class="alert alert-error">
            <div>
                <Icon name="ph:x-circle-fill" class="flex-shrink-0 text-xl" />
                <span>Static</span>
            </div>
        </div>

        <button
            class="btn btn-outline px-6 h-auto"
            @click="play"
            :disabled="receiverState"
        >
            <Icon name="ph:phone-call-fill" class="text-xl" />
        </button>
    </div>
</template>
