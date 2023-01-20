<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { v4 as uuid } from "uuid";
import { Message, Role } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();
const { voice } = storeToRefs(globalStore);

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

const send = () => {
    const msg: Message = {
        id: uuid(),
        senderId: globalStore.id,
        origLang: globalStore.lang.code,
        content: newMessage.value,
        timestamp: new Date().toString(),
        role: globalStore.role!,
    };

    $io.emit("send-message", msg);
    globalStore.messages.push(msg);

    newMessage.value = "";
    input.value!.value = "";
};
$io.on("receive-message", async (msg: Message) => {
    let message = msg;

    if (message.origLang !== globalStore.lang.code) {
        const { translations } = await $fetch("/api/translation", {
            query: { text: msg.content, lang: globalStore.lang.code },
        });
        message = { ...msg, content: translations[0].text };
    }

    globalStore.messages.push(message);

    if (container.value !== null)
        container.value.scrollTop = container.value.scrollHeight + 48;

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

const formatTimestamp = (timestamp: string) => {
    return Intl.DateTimeFormat(globalStore.lang.code, {
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
                    m.senderId === globalStore.id ? 'chat-end' : 'chat-start',
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
                    v-else-if="m.origLang !== globalStore.lang.code"
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
    <form @submit.prevent="send()" class="flex flex-row gap-3">
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
