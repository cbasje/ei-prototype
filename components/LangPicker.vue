<script lang="ts" setup>
import { useGlobalStore } from "~~/stores/global";

const globalStore = useGlobalStore();
</script>

<template>
    <select class="select select-bordered" v-model="globalStore.langIndex">
        <option disabled selected>Select language</option>
        <template v-for="(l, i) in globalStore.languages" :key="i">
            <option :value="i">{{ `${(i + 1) % 10}: ${l.name}` }}</option>
        </template>
    </select>
</template>
