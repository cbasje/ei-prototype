<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import { Message, Role } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();

const questions = [
    `Hey, this is Phone-a-local. What language do you speak? Dial the number on the phone to choose an option.
    1 English.
    2 Deutsch.
    3 Français.
    4 Italiano.
    5 Español.
    6 汉语/漢語.
    7 日本語.
    8 Bahasa Indonesia.
    9 Türkçe.
    0 Nederlands.`,
    "Okay, I will talk to you in your language now!",
    "This phone can offer you help on lots of different topics by connecting you to a local here in the station or around the city. You can also choose to speak to a service worker from the train company",
    `What would you want help with?
    1 Information on the station.
    2 Help with public transport.
    3 Tips about the Netherlands.`,
    `Okay, good! Who do you want to talk to?
    1 A local.
    2 A service worker.
    3 Google.
    4 Surprise me!`,
    `Are you satisfied with the help you received?
    1 Yes.
    2 No. Please help me again.
    3 No.`,
];
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
    total: questions.length,
    page: 1,
    pageSize: 1,
});

const send = (content = newMessage.value, questionNumber?: number) => {
    const msg: Message = {
        id: uuid(),
        senderId: globalStore.id,
        origLang: "en-GB",
        content,
        timestamp: new Date().toString(),
        role: globalStore.role!,
        recipientRole: Role.NEWCOMER,
        questionNumber,
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
                    send(questions[currentPage - 1], currentPage);
                    currentPage++;
                }
            "
        >
            {{ questions[currentPage - 1] }}
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
        <button
            class="btn"
            @click="
                () => {
                    next();
                    response = null;
                }
            "
        >
            <Icon name="ph:caret-right-bold" />
        </button>
    </div>
    <form @submit.prevent="() => send()" class="flex flex-row gap-3">
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
