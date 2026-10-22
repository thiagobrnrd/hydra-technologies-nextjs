"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useAnchor, useSectionValues, useFade, Callout, setCallouts } from "./common";
import { pcbTexture, deviceScreenTexture } from "./textures";
import { smooth, range, lerp, scrollState } from "./store";

const LABELS = [
  { title: "Display + vidro", text: "Interface própria no dispositivo", side: "right" },
  { title: "Anel de status", text: "LEDs de alerta em tempo real", side: "left" },
  { title: "ESP32 · Wi-Fi", text: "Firmware e conexão com a nuvem", side: "right" },
  { title: "Sensores e base", text: "Temperatura, nível, movimento…", side: "left" },
];

export default function IoTDevice({ id = "iot" }) {
  const group = useRef();
  const tilt = useRef();
  const parts = useRef([]);
  const ledRing = useRef();
  const waves = useRef([]);
  const sats = useRef();
  const callouts = useRef(LABELS.map(() => ({ current: null })));
  const read = useSectionValues(id);
  const A = useAnchor();
  const fade = useFade(group);
  const tex = useMemo(() => ({ pcb: pcbTexture(), screen: deviceScreenTexture() }), []);
  const ledColor = useMemo(() => new THREE.Color(), []);

  // [base, pcb, led, display, dome] — posição Y fechada e aberta
  const STACK = [
    [0, 0],
    [0.17, 0.62],
    [0.27, 1.22],
    [0.31, 1.78],
    [0.33, 2.3],
  ];

  useFrame((state, dt) => {
    const { w, p } = read(dt);
    const g = group.current;
    g.visible = w > 0.004;
    if (!g.visible) {
      setCallouts(callouts.current, 0);
      return;
    }
    const e = smooth(w);
    const t = state.clock.elapsedTime;
    const x = smooth(range(p, 0.05, 0.65));
    g.position.set(A.x, A.y + (A.narrow ? -0.35 - x * 0.75 : -0.55 - x * 0.55) * A.s + (1 - e) * -0.8, (1 - e) * -2);
    g.scale.setScalar(A.s * 1.05 * (0.6 + 0.4 * e));
    tilt.current.rotation.set(
      lerp(0.55, 0.3, x) - scrollState.mouse.y * 0.08,
      t * 0.25 + p * 1.5 + scrollState.mouse.x * 0.2,
      0
    );
    parts.current.forEach((part, i) => {
      if (part) part.position.y = lerp(STACK[i][0], STACK[i][1], x);
    });
    const pulse = 0.5 + 0.5 * Math.sin(t * 3);
    ledColor.setRGB(0.2 + pulse * 0.8, 1.2 + pulse * 1.6, 2.4 + pulse * 1.4);
    ledRing.current.material.color.copy(ledColor);
    waves.current.forEach((wv, i) => {
      if (!wv) return;
      const k = (t * 0.45 + i / 3) % 1;
      wv.scale.setScalar(1 + k * 1.25);
      wv.material.opacity = (1 - k) * 0.55 * e;
    });
    sats.current.rotation.y = -t * 0.6;
    fade(e);
    const show = A.labels ? e : 0;
    setCallouts(
      callouts.current,
      LABELS.map((_, i) => show * smooth(range(x, 0.55 + i * 0.07, 0.8 + i * 0.05)))
    );
  });

  return (
    <group ref={group}>
      <group ref={tilt}>
        {/* base */}
        <group ref={(el) => (parts.current[0] = el)}>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[1.0, 1.06, 0.16, 96]} />
            <meshStandardMaterial color="#0d1220" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.03, 0.012, 8, 160]} />
            <meshBasicMaterial color="#4cc9ff" toneMapped={false} />
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[Math.cos((i * Math.PI * 2) / 3) * 0.6, 0.19, Math.sin((i * Math.PI * 2) / 3) * 0.6]}>
              <cylinderGeometry args={[0.1, 0.1, 0.06, 24]} />
              <meshStandardMaterial color="#1b2740" emissive="#7a5cff" emissiveIntensity={0.6} />
            </mesh>
          ))}
          <Callout innerRef={callouts.current[3]} position={[-1.02, 0.1, 0]} {...LABELS[3]} />
        </group>
        {/* PCB */}
        <group ref={(el) => (parts.current[1] = el)}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.92, 96]} />
            <meshStandardMaterial map={tex.pcb} metalness={0.3} roughness={0.55} side={THREE.DoubleSide} />
          </mesh>
          <RoundedBox args={[0.5, 0.06, 0.7]} radius={0.015} position={[0, 0.04, 0]}>
            <meshStandardMaterial color="#c9ced8" metalness={1} roughness={0.25} />
          </RoundedBox>
          <mesh position={[0, 0.03, -0.42]}>
            <boxGeometry args={[0.5, 0.02, 0.14]} />
            <meshStandardMaterial color="#0b3a2c" />
          </mesh>
          {[
            [0.48, 0.25],
            [-0.5, 0.2],
            [0.42, -0.35],
            [-0.36, -0.42],
          ].map(([px, pz], i) => (
            <mesh key={i} position={[px, 0.025, pz]}>
              <boxGeometry args={[0.16, 0.05, 0.16]} />
              <meshStandardMaterial color="#111" metalness={0.4} roughness={0.5} />
            </mesh>
          ))}
          <Callout innerRef={callouts.current[2]} position={[0.7, 0.05, 0]} {...LABELS[2]} />
        </group>
        {/* anel de LED */}
        <group ref={(el) => (parts.current[2] = el)}>
          <mesh ref={ledRing} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.9, 0.035, 16, 160]} />
            <meshBasicMaterial color="#4cc9ff" toneMapped={false} />
          </mesh>
          <Callout innerRef={callouts.current[1]} position={[-0.96, 0, 0]} {...LABELS[1]} />
        </group>
        {/* display */}
        <group ref={(el) => (parts.current[3] = el)}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.62, 96]} />
            <meshBasicMaterial map={tex.screen} toneMapped={false} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <torusGeometry args={[0.64, 0.025, 12, 96]} />
            <meshStandardMaterial color="#0e1526" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
        {/* cúpula de vidro */}
        <group ref={(el) => (parts.current[4] = el)}>
          <mesh scale={[1, 0.34, 1]}>
            <sphereGeometry args={[0.98, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial
              color="#bfe6ff"
              transparent
              opacity={0.28}
              roughness={0.05}
              metalness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.05}
              side={THREE.DoubleSide}
            />
          </mesh>
          <Callout innerRef={callouts.current[0]} position={[0.7, 0.15, 0]} {...LABELS[0]} />
        </group>
        {/* ondas de sinal */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} ref={(el) => (waves.current[i] = el)} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} userData={{ noFade: true }}>
            <torusGeometry args={[1.1, 0.006, 6, 160]} />
            <meshBasicMaterial color="#4cc9ff" transparent opacity={0.4} toneMapped={false} depthWrite={false} />
          </mesh>
        ))}
        {/* satélites de dados */}
        <group ref={sats}>
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 1.75, 0.4 + (i % 2) * 0.5, Math.sin(a) * 1.75]}>
                <octahedronGeometry args={[0.06, 0]} />
                <meshBasicMaterial color={i % 2 ? "#7a5cff" : "#4cc9ff"} toneMapped={false} />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
}
