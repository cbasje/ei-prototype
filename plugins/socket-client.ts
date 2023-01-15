import io from "socket.io-client";
import { useGlobalStore } from "~~/stores/global";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const globalStore = useGlobalStore(nuxtApp.$pinia);

    const socket = io(config.public.socketURL, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 3,
        query: { id: globalStore.id },
    });

    return {
        provide: {
            io: socket,
        },
    };
});
