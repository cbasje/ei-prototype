<script lang="ts" setup>
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();

$io.on("dial", (lang: number) => {
    console.log("DIAL");
    globalStore.langIndex = lang;
});

const languages = globalStore.languages.filter((l, i) => i < 10);
</script>

<template>
    <select class="select select-bordered" v-model="globalStore.langIndex">
        <option disabled selected>Select language</option>
        <template v-for="(l, i) in languages" :key="i">
            <option :value="i">
                {{ `${i % 10}: ${l.name}` }}
            </option>
        </template>
    </select>
</template>
