import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { Language, Message, Question, Role } from "~~/lib/types";

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
        { code: "sv-SE", name: "🇸🇪 Svenska" },
        { code: "uk-UA", name: "🇺🇦 украї́нська мо́ва" },
        { code: "pt-PT", name: "🇵🇹 Português" },
    ];
    const questions: Question[] = [
        {
            content:
                "Hey, this is Phone-a-local. What language do you speak? Dial the number on the phone to choose an option.",
            options: [
                "English",
                "Deutsch",
                "Français",
                "Italiano",
                "Español",
                "汉语/漢語",
                "日本語",
                "Bahasa Indonesia",
                "Türkçe",
                "Nederlands",
            ],
        },
        { content: "Okay, I will talk to you in your language now!" },
        {
            content:
                "This phone can offer you help on lots of different topics by connecting you to a local here in the station or around the city. You can also choose to speak to a service worker from the train company",
        },
        {
            content: "What would you want help with?",
            options: [
                "Information on the station",
                "Help with public transport",
                "Tips about the Netherlands",
            ],
        },
        {
            content: "Okay, good! Who do you want to talk to?",
            options: [
                "A local person",
                "A service worker",
                "Google",
                "Surprise me!",
            ],
        },
        {
            content: "Are you satisfied with the help you received?",
            options: ["Yes", "No. Please help me again", "No"],
        },
        {
            content:
                "I'm sorry you were not satisfied. What would you want help with?",
            options: [
                "Information on the station",
                "Help with public transport",
                "Tips about the Netherlands",
            ],
        },
    ];

    const id = ref(uuid());
    const langIndex = ref(1);
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
        questions,
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
