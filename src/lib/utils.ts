export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Mapeia um valor de um intervalo para outro, com clamp nas pontas. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
