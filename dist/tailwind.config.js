"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                cyprus: {
                    "50": "#effefd",
                    "100": "#c8fffb",
                    "200": "#90fff7",
                    "300": "#51f7f2",
                    "400": "#1de4e4",
                    "500": "#05c3c7",
                    "600": "#009ba1",
                    "700": "#057a80",
                    "800": "#0a5f65",
                    "900": "#0e4e53",
                    "950": "#003c43",
                },
                casal: {
                    "50": "#ebfffc",
                    "100": "#cdfffa",
                    "200": "#a2fff9",
                    "300": "#61fff8",
                    "400": "#1af6ef",
                    "500": "#00dcd8",
                    "600": "#01b3b9",
                    "700": "#098e95",
                    "800": "#117179",
                    "900": "#135d66",
                    "950": "#063f46",
                },
                "gulf-stream": {
                    "50": "#f4f9f8",
                    "100": "#dbece9",
                    "200": "#b7d8d3",
                    "300": "#77b0aa",
                    "400": "#649d99",
                    "500": "#4a827f",
                    "600": "#396866",
                    "700": "#315453",
                    "800": "#2a4544",
                    "900": "#263b3a",
                    "950": "#122021",
                },
                "white-ice": {
                    "50": "#e3fef7",
                    "100": "#cefdef",
                    "200": "#a1f9e3",
                    "300": "#65f0d6",
                    "400": "#28dfc3",
                    "500": "#03c6ae",
                    "600": "#00a18f",
                    "700": "#008176",
                    "800": "#00665f",
                    "900": "#01534f",
                    "950": "#002f2e",
                },
            },
        },
    },
    plugins: [],
};
exports.default = config;
