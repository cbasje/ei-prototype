<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import { Message, Role } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();

const send = (content: string) => {
    const msg: Message = {
        id: uuid(),
        senderId: globalStore.id,
        origLang: globalStore.lang.code,
        content,
        timestamp: new Date().toString(),
        role: globalStore.role!,
        recipientRole: Role.NEWCOMER,
    };

    $io.emit("send-message", msg);
};
</script>

<template>
    <button class="btn btn-primary" @click="() => send('Hey, hello!')">
        click!
    </button>
</template>
