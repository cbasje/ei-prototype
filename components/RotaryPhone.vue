<script lang="ts" setup>
const loop = ref(false);
const rotaryPhone = ref<HTMLAudioElement>();
const { playing, currentTime, duration, volume } = useMediaControls(
    rotaryPhone,
    {
        src: "rotary-phone.mp4",
    }
);

const formatDuration = (seconds: number) =>
    new Date(1000 * seconds).toISOString().slice(14, 19);

onMounted(() => {
    volume.value = 0.5;
});
</script>

<template>
    <div
        class="outline-none"
        :tabindex="0"
        autofocus
        @keydown.prevent.space="playing = !playing"
    >
        <h2>Rotary phone</h2>

        <audio ref="rotaryPhone" :loop="loop"></audio>
        <button class="btn" @click="playing = !playing">
            <Icon v-if="!playing" name="ph:play-fill" class="inline-block" />
            <Icon v-else name="ph:pause-fill" class="inline-block" />
        </button>
        <span class="flex flex-col flex-1 text-sm">
            {{ formatDuration(currentTime) }} /
            {{ formatDuration(duration) }}
        </span>
    </div>
</template>
