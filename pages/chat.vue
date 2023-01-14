<script lang="ts" setup>
const { $io } = useNuxtApp();

const msg = ref("");

const send = () => {
    $io.emit("send-chat", msg.value);
};
</script>

<template>
    <div class="h-[75vh] overflow-y-scroll">
        <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-primary">
                What kind of nonsense is this
            </div>
            <div class="chat-footer opacity-50">
                <Icon name="ph:translate-fill" />
                German
            </div>
        </div>
        <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-info">
                What kind of nonsense is this
            </div>
            <div class="chat-footer opacity-50">
                <Icon name="ph:robot-fill" />
                Phone-a-local
            </div>
        </div>
        <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-accent">
                You underestimate my power!
            </div>
            <div class="chat-footer opacity-50">
                <Icon name="ph:translate-fill" />
                Dutch
            </div>
        </div>
    </div>
    <form @submit.prevent="send()" class="flex-1 flex flex-row gap-3">
        <input
            type="text"
            v-model.lazy="msg"
            placeholder="Type a message..."
            class="input input-bordered w-full"
        />
        <button class="btn btn-primary">
            <Icon name="ph:paper-plane-tilt-fill" class="text-lg" />
        </button>
    </form>
</template>
