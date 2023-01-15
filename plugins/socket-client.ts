import io from "socket.io-client";
import { v4 as uuid } from "uuid";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const id = uuid();

    const socket = io(config.public.socketURL, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 3,
        query: { id },
    });

    return {
        provide: {
            io: socket,
        },
    };
});
