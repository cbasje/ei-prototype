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
    <h3>Environment</h3>

    <div
        class="outline-none"
        :tabindex="0"
        autofocus
        @keydown.prevent.space="playing = !playing"
    >
        <audio ref="environment" loop></audio>
        <button class="btn btn-primary" @click="playing = !playing">
            <Icon v-if="!playing" name="ph:play-fill" class="inline-block" />
            <Icon v-else name="ph:pause-fill" class="inline-block" />
        </button>
    </div>
</template>
