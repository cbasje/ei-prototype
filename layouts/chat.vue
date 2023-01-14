<template>
    <div class="navbar bg-base-100">
        <span class="btn btn-ghost normal-case text-xl">Phone-a-local</span>
    </div>

    <main
        class="container prose p-3 mx-auto flex flex-col"
        style="height: calc(100vh - 4rem)"
    >
        <slot />
    </main>
</template>
