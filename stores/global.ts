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
    const questions: Record<number, Question[]> = {
        0: [
            {
                id: "1N",
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
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "2N",
                content: "Okay, I will talk to you in Spanish now!",
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "3N",
                content:
                    "The Phone-a-local is a device that allows newcomers to request any type of help from locals or information desks.",
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "4N",
                content: "What would you want help with?",
                options: [
                    "Information on the station",
                    "Help with public transport",
                    "Tips about the Netherlands",
                ],
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "5N",
                content: "Okay, good! Who do you want to talk to?",
                options: [
                    "A local person",
                    "The information desk",
                    "Surprise me!",
                ],
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "6N",
                content:
                    "Okay, I will call up a local here in the station for you now!",
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "1L",
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
                recipientRole: Role.LOCAL,
            },
            {
                id: "2L",
                content: "Okay, I will talk to you in Dutch now!",
                recipientRole: Role.LOCAL,
            },
            {
                id: "3L",
                content:
                    "The Phone-a-local helps newcomers request for help from locals like you. There is a newcomer on the line who needs help with finding a train. Can you help them?",
                options: ["Yes", "No"],
                recipientRole: Role.LOCAL,
            },
            {
                id: "4L",
                content:
                    "Okay, thank you! I will connect you now! They are at platform 1. Also, they speak Spanish so I can translate if you want.",
                recipientRole: Role.LOCAL,
            },
            {
                id: "8N",
                content:
                    "Here is a local, I will connect you now! They are at platform 7. They speak Dutch so I can translate if you want",
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "9N",
                content: "Are you satisfied with the help you received?",
                options: ["Yes", "No"],
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "10N",
                content: "Glad I could help. Have a nice day!",
                recipientRole: Role.NEWCOMER,
            },
        ],
        1: [
            {
                id: "1N",
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
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "2N",
                content: "Okay, I will talk to you in Spanish now!",
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "3N",
                content:
                    "The Phone-a-local is a device that allows newcomers to request any type of help from locals or information desks.",
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "4N",
                content: "What would you want help with?",
                options: [
                    "Information on the station",
                    "Help with public transport",
                    "Tips about the Netherlands",
                ],
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "5N",
                content: "Okay, good! Who do you want to talk to?",
                options: [
                    "A local person",
                    "The information desk",
                    "Surprise me!",
                ],
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "6N",
                content: "Okay, I will call the information desk for you now!",
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "1L",
                content: "Hey, this is Phone-a-local.",
                recipientRole: Role.LOCAL,
            },
            {
                id: "2L",
                content:
                    "There is a newcomer on the line who needs help with tips on the Netherlands.",
                recipientRole: Role.LOCAL,
            },
            {
                id: "7N",
                content: "Are you satisfied with the help you received?",
                options: ["Yes", "No. Please help me again", "No"],
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "8N",
                content:
                    "Sorry to hear that. Would you like to talk to someone else?",
                options: [
                    "Yes - A local person",
                    "Yes - The information desk",
                    "No",
                ],
                recipientRole: Role.NEWCOMER,
            },
            {
                id: "9N",
                content:
                    "Okay, I will call up a local somewhere in the city for you now!",
                recipientRole: Role.NEWCOMER,
            },
        ],
    };

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
