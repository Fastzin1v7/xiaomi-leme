import { motion } from "framer-motion";
import { products } from "@/data/products";
import { waLink } from "@/data/store";

const rest = products.filter((p) => !p.featured);

export default function CategorySection() {
  return (
    <section id="categorias" className="bg-porcelain px-8 py-24 text-void md:px-16 md:py-32">
      <p className="display-eyebrow text-void/50">A LINHA COMPLETA</p>
      <h2 className="display-hero mt-3 max-w-2xl text-4xl md:text-6xl">
        Um Xiaomi para cada momento.
      </h2>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-void/10 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((product, i) => (
          <motion.a
            key={product.slug}
            href={waLink(`Olá! Tenho interesse na linha ${product.name}.`)}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden bg-void p-6 text-bone"
          >
            {/* wrapper isolado só para o controle de tamanho (image.tamanho) —
                nunca interfere no zoom de hover, que fica no elemento de mídia */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ transform: `scale(${(product.images[0].tamanho ?? 100) / 100})` }}
            >
              {product.images[0].type === "video" ? (
                <video
                  src={product.images[0].src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg,#17181A,#0A0A0B)";
                  }}
                />
              ) : (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg,#17181A,#0A0A0B)";
                  }}
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
            <div className="relative">
              <p className="spec-mono text-signal">{product.eyebrow}</p>
              <p className="display-hero mt-1 text-2xl">{product.name}</p>
              <p className="body-editorial mt-2 text-sm text-steel">{product.headline}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
