import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { Language, Message, Role } from "~~/lib/types";

export const useGlobalStore = defineStore("global", () => {
    const languages: Language[] = [
        { code: "nl-BE", name: "🇳🇱 Nederlands" },
        { code: "en-GB", name: "🇬🇧 English" },
        { code: "de-DE", name: "🇩🇪 Deutsch" },
        { code: "fr-FR", name: "🇫🇷 Français" },
        { code: "it-IT", name: "🇮🇹 Italiano" },
        { code: "es-MX", name: "🇪🇸 Español" },
        { code: "zh-CN", name: "🇨🇳 汉语/漢語" },
        { code: "ja-JP", name: "🇯🇵 日本語" },
        { code: "id-ID", name: "🇮🇩 Bahasa Indonesia" },
        { code: "tr-TR", name: "🇹🇷 Türkçe" },
        { code: "pl-PL", name: "🇵🇱 Polski" },
    ];

    const id = ref(uuid());
    const langIndex = ref(0);
    const voices = ref<SpeechSynthesisVoice[]>([]);
    const role = ref<Role | undefined>(undefined);
    const messages = ref<Message[]>([]);

    const lang = computed(() => languages[langIndex.value]);
    const voice = computed(() => voices.value[langIndex.value]);

    function setVoices(synthVoices: SpeechSynthesisVoice[]) {
        voices.value = synthVoices.reduce((prevValue, curValue, i) => {
            let newArr = prevValue;
            const index = languages.findIndex((l) => l.code === curValue.lang);

            if (
                curValue.localService &&
                index !== -1 &&
                !prevValue.some((v) => v.lang === curValue.lang)
            ) {
                newArr[index] = curValue;
            }

            return newArr;
        }, [] as SpeechSynthesisVoice[]);
    }

    return {
        languages,
        id,
        langIndex,
        voices,
        role,
        messages,
        lang,
        voice,
        setVoices,
    };
});
