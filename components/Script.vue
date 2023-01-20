<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import { Message, Role } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();

const newMessage = ref("");
const response = ref<string | null>(null);

const {
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next,
} = useOffsetPagination({
    total: globalStore.questions.length,
    page: 1,
    pageSize: 1,
    onPageChange: () => {
        response.value = null;
    },
});

const sendMessage = (content?: string, questionIndex?: number) => {
    const msg: Message = {
        id: uuid(),
        senderId: globalStore.id,
        origLang: "en-GB",
        content,
        timestamp: new Date().toString(),
        role: globalStore.role!,
        recipientRole: Role.NEWCOMER,
        questionIndex,
    };

    $io.emit("send-message", msg);
};

$io.on("dial", (number: number) => {
    response.value = `${number}`;
});
</script>

<template>
    <div class="flex-grow overflow-y-scroll">
        <button
            class="btn btn-primary h-auto py-3"
            @click="
                () => {
                    sendMessage(undefined, currentPage - 1);
                    currentPage++;
                }
            "
        >
            {{ globalStore.questions[currentPage - 1].content }}
        </button>
        <template v-if="response !== null">
            <div class="btn btn-accent h-auto py-3 no-animation">
                {{ response }}
            </div>
        </template>
    </div>
    <div class="btn-group my-3">
        <button class="btn" @click="prev">
            <Icon name="ph:caret-left-bold" />
        </button>
        <template v-for="i in pageCount" :key="i">
            <button
                :class="{ btn: true, 'btn-active': i === currentPage }"
                @click="() => (currentPage = i)"
            >
                {{ i }}
            </button>
        </template>
        <button class="btn" @click="next()">
            <Icon name="ph:caret-right-bold" />
        </button>
    </div>
    <form @submit.prevent="() => sendMessage()" class="flex flex-row gap-3">
        <input
            ref="input"
            type="text"
            v-model.lazy="newMessage"
            placeholder="Type a message..."
            class="input input-bordered w-full"
        />
        <button type="submit" class="btn btn-primary">
            <Icon name="ph:paper-plane-tilt-fill" class="text-lg" />
        </button>
    </form>
</template>
