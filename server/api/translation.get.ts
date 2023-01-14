export interface TranslationData {
    translations: Translation[];
}

export interface Translation {
    detected_source_language: string;
    text: string;
}

export default defineEventHandler((event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);

    const text = String(query.text);
    const lang = String(query.lang).split("-")[0].toUpperCase();

    const data = $fetch<TranslationData>(
        "https://api-free.deepl.com/v2/translate",
        {
            method: "POST",
            headers: {
                Authorization: `DeepL-Auth-Key ${config.apiKey}`,
            },
            query: {
                text,
                target_lang: lang,
            },
        }
    );

    return data;
});
