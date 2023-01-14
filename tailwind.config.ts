import type { Config } from "tailwindcss";

export default <Partial<Config>>{
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: ["pastel"],
    },
};
