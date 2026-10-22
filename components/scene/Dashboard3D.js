"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useAnchor, useSectionValues, useFade, Callout, setCallouts } from "./common";
import { dashBoardTexture, kpiTexture, notifyTexture } from "./textures";
import { smooth, range, lerp, scrollState } from "./store";

const BW = 3.4;
const BH = 2.2;
const KPIS = [
  ["Hoje", "12", "#00b8ff"],
  ["Clientes", "318", "#4cc9ff"],
  ["Mês", "R$ 9,4k", "#7a5cff"],
];
const BARS = [0.35, 0.55, 0.42, 0.7, 0.62, 0.85, 0.74, 0.95, 0.8, 1.0];
const LABELS = [
  { title: "Agenda online", text: "Clientes marcam pelo link, 24h", side: "right", pos: [1.2, -0.45, 0.1] },
  { title: "Financeiro", text: "Faturamento e relatórios do mês", side: "right", pos: [1.0, 0.68, 0.36] },
  { title: "Lembretes", text: "Confirmação pelo WhatsApp", side: "right", pos: [1.15, 1.15, 0.9] },
];

export default function Dashboard3D({ id = "sistemas" }) {
  const group = useRef();
  const tilt = useRef();
  const kpis = useRef([]);
  const bars = useRef([]);
  const cells = useRef([]);
  const notify = useRef();
  const callouts = useRef(LABELS.map(() => ({ current: null })));
  const read = useSectionValues(id);
  const A = useAnchor();
  const fade = useFade(group);

  const tex = useMemo(
    () => ({
      board: dashBoardTexture(),
      kpi: KPIS.map(([l, v, c]) => kpiTexture(l, v, c)),
      notify: notifyTexture(),
    }),
    []
  );
  const lit = useMemo(() => new Set([2, 5, 9, 10, 13, 16, 19, 22, 24, 26]), []);
  const barColor = useMemo(() => BARS.map((_, i) => new THREE.Color().lerpColors(new THREE.Color("#00b8ff"), new THREE.Color("#7a5cff"), i / BARS.length)), []);

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
    const x = smooth(range(p, 0.02, 0.7));
    g.position.set(A.x, A.y + (1 - e) * -0.8 + Math.sin(t * 0.6) * 0.04, (1 - e) * -2);
    g.scale.setScalar(A.s * 0.9 * (0.6 + 0.4 * e));
    tilt.current.rotation.set(
      lerp(-0.12, -0.95, x) - scrollState.mouse.y * 0.06,
      lerp(-0.25, -0.5, x) + scrollState.mouse.x * 0.1 + (1 - e) * 0.5,
      lerp(0, -0.22, x)
    );
    kpis.current.forEach((k, i) => {
      if (!k) return;
      const r = smooth(range(x, 0.05 + i * 0.1, 0.45 + i * 0.1));
      k.position.z = 0.04 + r * 0.28;
    });
    bars.current.forEach((b, i) => {
      if (!b) return;
      const r = smooth(range(x, 0.2 + i * 0.04, 0.55 + i * 0.04));
      const h = Math.max(0.001, BARS[i] * 0.9 * r);
      b.scale.z = h;
      b.position.z = 0.03 + h / 2;
    });
    cells.current.forEach((c, i) => {
      if (!c) return;
      const on = lit.has(i) && x > 0.35 + (i / 28) * 0.4;
      c.material.color.set(on ? (i % 3 === 0 ? "#7a5cff" : "#00b8ff") : "#13203a");
      c.position.z = on ? 0.06 : 0.025;
    });
    const n = smooth(range(x, 0.6, 0.9));
    notify.current.position.set(lerp(2.4, 0.95, n), lerp(1.6, 1.15, n), 0.9 + Math.sin(t * 1.4) * 0.04);
    notify.current.scale.setScalar(0.001 + n);
    fade(e);
    const show = A.labels ? e : 0;
    setCallouts(callouts.current, [show * smooth(range(x, 0.5, 0.75)), show * smooth(range(x, 0.6, 0.85)), show * n]);
  });

  return (
    <group ref={group}>
      <group ref={tilt}>
        <RoundedBox args={[BW + 0.08, BH + 0.08, 0.08]} radius={0.06} smoothness={4} position={[0, 0, -0.045]}>
          <meshStandardMaterial color="#0a1120" metalness={0.75} roughness={0.32} />
        </RoundedBox>
        <mesh>
          <planeGeometry args={[BW, BH]} />
          <meshBasicMaterial map={tex.board} toneMapped={false} />
        </mesh>
        {/* KPIs */}
        {KPIS.map((_, i) => (
          <group key={i} ref={(el) => (kpis.current[i] = el)} position={[-0.75 + i * 0.86, 0.68, 0.04]}>
            <RoundedBox args={[0.78, 0.46, 0.05]} radius={0.04} smoothness={3} position={[0, 0, -0.03]}>
              <meshStandardMaterial color="#0d1830" metalness={0.5} roughness={0.4} />
            </RoundedBox>
            <mesh position={[0, 0, 0.001]}>
              <planeGeometry args={[0.76, 0.445]} />
              <meshBasicMaterial map={tex.kpi[i]} toneMapped={false} transparent />
            </mesh>
          </group>
        ))}
        {/* Gráfico de barras */}
        {BARS.map((_, i) => (
          <mesh key={i} ref={(el) => (bars.current[i] = el)} position={[-1.0 + i * 0.13, -0.62, 0.03]}>
            <boxGeometry args={[0.085, 0.085, 1]} />
            <meshStandardMaterial color={barColor[i]} emissive={barColor[i]} emissiveIntensity={0.9} roughness={0.3} metalness={0.2} toneMapped={false} />
          </mesh>
        ))}
        <mesh position={[-0.42, -0.62, 0.02]}>
          <planeGeometry args={[1.45, 0.62]} />
          <meshBasicMaterial color="#0c1628" toneMapped={false} />
        </mesh>
        {/* Calendário */}
        {Array.from({ length: 28 }).map((_, i) => (
          <mesh key={i} ref={(el) => (cells.current[i] = el)} position={[0.52 + (i % 7) * 0.15, -0.18 - Math.floor(i / 7) * 0.2, 0.025]}>
            <boxGeometry args={[0.12, 0.16, 0.03]} />
            <meshStandardMaterial color="#13203a" emissive="#00b8ff" emissiveIntensity={0.25} roughness={0.5} />
          </mesh>
        ))}
        {/* Notificação flutuante */}
        <mesh ref={notify}>
          <planeGeometry args={[1.25, 0.36]} />
          <meshBasicMaterial map={tex.notify} transparent toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
        {LABELS.map((l, i) => (
          <Callout key={i} innerRef={callouts.current[i]} position={l.pos} title={l.title} text={l.text} side={l.side} />
        ))}
      </group>
    </group>
  );
}
