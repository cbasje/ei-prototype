<script lang="ts" setup>
const tabs = ["Options", "Translation"];
const currentTab = ref(0);
</script>

<template>
    <main class="flex flex-col justify-start items-start gap-3 p-3">
        <h1>EI prototype</h1>

        <EnvironmentSounds />
        <RotaryPhone />
        <Arduino />

        <h2>Speaking</h2>
        <div class="tabs">
            <template v-for="(t, i) in tabs" :key="t">
                <a
                    :class="[
                        'tab tab-lg tab-lifted',
                        currentTab === i ? 'tab-active' : '',
                    ]"
                    @click="currentTab = i"
                >
                    {{ t }}
                </a>
            </template>
        </div>
        <Speaking v-if="currentTab === 0" />
        <SpeakingTranslate v-if="currentTab === 1" />

        <footer class="text-sm opacity-25">
            &copy; 2022 - Sebastiaan Benjamins
        </footer>
    </main>
</template>
