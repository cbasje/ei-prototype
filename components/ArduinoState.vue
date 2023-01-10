<script lang="ts" setup>
const receiverState = ref(false);

// SocketIO emits
const { $io } = useNuxtApp();

$io.on("receiver", (state: boolean) => {
    receiverState.value = state;
});
</script>

<template>
    <div v-if="receiverState" class="alert alert-success shadow-lg mb-5">
        <div>
            <Icon name="ph:check-circle" class="flex-shrink-0 h-6 w-6" />
            <span>Picked up</span>
        </div>
    </div>
    <div v-else class="alert alert-error shadow-lg mb-5">
        <div>
            <Icon name="ph:x-circle" class="flex-shrink-0 h-6 w-6" />
            <span>Static</span>
        </div>
    </div>
</template>
