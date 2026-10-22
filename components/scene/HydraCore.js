"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useAnchor, useSectionValues, useFade } from "./common";
import { smooth, lerp, scrollState } from "./store";

const RINGS = [
  { r: 1.75, tilt: [1.25, 0.2, 0], speed: 0.22, color: "#4cc9ff" },
  { r: 2.12, tilt: [0.35, 1.1, 0.4], speed: -0.16, color: "#00b8ff" },
  { r: 2.55, tilt: [1.9, -0.5, 0.2], speed: 0.1, color: "#7a5cff" },
];

export default function HydraCore({ id = "hero", quality = "high" }) {
  const group = useRef();
  const spin = useRef();
  const blob = useRef();
  const mark = useRef();
  const rings = useRef([]);
  const read = useSectionValues(id, 6, 5);
  const A = useAnchor();
  const fade = useFade(group);
  const tex = useTexture("/images/hydra-mark.png");
  tex.colorSpace = THREE.SRGBColorSpace;

  const nodes = useMemo(() => RINGS.map((_, i) => (i * Math.PI * 2) / 3), []);

  useFrame((state, dt) => {
    const { w, p } = read(dt);
    const g = group.current;
    g.visible = w > 0.004;
    if (!g.visible) return;
    const e = smooth(w);
    const t = state.clock.elapsedTime;
    const heroX = A.narrow ? 0 : A.x + 0.6;
    const heroY = A.narrow ? A.y - 0.05 : 0.05;
    // ao sair (scroll para baixo), o núcleo sobe e se afasta
    g.position.set(heroX, heroY + p * 1.4 + Math.sin(t * 0.8) * 0.06, -p * 2.5 - (1 - e) * 1.5);
    g.scale.setScalar(A.s * (A.narrow ? 0.95 : 1.0) * (0.25 + 0.75 * e));
    g.rotation.y = lerp(g.rotation.y, scrollState.mouse.x * 0.35, 0.05);
    g.rotation.x = lerp(g.rotation.x, -scrollState.mouse.y * 0.25, 0.05);
    spin.current.rotation.y = t * 0.12 + p * 2;
    blob.current.rotation.z = t * 0.2;
    rings.current.forEach((r, i) => {
      if (!r) return;
      r.rotation.z = t * RINGS[i].speed + i;
    });
    mark.current.quaternion.copy(state.camera.quaternion);
    mark.current.material.opacity = (0.55 + Math.sin(t * 2) * 0.15) * e;
    fade(e);
  });

  return (
    <group ref={group}>
      <group ref={spin}>
        <mesh ref={blob}>
          <icosahedronGeometry args={[0.82, quality === "high" ? 48 : 24]} />
          <MeshDistortMaterial
            color="#0a3dff"
            emissive="#0062ff"
            emissiveIntensity={0.55}
            roughness={0.12}
            metalness={0.55}
            distort={0.38}
            speed={1.6}
          />
        </mesh>
        <mesh userData={{ noFade: true }}>
          <sphereGeometry args={[1.3, 64, 64]} />
          <MeshTransmissionMaterial
            samples={quality === "high" ? 6 : 3}
            resolution={quality === "high" ? 512 : 256}
            transmission={1}
            thickness={0.7}
            roughness={0.04}
            ior={1.25}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.08}
            color="#cfe9ff"
            attenuationColor="#7fc8ff"
            attenuationDistance={2.5}
            backside={false}
          />
        </mesh>
      </group>
      <mesh ref={mark} position={[0, 0, 0]} renderOrder={5} userData={{ noFade: true }}>
        <planeGeometry args={[1.05, 1.05]} />
        <meshBasicMaterial
          map={tex}
          transparent
          opacity={0.6}
          color={[1.4, 2.4, 3.2]}
          toneMapped={false}
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {RINGS.map((ring, i) => (
        <group key={i} rotation={ring.tilt}>
          <group ref={(el) => (rings.current[i] = el)}>
            <mesh>
              <torusGeometry args={[ring.r, 0.006, 8, 220]} />
              <meshBasicMaterial color={ring.color} toneMapped={false} transparent opacity={0.85} />
            </mesh>
            <mesh position={[Math.cos(nodes[i]) * ring.r, Math.sin(nodes[i]) * ring.r, 0]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial color={[2.2, 3.4, 4]} toneMapped={false} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}
