#!/usr/bin/env node
/**
 * normalize-images.mjs
 * ------------------------------------------------------------------
 * PROBLEMA QUE ESTE SCRIPT RESOLVE
 * ------------------------------------------------------------------
 * Quando as fotos de produto são PNG com fundo transparente, cada
 * arquivo pode ter uma margem transparente diferente ao redor do
 * aparelho (uma foto exportada "coladinha", outra com bastante ar
 * em volta). Como os componentes (ProductImage.tsx, HeroSection.tsx)
 * aplicam tamanho/posX/posY sobre o PNG inteiro — incluindo a parte
 * transparente — a MESMA config de tamanho/posição acaba parecendo
 * diferente de uma foto para outra, mesmo o código estando correto.
 *
 * Este script resolve isso na origem: para cada PNG,
 *   1) recorta (trim) toda a margem transparente ao redor do produto;
 *   2) redimensiona o produto para ocupar sempre a mesma proporção
 *      de uma tela quadrada (FILL_RATIO);
 *   3) centraliza esse produto numa tela transparente do mesmo
 *      tamanho (CANVAS_SIZE) para TODAS as fotos.
 *
 * Resultado: em qualquer foto processada por este script, a mesma
 * margem/vazio transparente ao redor do produto — então tamanho,
 * posX e posY passam a se comportar de forma idêntica em todas.
 *
 * ------------------------------------------------------------------
 * COMO USAR
 * ------------------------------------------------------------------
 *   node scripts/normalize-images.mjs
 *       → processa todo PNG em public/assets/** (recursivo),
 *         escreve o resultado em public/assets-normalized/** (mesma
 *         estrutura de pastas), SEM tocar nos arquivos originais.
 *
 *   node scripts/normalize-images.mjs --in public/assets --out public/assets-normalized
 *       → escolhe manualmente as pastas de entrada/saída.
 *
 *   node scripts/normalize-images.mjs --size 2000 --fill 0.82
 *       → CANVAS_SIZE=2000px, produto ocupa 82% do maior lado.
 *
 *   node scripts/normalize-images.mjs --overwrite
 *       → escreve por cima dos arquivos originais (faz backup
 *         automático em public/assets-original-backup/** na primeira vez).
 *
 * Depois de rodar, aponte os "src" em src/data/products.ts para a
 * pasta normalizada (ou mantenha os mesmos caminhos se usou --overwrite).
 * ------------------------------------------------------------------
 */

import sharp from "sharp";
import { readdir, mkdir, stat, copyFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const args = { in: "public/assets", out: "public/assets-normalized", size: 2000, fill: 0.82, overwrite: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--in") args.in = argv[++i];
    else if (a === "--out") args.out = argv[++i];
    else if (a === "--size") args.size = Number(argv[++i]);
    else if (a === "--fill") args.fill = Number(argv[++i]);
    else if (a === "--overwrite") args.overwrite = true;
  }
  return args;
}

