<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import { Message, Role } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();

const input = ref<HTMLInputElement | null>(null);
const newMessage = ref("");
const speechText = ref("");

const { speak } = useSpeechSynthesis(speechText, {
    lang: globalStore.lang.code,
    volume: 1,
    rate: 0.9,
});

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
$io.on("receive-message", (msg: Message) => {
    globalStore.messages.push(msg);

    if (msg.role === Role.ADMIN && msg.recipientRole === globalStore.role) {
        // TODO: translate
        speechText.value = msg.content;
        speak();
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
    <div class="flex-grow overflow-y-scroll">
        <template v-for="m in globalStore.messages" :key="m.id">
            <div
                v-if="
                    (m.role === Role.ADMIN &&
                        m.recipientRole === globalStore.role) ||
                    m.role !== Role.ADMIN
                "
                :class="[
                    'chat',
                    m.senderId === globalStore.id ? 'chat-end' : 'chat-start',
                ]"
            >
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
