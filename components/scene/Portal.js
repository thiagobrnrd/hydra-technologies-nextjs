"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAnchor, useSectionValues, useFade } from "./common";
import { glowTexture } from "./textures";
import { smooth, lerp, scrollState } from "./store";

const RINGS = 7;
const TUNNEL = 10;

export default function Portal({ id = "contato" }) {
  const group = useRef();
  const rings = useRef([]);
  const tunnel = useRef([]);
  const read = useSectionValues(id, 4, 4);
  const A = useAnchor();
  const fade = useFade(group);
  const glow = useMemo(() => glowTexture(), []);

  useFrame((state, dt) => {
    const { w } = read(dt);
    const g = group.current;
    g.visible = w > 0.004;
    if (!g.visible) return;
    const e = smooth(w);
    const t = state.clock.elapsedTime;
    g.position.set(A.narrow ? 0 : 2.15, A.narrow ? 1.9 : 0, lerp(-6, -2.6, e));
    g.scale.setScalar(A.narrow ? 0.42 : 0.85);
    g.rotation.y = lerp(g.rotation.y, scrollState.mouse.x * 0.15, 0.04);
    g.rotation.x = lerp(g.rotation.x, -scrollState.mouse.y * 0.1, 0.04);
    rings.current.forEach((r, i) => {
      if (r) r.rotation.z = t * (i % 2 ? -0.12 : 0.09) * (1 + i * 0.15);
    });
    tunnel.current.forEach((r, i) => {
      if (!r) return;
      const k = (i / TUNNEL + t * 0.06) % 1;
      r.position.z = lerp(-14, 0, k);
      r.material.opacity = Math.sin(k * Math.PI) * 0.35 * e * (A.narrow ? 0.4 : 1);
    });
    fade(A.narrow ? e * 0.4 : e);
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, -0.4]}>
        <planeGeometry args={[9, 9]} />
        <meshBasicMaterial map={glow} transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      {Array.from({ length: RINGS }).map((_, i) => (
        <mesh key={i} ref={(el) => (rings.current[i] = el)} rotation={[0, 0, i]}>
          <torusGeometry args={[1.5 + i * 0.22, i === 2 ? 0.06 : 0.012 + (i % 3) * 0.006, 16, 220, i % 3 === 1 ? Math.PI * 1.4 : Math.PI * 2]} />
          <meshBasicMaterial
            color={i === 2 ? [0.6, 2.6, 5] : i % 2 ? [0.4, 0.7, 2.4] : [0.5, 1.6, 2.8]}
            transparent
            opacity={i === 2 ? 1 : 0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
      {Array.from({ length: TUNNEL }).map((_, i) => (
        <mesh key={`t${i}`} ref={(el) => (tunnel.current[i] = el)} userData={{ noFade: true }}>
          <torusGeometry args={[2.2, 0.01, 6, 160]} />
          <meshBasicMaterial color={[0.3, 1.2, 2.6]} transparent opacity={0.3} toneMapped={false} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
