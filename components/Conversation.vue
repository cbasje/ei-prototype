<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { v4 as uuid } from "uuid";
import { Message, Role } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();
const { lang, langIndex, voice } = storeToRefs(globalStore);

const input = ref<HTMLInputElement | null>(null);
const container = ref<HTMLDivElement | null>(null);
const newMessage = ref("");
const speechText = ref("");

const speech = useSpeechSynthesis(speechText, {
    voice,
    rate: 0.9,
});
const speakText = (text: string) => {
    speechText.value = text;
    nextTick(() => {
        speech.speak();
    });
};

const addMessage = (msg: Message) => {
    globalStore.messages.push(msg);

    nextTick(() => {
        if (container.value !== null) {
            const children = container.value.children;

            if (children.length > 0) {
                const lastChild = children[children.length - 1];
                container.value.scrollTop =
                    container.value.scrollHeight +
                    lastChild.getBoundingClientRect().height;
            }
        }
    });
};
const sendMessage = () => {
    const msg: Message = {
        id: uuid(),
        senderId: globalStore.id,
        origLang: lang.value.code,
        content: newMessage.value,
        timestamp: new Date().toString(),
        role: globalStore.role!,
    };

    $io.emit("send-message", msg);
    addMessage(msg);

    newMessage.value = "";
    input.value!.value = "";
};
$io.on("receive-message", async (msg: Message) => {
    let message = msg;

    if (message.origLang !== lang.value.code) {
        const { translations } = await $fetch("/api/translation", {
            query: { text: msg.content, lang: lang.value.code },
        });
        message = { ...msg, content: translations[0].text };
    }

    addMessage(message);

    if (
        message.role === Role.ADMIN &&
        message.recipientRole === globalStore.role
    ) {
        speakText(message.content);
    }
});
$io.on("update-conversation", (conversation: Message[]) => {
    globalStore.messages = conversation;
});

$io.on("dial", (number: number) => {
    const messagesFromAdmin = globalStore.messages.filter(
        (m) => m.role === Role.ADMIN
    );
    if (messagesFromAdmin[messagesFromAdmin.length - 1]?.questionNumber === 1)
        langIndex.value = number;

    addMessage({
        id: uuid(),
        senderId: globalStore.id,
        origLang: lang.value.code,
        content: `${number}`,
        timestamp: new Date().toString(),
        role: globalStore.role!,
    });
});

const formatTimestamp = (timestamp: string) => {
    return Intl.DateTimeFormat(lang.value.code, {
        dateStyle: undefined,
        timeStyle: "short",
    }).format(new Date(timestamp));
};
</script>

<template>
    <div ref="container" class="flex-grow overflow-y-scroll">
        <template v-for="m in globalStore.messages" :key="m.id">
            <div
                v-if="
                    (m.role === Role.ADMIN &&
                        m.recipientRole === globalStore.role) ||
                    m.role !== Role.ADMIN
                "
                :class="[
                    'chat flex flex-col',
                    m.senderId === globalStore.id
                        ? 'chat-end items-end justify-end'
                        : 'chat-start',
                ]"
            >
                <div class="flex">
                    <div
                        :class="[
                            'chat-bubble',
                            m.senderId === globalStore.id
                                ? 'chat-bubble-primary'
                                : m.role === Role.ADMIN
                                ? 'chat-bubble-info'
                                : 'chat-bubble-accent',
                        ]"
                    >
                        {{ m.content }}
                    </div>
                    <button
                        class="btn btn-ghost btn-circle"
                        @click="() => speakText(m.content)"
                    >
                        <Icon name="ph:speaker-high-fill" />
                    </button>
                </div>

                <div
                    v-if="m.role === Role.ADMIN"
                    class="chat-footer opacity-50"
                >
                    <Icon name="ph:robot-fill" />
                    Phone-a-local • {{ formatTimestamp(m.timestamp) }}
                </div>

                <div
                    v-else-if="m.origLang !== lang.code"
                    class="chat-footer opacity-50"
                >
                    <Icon name="ph:translate-fill" />
                    {{ m.origLang }} •
                    {{ formatTimestamp(m.timestamp) }}
                </div>
                <div v-else class="chat-footer opacity-50">
                    {{ formatTimestamp(m.timestamp) }}
                </div>
            </div>
        </template>
    </div>
    <form @submit.prevent="sendMessage()" class="flex flex-row gap-3">
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
