import { motion } from "framer-motion";
import { store, waLink } from "@/data/store";

/**
 * ============================================================
 *  AJUSTES DO VÍDEO/FOTO DO TOPO — mude só os números abaixo
 * ============================================================
 */

// Arquivo do vídeo (ou foto) do topo do site
const HERO_SRC = "/assets/xiaomi17ultra/hero.mp4";

// "video" se HERO_SRC for .mp4/.webm — "image" se for .jpg/.png
const HERO_TIPO: "video" | "image" = "video";

// TAMANHO — 100 = tamanho normal, 120 = 20% maior, 80 = 20% menor
const HERO_TAMANHO_PORCENTO = 100;

// POSIÇÃO HORIZONTAL — 0 = tudo pra esquerda, 50 = centro, 100 = tudo pra direita
const HERO_POSICAO_X_PORCENTO = 50;

// POSIÇÃO VERTICAL — 0 = tudo pra cima, 50 = centro, 100 = tudo pra baixo
const HERO_POSICAO_Y_PORCENTO = 50;

/** ============================================================ */

export default function HeroSection() {
  // tamanho e posição são independentes: mudar X/Y nunca altera o tamanho.
  // posX/posY sempre limitados a 0-100 (fora disso, o vídeo/foto "some").
  const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
  const posX = clamp(HERO_POSICAO_X_PORCENTO, 0, 100);
  const posY = clamp(HERO_POSICAO_Y_PORCENTO, 0, 100);
  const tamanho = clamp(HERO_TAMANHO_PORCENTO, 20, 400);
  const shiftX = ((50 - posX) / 50) * 15;
  const shiftY = ((50 - posY) / 50) * 15;
  const mediaStyle = {
    transform: `translate(${shiftX}%, ${shiftY}%) scale(${tamanho / 100})`,
  };

  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden bg-void">
      {HERO_TIPO === "video" ? (
        <video
          src={HERO_SRC}
          autoPlay
          muted
          loop
          playsInline
          style={mediaStyle}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          onError={(e) => {
            (e.currentTarget as HTMLVideoElement).style.background =
              "radial-gradient(circle at 50% 30%, #1c1d20 0%, #0A0A0B 70%)";
          }}
        />
      ) : (
        <img
          src={HERO_SRC}
          alt="Xiaomi 17 Ultra"
          style={mediaStyle}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          onError={(e) => {
            e.currentTarget.style.background =
              "radial-gradient(circle at 50% 30%, #1c1d20 0%, #0A0A0B 70%)";
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

      <div className="relative z-10 w-full px-8 pb-20 md:px-16 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="display-eyebrow text-signal"
        >
          {store.rating.score.toFixed(1)} ★ · {store.rating.reviews} avaliações · Leme, SP
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="display-hero mt-4 max-w-3xl text-5xl text-bone md:text-8xl"
        >
          Conheça o<br />próximo nível.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href={waLink("Olá! Quero conhecer os produtos Xiaomi na loja.")}
            target="_blank"
            rel="noreferrer"
            className="spec-mono rounded-full bg-signal px-6 py-3 text-void transition-transform hover:scale-105"
          >
            Quero conhecer
          </a>
          <a href="#xiaomi-17-ultra" className="spec-mono text-bone/80 underline underline-offset-4 hover:text-bone">
            Ver Xiaomi 17 Ultra ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
