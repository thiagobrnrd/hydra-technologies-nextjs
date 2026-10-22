// Estado compartilhado entre o DOM (scroll) e a cena 3D, sem re-render do React.
export const scrollState = {
  sections: {}, // id -> { w: peso de visibilidade 0..1, p: progresso local 0..1 }
  mouse: { x: 0, y: 0 },
  progress: 0, // progresso global da página 0..1
  velocity: 0,
};

export function section(id) {
  return scrollState.sections[id] || ZERO;
}
const ZERO = { w: 0, p: 0 };

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const smooth = (v) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};
/** remapeia v de [a,b] para [0,1] com clamp */
export const range = (v, a, b) => clamp01((v - a) / (b - a));
export const lerp = (a, b, t) => a + (b - a) * t;
