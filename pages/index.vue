<script lang="ts" setup>
const route = useRoute();
</script>

<template>
    <NuxtLayout name="main">
        <template v-if="!route.query.chat">
            <ArduinoState />

            <div class="divider"></div>
        </template>

        <LangPicker class="mb-3" />

        <Conversation />

        <footer class="text-sm opacity-25">
            &copy; 2022 - Sebastiaan Benjamins
        </footer>
    </NuxtLayout>
</template>
