"use client";
import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import HydraCore from "./HydraCore";
import WebsiteStack from "./WebsiteStack";
import Dashboard3D from "./Dashboard3D";
import IoTDevice from "./IoTDevice";
import Laptop from "./Laptop";
import Portal from "./Portal";
import Particles from "./Particles";
import { scrollState } from "./store";

function CameraRig() {
  useFrame((state, dt) => {
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, scrollState.mouse.x * 0.35, 2.5, dt);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, scrollState.mouse.y * 0.22, 2.5, dt);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#dbefff" />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#7a5cff" distance={14} />
      <pointLight position={[5, 1, 2]} intensity={25} color="#00b8ff" distance={12} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#9fdcff" position={[0, 4, -6]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 1.2, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#4cc9ff" position={[6, -1, 0]} rotation-y={-Math.PI / 2} scale={[8, 1.2, 1]} />
        <Lightformer form="ring" intensity={4} color="#7a5cff" position={[0, -5, 2]} scale={4} />
      </Environment>
    </>
  );
}

export default function Scene({ onReady }) {
  const [quality, setQuality] = useState("high");
  const [effects, setEffects] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 900;
    if (coarse || small) {
      setQuality("low");
      setEffects(false);
    }
  }, []);

  return (
    <Canvas
      dpr={[1, quality === "high" ? 1.75 : 1.4]}
      camera={{ position: [0, 0, 8], fov: 35, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        onReady?.();
      }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor
        onDecline={() => {
          setEffects(false);
          setQuality("low");
        }}
      />
      <AdaptiveDpr pixelated={false} />
      <CameraRig />
      <Lights />
      <Particles count={quality === "high" ? 1600 : 800} />
      <Suspense fallback={null}>
        <HydraCore quality={quality} />
        <WebsiteStack />
        <Dashboard3D />
        <IoTDevice />
        <Laptop />
        <Portal />
      </Suspense>
      {effects && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.62} luminanceSmoothing={0.2} radius={0.75} />
          <Vignette eskil={false} offset={0.25} darkness={0.6} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
