<script lang="ts" setup>
import { Role } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();
const route = useRoute();

const setRole = (role: Role) => {
    $io.emit("set-role", role);
    globalStore.role = role;
};

onMounted(() => {
    const { role } = route.query;
    if (role) setRole(role as unknown as Role);
});
</script>

<template>
    <div class="btn-group">
        <button class="btn" @click="setRole(Role.NEWCOMER)">Newcomer</button>
        <button class="btn" @click="setRole(Role.LOCAL)">Local</button>
    </div>
</template>
