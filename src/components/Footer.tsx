import { store, waLink } from "@/data/store";

export default function Footer() {
  return (
    <footer id="contato" className="border-t border-mist/10 bg-void px-8 py-16 md:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div>
          <p className="display-hero text-xl text-bone">
            XIAOMI <span className="text-signal">STORE</span> LEME
          </p>
          <p className="body-editorial mt-4 max-w-xs text-steel">{store.description}</p>
        </div>

        <div className="spec-mono flex flex-col gap-2 text-steel">
          <p className="text-bone/70">Endereço</p>
          <p>{store.address.line1}</p>
          <p>{store.address.line2}</p>
          <p>{store.address.zip}</p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={waLink("Olá! Gostaria de consultar disponibilidade de um produto.")}
            target="_blank"
            rel="noreferrer"
            className="spec-mono w-fit rounded-full bg-signal px-5 py-3 text-void transition-transform hover:scale-105"
          >
            Chamar no WhatsApp — {store.whatsappDisplay}
          </a>
          <a
            href={store.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="spec-mono text-steel transition-colors hover:text-bone"
          >
            {store.instagram} no Instagram
          </a>
          <p className="spec-mono text-steel">
            ★ {store.rating.score.toFixed(1)} · {store.rating.reviews} avaliações no {store.rating.source}
          </p>
        </div>
      </div>

      <div className="metal-rule mx-auto mt-12 max-w-6xl" />
      <p className="spec-mono mx-auto mt-6 max-w-6xl text-steel/60">
        © {new Date().getFullYear()} {store.name}. Revenda especializada — não afiliada oficialmente à Xiaomi Corporation.
      </p>
    </footer>
  );
}
