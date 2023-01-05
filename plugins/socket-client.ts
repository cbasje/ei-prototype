import io from "socket.io-client";

export default defineNuxtPlugin(() => {
    const url = "https://localhost:3333";

    const socket = io(url, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 10,
    });

    return {
        provide: {
            io: socket,
        },
    };
});
