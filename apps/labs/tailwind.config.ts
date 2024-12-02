import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // "flex grid border",
    // { pattern: /^(w|h|min-w|min-h|max-w|max-h)-/ },
    // { pattern: /^(bg|text|border|fill|stroke)-/ },
    // { pattern: /^(font|leading|tracking|indent)-/ },
    // { pattern: /^(flex|grid|order|col|row)-/ },
    // { pattern: /^(justify|items|content|self|place)-/ },
    // { pattern: /^(overflow|overscroll)-/ },
    // { pattern: /^(inset|top|right|bottom|left|z)-/ },
    // { pattern: /^(opacity|scale|rotate|translate|skew)-/ },
    // { pattern: /^(transition|duration|ease|delay)-/ },
    // { pattern: /^(animate|cursor|pointer-events|select|resize|scroll)-/ },
    // { pattern: /^(rounded|shadow|outline|ring)-/ },
    // { pattern: /^(gap|space)-/ },
    // { pattern: /^flex-/ },
    // { pattern: /^p-/ },
    // { pattern: /^m-/ },
    // { pattern: /^grid-/ },
    // { pattern: /^border-/ },
    // { pattern: /^bg-/, variants: ['hover'], },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },

} satisfies Config;

