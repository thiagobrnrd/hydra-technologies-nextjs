// Limite simples em memória (best-effort: cada instância serverless tem o seu).
// Suficiente para barrar spam repetido de um mesmo IP.
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

export function rateLimit(key) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_HITS) {
    hits.set(key, list);
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - list[0])) / 1000) };
  }
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return { ok: true };
}

export function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : request.headers.get("x-real-ip") || "anon").trim();
}
