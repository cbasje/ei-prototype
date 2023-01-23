<script lang="ts" setup>
import { Role } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();

const scenario = ref<number | null>(null);

onMounted(() => {
    $io.emit("set-role", Role.ADMIN);
    globalStore.role = Role.ADMIN;
});
</script>

<template>
    <NuxtLayout name="main">
        <ArduinoState />

        <div class="divider"></div>

        <Script v-if="scenario !== null" :scenario="scenario" />
        <div v-else class="btn-group">
            <button class="btn" @click="scenario = 0">Tickets</button>
            <button class="btn" @click="scenario = 1">Groceries</button>
        </div>

        <footer class="text-sm opacity-25">
            &copy; 2022 - Sebastiaan Benjamins
        </footer>
    </NuxtLayout>
</template>
