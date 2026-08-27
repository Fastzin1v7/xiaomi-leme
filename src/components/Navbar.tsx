import { useEffect, useState } from "react";
import { store, waLink } from "@/data/store";
import { cx } from "@/lib/utils";

const LINKS = [
  { href: "#xiaomi-17-ultra", label: "Xiaomi 17 Ultra" },
  { href: "#categorias", label: "Linha completa" },
  { href: "#loja", label: "A loja" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "nav-shrink fixed top-0 z-50 flex w-full items-center justify-between",
        scrolled ? "bg-void/80 px-6 py-3 backdrop-blur-md" : "px-8 py-6"
      )}
    >
      <a href="#top" className="display-hero text-sm tracking-tightest text-bone">
        XIAOMI <span className="text-signal">STORE</span> LEME
      </a>

      <nav className="hidden gap-8 md:flex">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="spec-mono text-steel transition-colors hover:text-bone"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href={waLink("Olá! Vim pelo site e gostaria de falar com a loja.")}
        target="_blank"
        rel="noreferrer"
        className="spec-mono rounded-full border border-mist/30 px-4 py-2 text-bone transition-colors hover:border-signal hover:text-signal"
      >
        Fale com a loja
      </a>
    </header>
  );
}
