# Xiaomi Store Leme — site cinematográfico

Stack: **Vite + React + TypeScript + Tailwind + Framer Motion**.

## Rodando localmente

```bash
npm install
npm run dev
```

## Sobre uma coisa importante: as fotografias

O briefing pede fotografias oficiais reais dos produtos (não 3D) — e o
código foi construído exatamente assim: `src/components/ProductImage.tsx`
renderiza sempre uma tag `<img>` real, e toda a "cinematografia" (escala,
posição, opacity, o realce de lente que segue o cursor) é feita animando
essa fotografia, nunca recriando o aparelho.

O que eu não fiz foi baixar fotos de imprensa da Xiaomi de sites de
terceiros e embutir no código. Fotografias oficiais de lançamento são
material protegido por direitos autorais/marca — eu, como IA, não tenho
como conceder a vocês uma licença de uso comercial sobre elas, e usar
imagens de agregadores/blogs de notícias traria risco de baixa resolução,
marca d'água ou uso não autorizado num site comercial.

**O que já está pronto para vocês:**

- Todas as pastas de assets já existem: `src/assets/xiaomi17ultra/`,
  `/poco/`, `/redmi/`, `/tablets/`, `/wearables/`, `/store/`.
- `src/data/products.ts` já referencia os caminhos exatos de cada foto
  (frontal, traseira, câmera, lateral, na mão) — é só salvar o arquivo
  real com o nome esperado dentro da pasta.
- Enquanto uma foto não existir, o componente mostra um fundo grafite
  liso (sem quebrar o layout) em vez de imagem quebrada.

**Onde conseguir as fotos oficiais em alta resolução:**

1. Portal de parceiros/revendedores Xiaomi (se a loja for revenda
   autorizada, normalmente há um press kit/dealer kit com fotos em alta
   resolução liberadas para uso comercial).
2. `mi.com` — página oficial de cada produto.
3. Solicitação direta ao distribuidor Xiaomi no Brasil.
4. Fotografias próprias da loja física e dos produtos em estoque —
   também reforçam a autenticidade local da marca "Xiaomi Store Leme".

## Estrutura

```
src/
  components/   Navbar, Footer, ProductImage (motor cinematográfico)
  sections/     HeroSection, Xiaomi17Ultra, CategorySection, StoreSection
  data/         products.ts, categories.ts, store.ts
  styles/       globals.css, animations.css, typography.css
  lib/          utils.ts, useScrollProgress.ts
  assets/       pastas por produto, prontas para receber as fotos reais
```

## Próximos passos sugeridos

- Trocar `useScrollProgress` por GSAP `ScrollTrigger` + `Lenis` se
  quiser smooth-scroll nativo e timelines mais elaboradas — a API
  (`progress: 0→1`) foi desenhada para ser um drop-in.
- Criar seções dedicadas para POCO/Redmi/Pad/Watch iguais à do
  Xiaomi 17 Ultra (hoje elas aparecem como grid editorial em
  `CategorySection.tsx`) assim que houver fotografia oficial de cada
  linha.
- Adicionar `srcset`/AVIF quando as fotos reais forem inseridas, para
  performance em mobile.
