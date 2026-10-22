"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { scrollState, clamp01 } from "./scene/store";

/**
 * - Scroll suave (Lenis) com âncoras
 * - Calcula, a cada frame, peso (w) e progresso (p) de cada seção [data-scene]
 * - Atualiza HUD de capítulos e animações de entrada [data-reveal]
 */
export default function ScrollEngine() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis = null;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, anchors: { offset: 0 }, autoRaf: false });
      window.__lenis = lenis;
    }

    const root = document.documentElement;
    const sceneEls = () => Array.from(document.querySelectorAll("[data-scene]"));
    let els = sceneEls();
    let lastY = window.scrollY;
    let raf;

    const hudItems = Array.from(document.querySelectorAll("[data-hud]"));

    const tick = (time) => {
      lenis?.raf(time);
      const vh = window.innerHeight;
      const y = window.scrollY;
      scrollState.velocity = y - lastY;
      lastY = y;
      const max = Math.max(1, root.scrollHeight - vh);
      scrollState.progress = y / max;
      root.style.setProperty("--scroll", scrollState.progress.toFixed(4));

      let active = null;
      let best = 0;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const id = el.dataset.scene;
        const span = vh * 0.75;
        const enter = clamp01((vh - r.top) / span);
        const leave = clamp01(r.bottom / span);
        const w = Math.min(enter, leave);
        const travel = r.height - vh;
        const p = travel > 10 ? clamp01(-r.top / travel) : clamp01(-r.top / vh);
        const s = scrollState.sections[id] || (scrollState.sections[id] = { w: 0, p: 0 });
        s.w = w;
        s.p = p;
        if (w > best) {
          best = w;
          active = id;
        }
        el.style.setProperty("--p", p.toFixed(4));
      }
      if (active !== root.dataset.chapter) {
        root.dataset.chapter = active || "";
        hudItems.forEach((h) => h.classList.toggle("is-active", h.dataset.hud === active));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e) => {
      scrollState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const onResize = () => (els = sceneEls());
    window.addEventListener("resize", onResize);

    // Animações de entrada
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // Se a página abrir já com #ancora, alinha depois do layout
    if (location.hash && lenis) {
      const target = document.querySelector(location.hash);
      if (target) setTimeout(() => lenis.scrollTo(target, { immediate: true }), 60);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      lenis?.destroy();
      window.__lenis = null;
    };
  }, []);

  return null;
}
