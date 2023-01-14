<template>
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <NuxtLink href="/" class="btn btn-ghost normal-case text-xl">
                Phone-a-local
            </NuxtLink>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><NuxtLink href="/">Home</NuxtLink></li>
                <li><NuxtLink href="/chat">Chat</NuxtLink></li>
            </ul>
        </div>
    </div>

    <main class="container prose p-3 mx-auto h-[100vh]">
        <slot />
    </main>
</template>
