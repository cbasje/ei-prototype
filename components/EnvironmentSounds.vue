<script lang="ts" setup>
const environment = ref<HTMLAudioElement>();
const { playing, currentTime, duration, volume } = useMediaControls(
    environment,
    {
        src: "environment.mp4",
    }
);

onMounted(() => {
    volume.value = 0.9;
});
</script>

<template>
    <div
        class="outline-none"
        :tabindex="0"
        autofocus
        @keydown.prevent.space="playing = !playing"
    >
        <h2>Environment</h2>

        <audio ref="environment" loop autoplay></audio>
        <button class="btn" @click="playing = !playing">
            <Icon v-if="!playing" name="ph:play-fill" class="inline-block" />
            <Icon v-else name="ph:pause-fill" class="inline-block" />
        </button>
    </div>
</template>
