<script lang="ts" setup>
const tabs = ["Options", "Translation"];
const currentTab = ref(0);
</script>

<template>
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
    <SpeakingScript v-if="currentTab === 0" />
    <SpeakingTranslate v-if="currentTab === 1" />
</template>
