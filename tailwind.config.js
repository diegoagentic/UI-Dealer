/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                brand: {
                    50: "var(--color-brand-50)",
                    100: "var(--color-brand-100)",
                    200: "var(--color-brand-200)",
                    300: "var(--color-brand-300)",
                    400: "var(--color-brand-400)",
                    500: "var(--color-brand-500)",
                    600: "var(--color-brand-600)",
                    700: "var(--color-brand-700)",
                    800: "var(--color-brand-800)",
                    900: "var(--color-brand-900)",
                    950: "var(--color-brand-950)",
                    lime: "var(--color-brand-lime)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--fontFamily-sans)"],
                brand: ["var(--fontFamily-brand)"],
            },
            boxShadow: {
                "glow-sm": "var(--shadow-glow-sm)",
                "glow-md": "var(--shadow-glow-md)", // Standard
                "glow-lg": "var(--shadow-glow-lg)",
            },
        },
    },
    plugins: [],
}
