"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState, lerp } from "./store";
import { mulberry } from "./textures";

export default function Particles({ count = 1400 }) {
  const ref = useRef();
  const { positions, colors } = useMemo(() => {
    const rnd = mulberry(42);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const a = new THREE.Color("#4cc9ff");
    const b = new THREE.Color("#7a5cff");
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 4 + rnd() * 12;
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      positions[i * 3] = r * Math.sin(ph) * Math.cos(th);
      positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(ph) - 4;
      c.lerpColors(a, b, rnd());
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, dt) => {
    const p = ref.current;
    p.rotation.y += dt * 0.012;
    p.rotation.x = lerp(p.rotation.x, scrollState.progress * 0.9, 0.05);
    p.position.y = lerp(p.position.y, scrollState.progress * 2.5, 0.05);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} sizeAttenuation vertexColors transparent opacity={0.75} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </points>
  );
}
