export type ProductImage = {
  src: string;
  alt: string;
  kind?: string;
  type?: "image" | "video";

  /** Tamanho da mídia: 100 = padrão, 120 = 20% maior, 80 = 20% menor. */
  tamanho?: number;

  /** Posição horizontal: 0 = esquerda, 50 = centro, 100 = direita. */
  posX?: number;

  /** Posição vertical: 0 = topo, 50 = centro, 100 = baixo. */
  posY?: number;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductTheme = {
  accent: string;
  background: string;
};

export type Product = {
  slug: string;
  category: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  specs: ProductSpec[];
  images: ProductImage[];
  featured: boolean;
  theme: ProductTheme;
};

export const products: Product[] = [
  {
    slug: "xiaomi-17-ultra",
    category: "flagship",
    name: "Xiaomi 17 Ultra",
    eyebrow: "O PRÓXIMO NÍVEL",
    headline: "Precisão. Desempenho. Leica.",
    description:
      "O topo de linha Xiaomi, com sistema de câmeras co-desenvolvido com a Leica e acabamento premium em vidro e metal.",
    specs: [
      { label: "Câmeras", value: "Sistema Leica" },
      { label: "Tela", value: "AMOLED alta resolução" },
      { label: "Acabamento", value: "Vidro e metal" },
      { label: "Carregamento", value: "Ultra rápido" },
    ],

    images: [
     {
  src: "/assets-normalized/xiaomi17ultra/frontal.png",
  alt: "Xiaomi 17 Ultra frontal",
  kind: "frontal",
  type: "image",

  // As fotos normalizadas (script normalize-images.mjs) vêm com o aparelho
  // recortado, redimensionado e CENTRALIZADO num canvas quadrado — mas o
  // container real (Xiaomi17Ultra.tsx) é "h-screen" de tela cheia, ou seja,
  // bem mais LARGO que ALTO na maioria dos monitores. Um canvas quadrado
  // dentro de um container widescreen com object-cover perde uma fatia
  // grande de cima e de baixo (a % cortada = 1 - altura/largura do
  // container). Essa foto em especial (aparelho na vertical, segurado na
  // mão) preenchia 82% da altura do canvas — margem de só 9% de cada lado,
  // insuficiente pra sobreviver ao corte em qualquer tela widescreen
  // comum (cortava o topo da câmera e a base da mão). Foi renormalizada
  // pra 50% de preenchimento vertical (25% de margem de cada lado), o que
  // cobre com folga 16:9/16:10 e reduz bastante o corte até em ultrawide.
  // As outras 3 fotos (processador/câmera/lateral) são compridas na
  // horizontal, então já tinham margem vertical de sobra (20-39%) e não
  // precisaram ser retocadas. `tamanho` volta a 100 aqui: com a margem
  // certa na origem, o zoom extra de 110 só voltaria a comer a folga.
  tamanho: 100,
  posX: 50,
  posY: 50,
},

      {
        src: "/assets-normalized/xiaomi17ultra/processador.png",
        alt: "Xiaomi 17 Ultra processador",
        kind: "processador",
        type: "image",

        tamanho: 80,
        posX: 10,
        posY: 60,
      },

      {
        src: "/assets-normalized/xiaomi17ultra/camera.png",
        alt: "Xiaomi 17 Ultra câmera Leica",
        kind: "camera",
        type: "image",

        tamanho: 100,
        posX: 50,
        posY: 50,
      },

      {
        src: "/assets-normalized/xiaomi17ultra/lateral.png",
        alt: "Xiaomi 17 Ultra lateral",
        kind: "lateral",
        type: "image",

        tamanho: 100,
        posX: 20,
        posY: 50,
      },
    ],

    featured: true,

    theme: {
      accent: "#FF6A2B",
      background: "void",
    },
  },

  {
    slug: "poco-f-series",
    category: "poco",
    name: "POCO",
    eyebrow: "VELOCIDADE PURA",
    headline: "Performance sem compromisso.",
    description:
      "A linha POCO para quem exige potência de sobra em jogos e no dia a dia.",
    specs: [
      { label: "Processador", value: "Alta performance" },
      { label: "Tela", value: "Taxa de atualização elevada" },
    ],

    images: [
      {
        src: "/assets/videos/poco.mp4",
        alt: "POCO",
        kind: "frontal",
        type: "video",
        tamanho: 100,
        posX: 50,
        posY: 50,
      },
    ],

    featured: false,

    theme: {
      accent: "#FF6A2B",
      background: "void",
    },
  },

  {
    slug: "redmi-note-series",
    category: "redmi",
    name: "Redmi",
    eyebrow: "EQUILÍBRIO PERFEITO",
    headline: "Qualidade que cabe no bolso.",
    description:
      "Redmi entrega o melhor custo-benefício da linha Xiaomi.",
    specs: [
      { label: "Bateria", value: "Alta duração" },
      { label: "Câmera", value: "Múltiplos sensores" },
    ],

    images: [
      {
        src: "/assets/videos/redmi.mp4",
        alt: "Redmi",
        kind: "frontal",
        type: "video",
        tamanho: 100,
        posX: 50,
        posY: 50,
      },
    ],

    featured: false,

    theme: {
      accent: "#FF6A2B",
      background: "porcelain",
    },
  },

  {
    slug: "xiaomi-pad",
    category: "tablets",
    name: "Xiaomi Pad",
    eyebrow: "CRIE SEM LIMITES",
    headline: "Trabalho, estudo e criação.",
    description:
      "Tablets Xiaomi para produtividade e entretenimento.",
    specs: [
      { label: "Tela", value: "Grande formato" },
    ],

    images: [
      {
        src: "/assets/videos/pad.mp4",
        alt: "Xiaomi Pad",
        kind: "frontal",
        type: "video",
        tamanho: 100,
        posX: 50,
        posY: 50,
      },
    ],

    featured: false,

    theme: {
      accent: "#FF6A2B",
      background: "void",
    },
  },

  {
    slug: "xiaomi-watch",
    category: "wearables",
    name: "Xiaomi Band",
    eyebrow: "NO SEU PULSO",
    headline: "Saúde e conectividade.",
    description:
      "Monitoramento de saúde e notificações direto no pulso.",
    specs: [
      { label: "Bateria", value: "Longa duração" },
    ],

    images: [
      {
        src: "/assets/videos/band.mp4",
        alt: "Xiaomi Band",
        kind: "frontal",
        type: "video",
        tamanho: 100,
        posX: 50,
        posY: 50,
      },
    ],

    featured: false,

    theme: {
      accent: "#FF6A2B",
      background: "porcelain",
    },
  },
];

export const featuredProduct = products.find(
  (product) => product.featured
)!;
