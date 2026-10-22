"use client";
import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { section } from "./store";

const damp = THREE.MathUtils.damp;

/** Posição/escala base de cada objeto conforme a tela (texto à esquerda no desktop, objeto em cima no mobile). */
export function useAnchor() {
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  return useMemo(() => {
    const aspect = width / height;
    const narrow = width < 900;
    if (narrow) {
      const s = Math.min(0.78, Math.max(0.46, aspect * 1.08));
      return { narrow, labels: false, x: 0, y: aspect < 0.75 ? 1.12 : 0.9, s };
    }
    const wide = aspect > 1.55;
    return { narrow, labels: width >= 1200, x: wide ? 1.8 : 1.5, y: 0, s: wide ? 0.92 : 0.8 };
  }, [width, height]);
}

/** Lê o peso/progresso da seção com amortecimento (suave mesmo com scroll brusco). */
export function useSectionValues(id, lambdaW = 5, lambdaP = 4) {
  const v = useRef({ w: 0, p: 0 });
  return (dt) => {
    const s = section(id);
    v.current.w = damp(v.current.w, s.w, lambdaW, dt);
    v.current.p = damp(v.current.p, s.p, lambdaP, dt);
    return v.current;
  };
}

/**
 * Coleta os materiais de um grupo e permite aplicar fade (opacidade) em todos de uma vez.
 */
export function useFade(groupRef) {
  const mats = useRef([]);
  const last = useRef(-1);
  useEffect(() => {
    const list = new Set();
    groupRef.current?.traverse((o) => {
      if (!o.material || o.userData.noFade) return;
      const arr = Array.isArray(o.material) ? o.material : [o.material];
      arr.forEach((m) => {
        if (!m.userData.__fade) {
          m.userData.__fade = true;
          m.userData.baseOpacity = m.opacity ?? 1;
          m.transparent = true;
        }
        list.add(m);
      });
    });
    mats.current = [...list];
    last.current = -1;
  });
  return (e) => {
    if (Math.abs(e - last.current) < 0.002) return;
    last.current = e;
    mats.current.forEach((m) => {
      m.opacity = m.userData.baseOpacity * e;
      m.depthWrite = e > 0.98 && m.userData.baseOpacity >= 1;
    });
  };
}

/** Legenda técnica com linha guia (estilo "exploded view"). */
export function Callout({ position, title, text, side = "right", innerRef }) {
  return (
    <Html position={position} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
      <div ref={innerRef} className={`callout callout--${side}`} style={{ opacity: 0 }}>
        <span className="callout__dot" />
        <span className="callout__line" />
        <span className="callout__body">
          <span className="callout__title">{title}</span>
          {text && <span className="callout__text">{text}</span>}
        </span>
      </div>
    </Html>
  );
}

/** Atualiza a opacidade das legendas sem forçar layout a cada frame. */
export function setCallouts(refs, values) {
  refs.forEach((r, i) => {
    const el = r.current;
    if (!el) return;
    const v = Math.round((Array.isArray(values) ? values[i] : values) * 100) / 100;
    if (el.__o !== v) {
      el.__o = v;
      el.style.opacity = v;
      el.style.transform = `translate3d(0, ${(1 - v) * 8}px, 0)`;
    }
  });
}
