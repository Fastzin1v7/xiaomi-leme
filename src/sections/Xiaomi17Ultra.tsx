import { featuredProduct } from "@/data/products";
import ProductImage from "@/components/ProductImage";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { mapRange } from "@/lib/utils";

const BEATS = [
  { word: "PRECISÃO.", range: [0, 0.22] as [number, number] },
  { word: "DESEMPENHO.", range: [0.22, 0.44] as [number, number] },
  { word: "LEICA.", range: [0.44, 0.68] as [number, number] },
  { word: "FEITO PARA IMPRESSIONAR.", range: [0.68, 1] as [number, number] },
];

export default function Xiaomi17Ultra() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const images = featuredProduct.images;

  // permite navegar manualmente entre as 4 fotos (além da troca automática
  // por scroll): rola a página até o ponto em que a foto `index` é protagonista.
  function goToImage(index: number) {
    const node = ref.current;
    if (!node) return;
    const totalScrollable = node.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;
    const targetProgress = (index + 0.5) / images.length;
    window.scrollTo({
      top: node.offsetTop + totalScrollable * targetProgress,
      behavior: "smooth",
    });
  }

  return (
    <section id="xiaomi-17-ultra" ref={ref} className="relative bg-void" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* fotografias reais empilhadas — cada uma assume o protagonismo
            durante uma fatia do scroll, controlada só por opacity/transform */}
        <div className="absolute inset-0">
          {images.map((image, i) => (
            <ProductImage
              key={image.src}
              image={image}
              progress={progress}
              activeRange={[i / images.length, (i + 1) / images.length]}
              className="absolute inset-0"
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/10 to-transparent" />

        <div className="relative z-10 px-8 md:px-16">
          <p className="display-eyebrow text-signal">{featuredProduct.eyebrow}</p>
          <h2 className="display-hero mt-3 max-w-xl text-4xl text-bone md:text-6xl">
            {BEATS.map((beat) => {
              const opacity = mapRange(
                progress,
                beat.range[0],
                (beat.range[0] + beat.range[1]) / 2,
                0,
                1
              );
              const active = progress >= beat.range[0] && progress <= beat.range[1];
              return (
                <span
                  key={beat.word}
                  className="block transition-opacity duration-300"
                  style={{ opacity: active ? 1 : 0, position: active ? "static" : "absolute" }}
                >
                  {beat.word}
                </span>
              );
            })}
          </h2>

          <p className="body-editorial mt-6 max-w-sm text-steel">{featuredProduct.description}</p>

          <dl className="spec-mono mt-10 grid grid-cols-2 gap-x-8 gap-y-3 text-steel">
            {featuredProduct.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-bone/50">{spec.label}</dt>
                <dd className="text-bone">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* navegação entre as 4 fotos — clique leva direto pra foto escolhida,
            além da troca automática que já acontece ao rolar a página */}
        <div className="absolute bottom-10 left-8 flex gap-2 md:left-16">
          {images.map((image, i) => {
            const range: [number, number] = [i / images.length, (i + 1) / images.length];
            const active = progress >= range[0] && progress <= range[1];
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => goToImage(i)}
                aria-label={`Ver foto: ${image.alt}`}
                aria-current={active}
                className="h-[2px] w-10 cursor-pointer bg-mist/30 transition-colors"
                style={{ backgroundColor: active ? "#FF6A2B" : undefined }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
