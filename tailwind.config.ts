import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- Direção visual: Xiaomi Store Leme ----
        void: "#0A0A0B",        // preto profundo, fundo principal
        graphite: "#17181A",    // superfícies elevadas sobre o void
        steel: "#6B6C70",       // texto secundário / metal fosco
        mist: "#C7C8CC",        // divisores, linhas, metal claro
        bone: "#EDEBE6",        // texto principal sobre fundo escuro
        porcelain: "#F5F3EF",   // fundo claro (quebra editorial)
        signal: "#FF6A2B",      // laranja Xiaomi — acento raro
      },
      fontFamily: {
        display: ["'General Sans'", "'Inter'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
    },
  },
  plugins: [],
} satisfies Config;
