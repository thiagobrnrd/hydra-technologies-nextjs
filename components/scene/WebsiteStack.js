"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Line } from "@react-three/drei";
import { useAnchor, useSectionValues, useFade, Callout, setCallouts } from "./common";
import { siteLayer } from "./textures";
import { smooth, range, lerp, scrollState } from "./store";

const W = 3.2;
const H = 2.0;
const LABELS = [
  null,
  { title: "Layout responsivo", text: "Perfeito no celular e no desktop", side: "right", y: -0.8 },
  { title: "Conteúdo que vende", text: "SEO, textos e identidade visual", side: "right", y: 0.0 },
  { title: "Conversão", text: "Formulários e WhatsApp integrados", side: "right", y: 0.8 },
];

export default function WebsiteStack({ id = "sites" }) {
  const group = useRef();
  const tilt = useRef();
  const layers = useRef([]);
  const callouts = useRef(LABELS.map(() => ({ current: null })));
  const read = useSectionValues(id);
  const A = useAnchor();
  const fade = useFade(group);
  const textures = useMemo(() => [0, 1, 2, 3].map((k) => siteLayer(k)), []);
  const outline = useMemo(
    () => [
      [-W / 2, -H / 2, 0],
      [W / 2, -H / 2, 0],
      [W / 2, H / 2, 0],
      [-W / 2, H / 2, 0],
      [-W / 2, -H / 2, 0],
    ],
    []
  );

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
    // explosão: começa logo que a seção fixa e abre até ~65% do scroll
    const x = smooth(range(p, 0.02, 0.62));
    g.position.set(A.x, A.y + (1 - e) * -0.8 + Math.sin(t * 0.7) * 0.05, (1 - e) * -2);
    g.scale.setScalar(A.s * 0.92 * (0.6 + 0.4 * e));
    tilt.current.rotation.set(
      lerp(0.08, 0.42, x) - scrollState.mouse.y * 0.08,
      lerp(-0.18, -0.78, x) + scrollState.mouse.x * 0.12 + (1 - e) * 0.6,
      lerp(0, 0.06, x)
    );
    layers.current.forEach((l, i) => {
      if (!l) return;
      l.position.z = i * lerp(0.035, 0.62, x) - lerp(0, 0.9, x);
    });
    fade(e);
    const showLabels = A.labels ? e * smooth(range(x, 0.55, 0.95)) : 0;
    setCallouts(
      callouts.current,
      LABELS.map((_, i) => showLabels * smooth(range(x, 0.5 + i * 0.08, 0.7 + i * 0.08)))
    );
  });

  return (
    <group ref={group}>
      <group ref={tilt}>
        {textures.map((map, i) => (
          <group key={i} ref={(el) => (layers.current[i] = el)}>
            {i === 0 && (
              <RoundedBox args={[W + 0.06, H + 0.06, 0.06]} radius={0.05} smoothness={4} position={[0, 0, -0.04]}>
                <meshStandardMaterial color="#0a1220" metalness={0.7} roughness={0.35} />
              </RoundedBox>
            )}
            <mesh>
              <planeGeometry args={[W, H]} />
              <meshBasicMaterial map={map} transparent toneMapped={false} depthWrite={i === 0} />
            </mesh>
            {i > 0 && (
              <Line points={outline} color={i === 3 ? "#7a5cff" : "#4cc9ff"} lineWidth={1} transparent opacity={0.45} />
            )}
            {LABELS[i] && (
              <Callout
                innerRef={callouts.current[i]}
                position={[W / 2 - 0.55, LABELS[i].y, 0]}
                title={LABELS[i].title}
                text={LABELS[i].text}
                side={LABELS[i].side}
              />
            )}
          </group>
        ))}
      </group>
    </group>
  );
}