async function walkPngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkPngs(full)));
    } else if (entry.isFile() && /\.png$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Recorta a margem transparente e centraliza o conteúdo visível numa
 * tela quadrada de `canvasSize`x`canvasSize`, ocupando `fillRatio` do
 * maior lado. Mantém transparência (sem preencher fundo).
 */
async function normalizeOne(inputPath, outputPath, canvasSize, fillRatio) {
  const image = sharp(inputPath, { failOn: "none" }).ensureAlpha();
  const beforeMeta = await image.metadata();

  if (!beforeMeta.hasAlpha) {
    return {
      file: inputPath,
      skipped: true,
      reason: "PNG sem canal alfa (não é transparente) — não mexi, só copiei.",
    };
  }

  // 1) recorta a margem transparente até o bounding box do conteúdo visível
  const trimmed = sharp(inputPath, { failOn: "none" }).ensureAlpha().trim();
  const trimmedBuffer = await trimmed.toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();

  if (!trimmedMeta.width || !trimmedMeta.height) {
    return { file: inputPath, skipped: true, reason: "não consegui detectar conteúdo visível (imagem só transparente?)." };
  }

  // 2) redimensiona o conteúdo recortado para ocupar `fillRatio` do canvas
  const targetContentSize = Math.round(canvasSize * fillRatio);
  const resizeIsUpscale = Math.max(trimmedMeta.width, trimmedMeta.height) < targetContentSize;

  const resizedBuffer = await sharp(trimmedBuffer)
    .resize({
      width: targetContentSize,
      height: targetContentSize,
      fit: "inside",
      withoutEnlargement: false, // padronizar proporção é mais importante que evitar upscale
    })
    .toBuffer();
  const resizedMeta = await sharp(resizedBuffer).metadata();

  // 3) centraliza numa tela transparente canvasSize x canvasSize
  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: resizedBuffer,
        left: Math.round((canvasSize - (resizedMeta.width ?? targetContentSize)) / 2),
        top: Math.round((canvasSize - (resizedMeta.height ?? targetContentSize)) / 2),
      },
    ])
    .png()
    .toFile(outputPath);

  return {
    file: inputPath,
    skipped: false,
    before: `${beforeMeta.width}x${beforeMeta.height}`,
    trimmedTo: `${trimmedMeta.width}x${trimmedMeta.height}`,
    finalCanvas: `${canvasSize}x${canvasSize}`,
    contentFillRatio: fillRatio,
    upscaled: resizeIsUpscale,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inDir = path.resolve(ROOT, args.in);
  const backupDir = path.resolve(ROOT, "public/assets-original-backup");

  if (!existsSync(inDir)) {
    console.error(`Pasta de entrada não existe: ${inDir}`);
    process.exit(1);
  }

  const pngs = await walkPngs(inDir);
  if (pngs.length === 0) {
    console.log(`Nenhum PNG encontrado em ${args.in}. Nada a fazer.`);
    return;
  }

  console.log(`Encontrados ${pngs.length} PNG(s) em ${args.in}.`);
  console.log(`Canvas final: ${args.size}x${args.size}px · produto ocupa ${Math.round(args.fill * 100)}% do maior lado.\n`);

  const results = [];
  for (const file of pngs) {
    const rel = path.relative(inDir, file);
    let outputPath;

    if (args.overwrite) {
      // backup do original antes de sobrescrever, uma única vez
      const backupPath = path.join(backupDir, rel);
      if (!existsSync(backupPath)) {
        await mkdir(path.dirname(backupPath), { recursive: true });
        await copyFile(file, backupPath);
      }
      outputPath = file;
    } else {
      outputPath = path.join(path.resolve(ROOT, args.out), rel);
    }

    try {
      const result = await normalizeOne(file, outputPath, args.size, args.fill);
      if (args.overwrite && result.skipped && result.reason?.includes("sem canal alfa")) {
        // nada de transparente pra normalizar; ainda assim garante que existe no destino
        await copyFile(file, outputPath);
      }
      results.push(result);
    } catch (err) {
      results.push({ file, skipped: true, reason: `erro: ${err.message}` });
    }
  }

  console.log("Resultado:");
  for (const r of results) {
    if (r.skipped) {
      console.log(`  ⚠ ${path.relative(ROOT, r.file)} — ${r.reason}`);
    } else {
      console.log(
        `  ✓ ${path.relative(ROOT, r.file)} — original ${r.before} → recortado ${r.trimmedTo} → canvas final ${r.finalCanvas}${r.upscaled ? " (ampliado para caber na proporção padrão)" : ""}`
      );
    }
  }

  const ok = results.filter((r) => !r.skipped).length;
  console.log(
    `\n${ok}/${results.length} imagem(ns) normalizada(s) com a mesma proporção de margem transparente.`
  );
  if (!args.overwrite) {
    console.log(`Saída em: ${args.out}/ — aponte os "src" em src/data/products.ts para lá quando conferir o resultado.`);
  } else {
    console.log(`Arquivos originais preservados em: public/assets-original-backup/`);
  }
}

main();
