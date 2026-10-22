"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  ["sites", "Sites"],
  ["sistemas", "Sistemas"],
  ["iot", "IoT"],
  ["portfolio", "Portfólio"],
  ["processo", "Processo"],
];

export default function Nav() {
  const path = usePathname();
  const home = path === "/";
  const href = (id) => (home ? `#${id}` : `/#${id}`);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""} ${open ? "nav--open" : ""}`}>
      <div className="container nav__inner">
        <a href={home ? "#inicio" : "/"} className="brand" aria-label="Hydra Technologies — início" onClick={() => setOpen(false)}>
          <img src="/images/hydra-mark.png" alt="" width="34" height="34" className="brand__mark" />
          <span className="brand__text">
            <span className="brand__name">HYDRA</span>
            <span className="brand__sub">TECHNOLOGIES</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Principal">
          {LINKS.map(([id, label]) => (
            <a key={id} href={href(id)} className="nav__link" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a href={home ? "#contato" : "/contato"} className="btn btn--primary btn--sm nav__cta" data-service="" onClick={() => setOpen(false)}>
          Solicitar orçamento
        </a>

        <button
          type="button"
          className="nav__burger"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="mmenu" hidden={!open}>
        <nav aria-label="Menu móvel">
          {LINKS.map(([id, label], i) => (
            <a key={id} href={href(id)} onClick={() => setOpen(false)} style={{ "--i": i }}>
              <span className="mmenu__n">0{i + 1}</span>
              {label}
            </a>
          ))}
          <a href={home ? "#contato" : "/contato"} onClick={() => setOpen(false)} style={{ "--i": LINKS.length }}>
            <span className="mmenu__n">06</span>
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}
