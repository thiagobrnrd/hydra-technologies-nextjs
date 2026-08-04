export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true"></div>

      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" className="footer__logo" aria-label="Hydra Technologies">
              <img src="/images/logo.png" alt="Hydra Technologies" className="footer__logo-img" />
            </a>
            <p className="footer__tagline">Transformamos ideias em soluções digitais inteligentes.</p>
            <div className="footer__social" aria-label="Redes sociais">
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.66 4.78 6.12V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9z"
                  />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43A4.9 4.9 0 0 1 3.82 3a4.9 4.9 0 0 1 1.77-1.15c.46-.16 1.26-.35 2.43-.4C9.29 1.4 9.67 1.4 12 1.4M12 0C8.7 0 8.3 0 7 .06c-1.28.06-2.16.27-2.92.57a7.1 7.1 0 0 0-2.57 1.68A7.1 7.1 0 0 0 .57 4.88C.27 5.64.06 6.52.06 7.8 0 9.1 0 9.5 0 12.8s0 3.7.06 5c.06 1.28.27 2.16.57 2.92.31.79.72 1.46 1.68 2.57.11 1.96.89 2.37 1.68 2.68.76.3 1.64.51 2.92.57 1.3.06 1.7.06 5 .06s3.7 0 5-.06c1.28-.06 2.16-.27 2.92-.57a7.1 7.1 0 0 0 2.57-1.68 7.1 7.1 0 0 0 1.68-2.57c.3-.76.51-1.64.57-2.92.06-1.3.06-1.7.06-5s0-3.7-.06-5c-.06-1.28-.27-2.16-.57-2.92a7.1 7.1 0 0 0-1.68-2.57A7.1 7.1 0 0 0 19.92.63c-.76-.3-1.64-.51-2.92-.57C15.7 0 15.3 0 12 0Z"
                  />
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.2c-3.34.72-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <nav className="footer__col" aria-label="Navegação">
            <h3 className="footer__col-title">Navegação</h3>
            <ul role="list">
              <li>
                <a href="/#home">Home</a>
              </li>
              <li>
                <a href="/#servicos">Serviços</a>
              </li>
              <li>
                <a href="/#produtos">Produtos</a>
              </li>
              <li>
                <a href="/sobre">Sobre</a>
              </li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Empresa">
            <h3 className="footer__col-title">Empresa</h3>
            <ul role="list">
              <li>
                <a href="/contato">Contato</a>
              </li>
              <li>
                <a href="/servicos">Todos os serviços</a>
              </li>
              <li>
                <a href="#produtos-destaque">HydraBand</a>
              </li>
            </ul>
          </nav>

          <div className="footer__col">
            <h3 className="footer__col-title">Contato</h3>
            <ul role="list" className="footer__contact-list">
              <li>
                <a href="mailto:contato@hydratechnologies.com">contato.techhydra@gmail.com</a>
              </li>
              <li>
                <a href="tel:+5511999999999">+55 11 999101739</a>
              </li>
              <li>Suzano, São Paulo</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; <span id="footerYear">2026</span> Hydra Technologies. Todos os direitos reservados.
          </p>
          <div className="footer__legal">
            <a href="#">Privacidade</a>
            <span aria-hidden="true">·</span>
            <a href="#">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
