<script lang="ts" setup>
const { $io } = useNuxtApp();

const play = async () => {
    $io.emit("ring");
};
</script>

<template>
    <h3>Rotary phone</h3>

    <div
        class="outline-none"
        :tabindex="0"
        autofocus
        @keydown.prevent.space="play"
    >
        <button class="btn btn-primary" @click="play">Ring</button>
    </div>
</template>
