import { SITE, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="/" className="brand" aria-label="Hydra Technologies">
            <img src="/images/hydra-mark.png" alt="" width="34" height="34" className="brand__mark" />
            <span className="brand__text">
              <span className="brand__name">HYDRA</span>
              <span className="brand__sub">TECHNOLOGIES</span>
            </span>
          </a>
          <p>Sites institucionais, sistemas internos sob medida e, em breve, dispositivos inteligentes conectados.</p>
        </div>
        <nav className="footer__col" aria-label="Rodapé">
          <h3>Navegação</h3>
          <a href="/#sites">Sites institucionais</a>
          <a href="/#sistemas">Sistemas internos</a>
          <a href="/#iot">IoT</a>
          <a href="/#portfolio">Portfólio</a>
        </nav>
        <div className="footer__col">
          <h3>Contato</h3>
          <a href={waLink("Olá! Vim pelo site da Hydra.")} target="_blank" rel="noopener noreferrer">
            WhatsApp {SITE.phoneDisplay}
          </a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <span>{SITE.city}</span>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Hydra Technologies. Todos os direitos reservados.</span>
        <span className="footer__made">Desenvolvido pela própria Hydra · Next.js + Three.js</span>
      </div>
      <div className="footer__word" aria-hidden="true">
        HYDRA
      </div>
    </footer>
  );
}
