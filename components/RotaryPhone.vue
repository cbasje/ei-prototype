<script lang="ts" setup>
const rotaryPhone = ref<HTMLAudioElement>();
const { playing, currentTime, duration, volume } = useMediaControls(
    rotaryPhone,
    {
        src: "rotary-phone.mp4",
    }
);

const formatDuration = (seconds: number) =>
    new Date(1000 * seconds).toISOString().slice(14, 19);

const play = async () => {
    if (!playing.value) {
        const repeatTimes = 5;
        const repeatDelay = 4 * 1000;

        const a = Array(repeatTimes);
        for await (const iterator of a) {
            playing.value = true;

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, repeatDelay);
            });
        }
    } else {
        playing.value = false;
    }
};

onMounted(() => {
    volume.value = 0.5;
});
</script>

<template>
    <h3>Rotary phone</h3>

    <div
        class="outline-none"
        :tabindex="0"
        autofocus
        @keydown.prevent.space="play"
    >
        <audio ref="rotaryPhone"></audio>

        <div class="flex flex-row items-center gap-3">
            <button class="btn btn-primary" @click="play">
                <Icon
                    v-if="!playing"
                    name="ph:play-fill"
                    class="inline-block"
                />
                <Icon v-else name="ph:pause-fill" class="inline-block" />
            </button>
            <div class="flex flex-col gap-1">
                <progress
                    class="progress progress-secondary w-56"
                    :value="currentTime"
                    :max="duration"
                ></progress>
                <span class="flex flex-col flex-1 text-sm">
                    {{ formatDuration(currentTime) }} /
                    {{ formatDuration(duration) }}
                </span>
            </div>
        </div>
    </div>
</template>
