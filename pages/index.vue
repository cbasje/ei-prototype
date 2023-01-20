<script lang="ts" setup>
import { useGlobalStore } from "~~/stores/global";

const globalStore = useGlobalStore();
</script>

<template>
    <NuxtLayout name="main">
        <LangPicker />

        <Conversation v-if="globalStore.role !== undefined" />
        <RolePicker v-else />

        <footer class="text-sm opacity-25">
            &copy; 2022 - Sebastiaan Benjamins
        </footer>
    </NuxtLayout>
</template>
