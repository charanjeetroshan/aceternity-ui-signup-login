/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",

      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         keyframes: {
            "caret-blink": {
               "0%,70%,100%": { opacity: "1" },
               "20%,50%": { opacity: "0" },
            },
            move: {
               "0%": { transform: "translateX(-200px)" },
               "100%": { transform: "translateX(200px)" },
            },
         },
         animation: {
            "caret-blink": "caret-blink 1.2s ease-out infinite",
            move: "move 5s linear infinite",
         },
      },
   },
   plugins: [],
};
