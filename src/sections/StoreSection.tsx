import { motion } from "framer-motion";
import { store, waLink } from "@/data/store";

export default function StoreSection() {
  const mapQuery = encodeURIComponent(
    `${store.address.line1}, ${store.address.line2}, ${store.address.zip}, Leme - SP`
  );

  return (
    <section
      id="loja"
      className="relative bg-void px-8 py-24 md:px-16 md:py-32"
    >
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        {/* INFORMAÇÕES DA LOJA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p className="display-eyebrow text-signal">
            SHOWROOM · LEME, SP
          </p>

          <h2 className="display-hero mt-3 text-4xl text-bone md:text-6xl">
            Essa loja entende de tecnologia.
          </h2>

          <p className="body-editorial mt-6 max-w-md text-steel">
            {store.description}
          </p>

          <div className="spec-mono mt-8 space-y-1 text-steel">
            <p className="text-bone">{store.address.line1}</p>
            <p>{store.address.line2}</p>
            <p>{store.address.zip}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={waLink(
                "Olá! Gostaria de visitar a loja, quais os horários?"
              )}
              target="_blank"
              rel="noreferrer"
              className="spec-mono rounded-full bg-signal px-6 py-3 text-void transition-transform hover:scale-105"
            >
              Visitar a loja
            </a>

            <a
              href={waLink(
                "Olá! Gostaria de consultar disponibilidade de um produto."
              )}
              target="_blank"
              rel="noreferrer"
              className="spec-mono rounded-full border border-mist/30 px-6 py-3 text-bone transition-colors hover:border-signal hover:text-signal"
            >
              Consultar disponibilidade
            </a>
          </div>
        </motion.div>

        {/* GOOGLE MAPS — SUBSTITUI A FOTO DA FACHADA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-graphite"
        >
          <iframe
            title="Localização da loja"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Overlay sutil para integrar o mapa ao visual do site */}
          <div className="pointer-events-none absolute inset-0 bg-black/10" />

          {/* Indicador visual */}
          <div className="pointer-events-none absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/70 px-4 py-2 backdrop-blur-md">
            <span className="spec-mono text-xs text-bone">
              LOCALIZAÇÃO · LEME, SP
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}