"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useAnchor, useSectionValues, useFade, Callout, setCallouts } from "./common";
import { keyboardTexture, glowTexture } from "./textures";
import { smooth, range, lerp, scrollState } from "./store";

const LW = 3.0;
const LD = 2.0;
const SH = 1.92;

export default function Laptop({ id = "portfolio" }) {
  const group = useRef();
  const turn = useRef();
  const hinge = useRef();
  const screenB = useRef();
  const glow = useRef();
  const callouts = useRef([{ current: null }, { current: null }]);
  const read = useSectionValues(id);
  const A = useAnchor();
  const fade = useFade(group);
  const [login, servicos] = useTexture(["/images/portfolio/elen-login.jpg", "/images/portfolio/elen-servicos.jpg"]);
  useMemo(() => {
    [login, servicos].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [login, servicos]);
  const keys = useMemo(() => keyboardTexture(), []);
  const halo = useMemo(() => glowTexture("rgba(255,220,160,1)", "rgba(120,80,20,0)"), []);

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
    const open = smooth(range(p, 0.0, 0.3)) * e;
    g.position.set(A.x, A.y - 0.35 * A.s + (1 - e) * -0.8 + Math.sin(t * 0.6) * 0.03, (1 - e) * -2);
    g.scale.setScalar(A.s * 0.95 * (0.6 + 0.4 * e));
    turn.current.rotation.set(
      lerp(0.5, 0.22, open) - scrollState.mouse.y * 0.06,
      lerp(0.75, -0.2, smooth(range(p, 0, 0.75))) + scrollState.mouse.x * 0.12,
      0
    );
    hinge.current.rotation.x = lerp(Math.PI / 2 - 0.02, -0.22, open);
    // troca de tela: login → serviços
    const swap = smooth(range(p, 0.45, 0.62));
    screenB.current.material.opacity = swap * e;
    glow.current.material.opacity = 0.22 * open;
    fade(e);
    const show = A.labels ? e : 0;
    setCallouts(callouts.current, [show * smooth(range(p, 0.2, 0.4)) * (1 - swap), show * swap]);
  });

  return (
    <group ref={group}>
      <group ref={turn}>
        {/* base */}
        <RoundedBox args={[LW, 0.09, LD]} radius={0.04} smoothness={4} position={[0, -0.045, 0]}>
          <meshStandardMaterial color="#1b1d23" metalness={0.85} roughness={0.32} />
        </RoundedBox>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0.02]}>
          <planeGeometry args={[LW - 0.2, LD - 0.2]} />
          <meshStandardMaterial map={keys} color="#9aa0ad" metalness={0} roughness={0.95} />
        </mesh>
        {/* reflexo dourado sob a tela (identidade do Studio) */}
        <mesh ref={glow} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, -0.3]} userData={{ noFade: true }}>
          <planeGeometry args={[5.5, 4]} />
          <meshBasicMaterial map={halo} color="#d6b06a" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
        {/* tela */}
        <group ref={hinge} position={[0, 0.0, -LD / 2 + 0.02]}>
          <group position={[0, SH / 2, 0]}>
            <RoundedBox args={[LW, SH, 0.06]} radius={0.04} smoothness={4} position={[0, 0, -0.035]}>
              <meshStandardMaterial color="#1b1d23" metalness={0.85} roughness={0.3} />
            </RoundedBox>
            <mesh position={[0, 0, 0.0]}>
              <planeGeometry args={[LW - 0.12, SH - 0.12]} />
              <meshBasicMaterial color="#000" />
            </mesh>
            <mesh position={[0, 0.0, 0.002]}>
              <planeGeometry args={[LW - 0.16, (LW - 0.16) / 1.6]} />
              <meshBasicMaterial map={login} toneMapped={false} />
            </mesh>
            <mesh ref={screenB} position={[0, 0.0, 0.004]} userData={{ noFade: true }}>
              <planeGeometry args={[LW - 0.16, (LW - 0.16) / 1.6]} />
              <meshBasicMaterial map={servicos} toneMapped={false} transparent opacity={0} />
            </mesh>
            <Callout innerRef={callouts.current[0]} position={[LW / 2 - 0.45, 0.45, 0.02]} title="Login exclusivo" text="Identidade visual do Studio" side="right" />
            <Callout innerRef={callouts.current[1]} position={[LW / 2 - 0.45, 0.45, 0.02]} title="Catálogo de serviços" text="Preço, duração e retorno" side="right" />
          </group>
        </group>
      </group>
    </group>
  );
}
