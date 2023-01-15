import io from "socket.io-client";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const socket = io(config.public.socketURL, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 3,
    });

    return {
        provide: {
            io: socket,
        },
    };
});
