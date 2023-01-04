<template>
    <div class="flex flex-col w-full h-screen overflow-hidden">
        <h2>Arduino</h2>

        <span>{{ x }}, {{ y }}</span>
        <span>{{ xy }}</span>
        <span>{{ xyText }}</span>
        <span>{{ width }}, {{ height }}</span>
        <span>{{ $io.id }}</span>
        <pre>{{ state }}</pre>
        <div class="h-full w-full top-0 right-0 bottom-0 left-0 z-100 fixed">
            <div class="h-full w-full relative">
                <div
                    v-for="(s, skey) in state"
                    :key="skey"
                    class="bg-red-400 rounded-2xl h-[10px] w-[10px] absolute"
                    :style="{ top: s.y * 100 + '%', left: s.x * 100 + '%' }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { $io } = useNuxtApp();

$io.on("connect", () => {
    console.log(":connect");
});
$io.on("disconnect", () => {
    console.log(":disconnect");
});

const { x, y } = useMouse();
const { width, height } = useWindowSize();
const xy = computed(() => {
    return {
        x: x.value / width.value,
        y: y.value / height.value,
    };
});
const xyText = computed(() => `${x.value}-${y.value}`);
const state = ref({}) as any;
watch(
    () => xyText.value,
    (to) => {
        // console.log(':to', to);
        $io.emit("move", { x: xy.value.x, y: xy.value.y });
    }
);
$io.on("state", (e) => {
    // console.log(':state', e);
    state.value = e;
});
</script>
