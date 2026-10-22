"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGL2RenderingContext && c.getContext("webgl2")) || !!c.getContext("webgl");
  } catch {
    return false;
  }
}

/** Camada 3D fixa atrás de todo o conteúdo + tela de abertura. */
export default function Experience() {
  const [supported, setSupported] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ok = hasWebGL();
    setSupported(ok);
    if (!ok) setReady(true);
    const fallback = setTimeout(() => setReady(true), 4500);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-ready", ready);
  }, [ready]);

  return (
    <>
      <div className="stage" aria-hidden="true">
        <div className="stage__bg" />
        {supported && <Scene onReady={() => setTimeout(() => setReady(true), 350)} />}
        {supported === false && <div className="stage__fallback" />}
      </div>
      <div className={`intro ${ready ? "intro--done" : ""}`} aria-hidden="true">
        <div className="intro__mark">
          <img src="/images/hydra-mark.png" alt="" width="88" height="88" />
          <span className="intro__word">HYDRA</span>
          <span className="intro__bar">
            <span />
          </span>
        </div>
      </div>
    </>
  );
}
