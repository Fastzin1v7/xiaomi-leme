export const store = {
  name: "Xiaomi Store Leme",
  tagline: "Loja especializada em produtos Xiaomi",
  description:
    "Xiaomi Store Leme – Loja especializada em produtos Xiaomi. Trabalhamos com a linha completa de smartphones, tablets, e acessórios. Garantia de qualidade, parcelamento facilitado e atendimento personalizado para oferecer a melhor experiência em tecnologia.",
  address: {
    line1: "R. Dr. Querubino Soeiro, 288",
    line2: "Centro — Leme, SP",
    zip: "13610-080",
  },
  whatsapp: "5519993380506", // (19) 99338-0506 em formato internacional p/ link wa.me
  whatsappDisplay: "(19) 99338-0506",
  instagram: "@xiaomi_leme",
  instagramUrl: "https://instagram.com/xiaomi_leme",
  rating: {
    score: 5.0,
    reviews: 103,
    source: "Google",
  },
} as const;

export function waLink(message: string) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}
