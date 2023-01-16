<script lang="ts" setup>
import { Role } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();

onMounted(() => {
    $io.emit("set-role", Role.ADMIN);
    globalStore.role = Role.ADMIN;
});
</script>

<template>
    <NuxtLayout name="main">
        <ArduinoState />

        <div class="divider"></div>

        <Script />

        <footer class="text-sm opacity-25">
            &copy; 2022 - Sebastiaan Benjamins
        </footer>
    </NuxtLayout>
</template>
