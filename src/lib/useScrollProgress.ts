import { useEffect, useRef, useState } from "react";

/**
 * Retorna o progresso (0 → 1) de rolagem de uma seção alta e "sticky",
 * usado para orquestrar a troca/movimento das fotografias reais do
 * produto durante o scroll — sem precisar de nenhuma biblioteca 3D.
 *
 * Pode ser trocado por GSAP ScrollTrigger ou Framer Motion's
 * useScroll mantendo a mesma API (progress: number).
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const p = total > 0 ? scrolled / total : 0;
        setProgress(Math.min(Math.max(p, 0), 1));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}
