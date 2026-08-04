export default function Navbar() {
  return (
    <header className="navbar" id="navbar" data-cursor-zone="nav">
      <nav className="navbar__inner" aria-label="Navegação principal">
        <a href="/" className="navbar__brand" aria-label="Hydra Technologies — página inicial">
          <img src="/images/logo.png" alt="Hydra Technologies" className="navbar__logo-img" />
          <span className="navbar__wordmark">
            Hydra<span className="navbar__wordmark-sub">Technologies</span>
          </span>
        </a>

        <button
          className="navbar__toggle"
          id="navToggle"
          aria-expanded="false"
          aria-controls="navMenu"
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="navbar__menu" id="navMenu">
          <ul className="navbar__links" role="list">
            <li>
              <a href="/#home" className="navbar__link" data-nav-link>
                Home
              </a>
            </li>
            <li>
              <a href="/#servicos" className="navbar__link" data-nav-link>
                Serviços
              </a>
            </li>
            <li>
              <a href="/#produtos" className="navbar__link" data-nav-link>
                Produtos
              </a>
            </li>
            <li>
              <a href="/sobre" className="navbar__link" data-nav-link>
                Sobre
              </a>
            </li>
            <li>
              <a href="/contato" className="navbar__link" data-nav-link>
                Contato
              </a>
            </li>
          </ul>
          <a href="/contato" className="btn btn--primary btn--magnetic navbar__cta" data-magnetic>
            <span className="btn__label">Solicitar orçamento</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
