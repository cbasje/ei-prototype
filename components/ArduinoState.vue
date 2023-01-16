<script lang="ts" setup>
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();

const globalStore = useGlobalStore();
const receiverState = ref(false);

$io.on("receiver", (state: boolean) => {
    receiverState.value = state;
});
$io.on("dial", (lang: number) => {
    console.log("DIAL");
    globalStore.langIndex = lang;
});

const play = async () => {
    $io.emit("ring");
};
const reset = async () => {
    $io.emit("reset-conversation");
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

        <div class="btn-group">
            <button
                class="btn btn-outline px-6 h-auto"
                @click="play"
                :disabled="receiverState"
            >
                <Icon name="ph:phone-call-fill" class="text-xl" />
            </button>
            <button class="btn btn-outline px-6 h-auto" @click="reset">
                <Icon name="ph:clock-counter-clockwise-fill" class="text-xl" />
            </button>
        </div>
    </div>
</template>
