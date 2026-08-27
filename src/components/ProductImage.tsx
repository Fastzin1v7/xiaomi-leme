import { useRef } from "react";
import { motion } from "framer-motion";
import { ProductImage as ProductImageType } from "@/data/products";
import { cx } from "@/lib/utils";

type Props = {
  image: ProductImageType;
  /** 0 → 1, controla escala / posição / opacidade — nunca o conteúdo da foto */
  progress: number;
  /** faixa [start, end] dentro de 0-1 em que esta foto é protagonista */
  activeRange: [number, number];
  className?: string;
};

/**
 * Renderiza a FOTOGRAFIA REAL do produto (via <img>, nunca 3D/canvas)
 * e anima apenas transform/opacity/filter em torno dela — escala,
 * posição, leve rotação 2D e um realce de "lente" que segue o cursor.
 *
 * Troque `image.src` por um arquivo real em /assets — ver nota
 * em src/data/products.ts.
 */
const POSITION_UTILITIES = ["absolute", "fixed", "sticky", "static", "relative"];

export default function ProductImage({ image, progress, activeRange, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [start, end] = activeRange;

  // Evita ter "relative" (classe padrão, usada só para dar contexto de
  // posicionamento aos filhos internos como .lens-highlight) e "absolute"
  // (classe recebida via prop, usada para empilhar as 4 fotos umas sobre
  // as outras) na mesma tag ao mesmo tempo. As duas mexem na propriedade
  // CSS "position" e, quando coexistem, o Tailwind decide o vencedor pela
  // ordem em que as classes foram definidas na folha de estilo — não pela
  // ordem em que aparecem aqui no código — e "relative" acaba levando a
  // melhor. O resultado: cada foto vira um bloco normal em vez de ficar
  // empilhada por cima das outras, e só a primeira aparece na tela (as
  // demais ficam abaixo, cortadas pelo overflow-hidden do container).
  const externalPosition = className
    ?.split(/\s+/)
    .find((c) => POSITION_UTILITIES.includes(c));

  const local = (progress - start) / (end - start || 1);
  const isActive = progress >= start && progress <= end;

  const scale = 0.94 + Math.min(Math.max(local, 0), 1) * 0.1;
  const translateY = (1 - Math.min(Math.max(local, 0), 1)) * 24;
  const opacity = isActive
    ? 1
    : Math.max(0, 1 - Math.abs(progress - (start + end) / 2) * 6);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const node = wrapRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty("--y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  // tamanho e posição são independentes um do outro: mudar posX/posY
  // NUNCA altera o tamanho, e mudar tamanho NUNCA altera a posição.
  // posX/posY são sempre limitados a 0-100: um valor fora disso (ex: 120)
  // empurra a foto real pra fora da área visível e faz ela "sumir".
  const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
  const tamanho = clamp(image.tamanho ?? 100, 20, 400);
  const posX = clamp(image.posX ?? 50, 0, 100);
  const posY = clamp(image.posY ?? 50, 0, 100);
  const shiftX = ((50 - posX) / 50) * 15; // % de deslocamento — até 15% pra cada lado
  const shiftY = ((50 - posY) / 50) * 15;

  return (
    <motion.div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      className={cx("group overflow-hidden", !externalPosition && "relative", className)}
      style={{
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      {image.type === "video" ? (
        <video
          src={image.src}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          style={{
            transform: `translate(${shiftX}%, ${shiftY}%) scale(${tamanho / 100})`,
          }}
          // Fallback visual enquanto o vídeo oficial não é adicionado —
          // remove este onError assim que o arquivo real existir.
          onError={(e) => {
            const el = e.currentTarget;
            el.style.background =
              "linear-gradient(135deg, #17181A 0%, #0A0A0B 60%)";
          }}
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{
            transform: `translate(${shiftX}%, ${shiftY}%) scale(${tamanho / 100})`,
          }}
          // Fallback visual enquanto a foto oficial não é adicionada —
          // remove este onError assim que os arquivos reais existirem.
          onError={(e) => {
            const el = e.currentTarget;
            el.style.background =
              "linear-gradient(135deg, #17181A 0%, #0A0A0B 60%)";
            el.alt = `${image.alt} — adicione o arquivo real em ${image.src}`;
          }}
        />
      )}
      <div className="lens-highlight" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
    </motion.div>
  );
}
