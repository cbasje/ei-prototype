<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import { Message } from "~~/lib/types";
import { useGlobalStore } from "~~/stores/global";

const { $io } = useNuxtApp();
const globalStore = useGlobalStore();

const newMessage = ref("");
const messages = ref<Message[]>([]);

const send = () => {
    const msg: Message = {
        id: uuid(),
        senderId: globalStore.id,
        origLang: globalStore.lang.code,
        content: newMessage.value,
        timestamp: new Date().toString(),
    };

    $io.emit("send-message", msg);
    messages.value.push(msg);
    newMessage.value = "";
};
$io.on("update-conversation", (conversation: Message[]) => {
    messages.value = conversation;
});
</script>

<template>
    <div class="flex-grow overflow-y-scroll">
        <template v-for="m in messages" :key="m.id">
            <div
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
                            : m.senderId === 'PHONE'
                            ? 'chat-bubble-info'
                            : 'chat-bubble-accent',
                    ]"
                >
                    {{ m.content }}
                </div>
                <div
                    v-if="m.senderId === 'PHONE'"
                    class="chat-footer opacity-50"
                >
                    <Icon name="ph:robot-fill" />
                    Phone-a-local • {{ new Date(m.timestamp).toLocaleString() }}
                </div>
                <div
                    v-else-if="m.origLang !== globalStore.lang.code"
                    class="chat-footer opacity-50"
                >
                    <Icon name="ph:translate-fill" />
                    {{ m.origLang }} •
                    {{ new Date(m.timestamp).toLocaleString() }}
                </div>
                <div v-else class="chat-footer opacity-50">
                    {{ new Date(m.timestamp).toLocaleString() }}
                </div>
            </div>
        </template>
    </div>
    <form @submit.prevent="send()" class="flex flex-row gap-3">
        <input
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
