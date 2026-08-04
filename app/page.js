import BodyClass from "@/components/BodyClass";
import IconSprite from "@/components/IconSprite";
import {
  getServices,
  getProducts,
  getDifferentiators,
  getStats,
  getProcessSteps,
} from "@/lib/content";

export const metadata = {
  title: "We Build The Future · Hydra Technologies",
  description:
    "Hydra Technologies — desenvolvimento web, apps, sistemas empresariais, automação, IA e cloud com design premium.",
  openGraph: {
    title: "We Build The Future · Hydra Technologies",
    description:
      "Hydra Technologies — desenvolvimento web, apps, sistemas empresariais, automação, IA e cloud com design premium.",
    type: "website",
    images: ["/images/logo.jpeg"],
  },
};

export default function HomePage() {
  const services = getServices();
  const products = getProducts();
  const differentiators = getDifferentiators();
  const stats = getStats();
  const processSteps = getProcessSteps();

  return (
    <>
      <BodyClass className="page--home" />

      <main id="main">
        {/* ============ HERO ============ */}
        <section className="hero" id="home">
          <div className="hero__bg" aria-hidden="true">
            <div className="hero__aurora"></div>
            <div className="hero__grid"></div>
            <canvas id="particlesCanvas" className="hero__particles"></canvas>
            <svg className="hero__lines" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
              <path className="hero__line hero__line--1" d="M-100,650 C 300,500 500,750 1540,300" />
              <path className="hero__line hero__line--2" d="M-100,300 C 400,150 700,500 1540,150" />
              <path className="hero__line hero__line--3" d="M-100,800 C 500,850 900,600 1540,700" />
            </svg>
          </div>

          <div className="container hero__content">
            <p className="eyebrow" data-aos="fade-up">
              Hydra Technologies
            </p>
            <h1 className="hero__title" data-split-title>
              <span className="line">Sua Tecnologia,</span>
              <span className="line hero__title-gradient">Nossa Missão.</span>
            </h1>
            <p className="hero__subtitle" data-aos="fade-up" data-aos-delay="150">
              Transformamos ideias em soluções digitais inteligentes.
            </p>
            <div className="hero__actions" data-aos="fade-up" data-aos-delay="250">
              <a href="/contato" className="btn btn--primary btn--magnetic btn--lg" data-magnetic>
                <span className="btn__label">Solicitar orçamento</span>
              </a>
              <a href="#servicos" className="btn btn--ghost btn--lg" data-scroll-to="#servicos">
                <span className="btn__label">Conhecer serviços</span>
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path fill="currentColor" d="M12 16 4 8l1.4-1.4L12 13.2l6.6-6.6L20 8Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero__hologram" aria-hidden="true" data-tilt>
            <div className="hologram__ring hologram__ring--1"></div>
            <div className="hologram__ring hologram__ring--2"></div>
            <div className="hologram__ring hologram__ring--3"></div>
            <div className="hologram__core">
              <img src="/images/logo.png" alt="" className="hologram__logo" />
            </div>
            <div className="hologram__card hologram__card--1">
              <span className="hologram__card-label">Segurança</span>
              <span className="hologram__card-value">LGPD</span>
            </div>
            <div className="hologram__card hologram__card--2">
              <span className="hologram__card-label">Suporte</span>
              <span className="hologram__card-value">24/7</span>
            </div>
          </div>

          <button className="hero__scroll" data-scroll-to="#servicos" aria-label="Rolar para a próxima seção">
            <span className="hero__scroll-line"></span>
          </button>
        </section>

        {/* ============ SERVIÇOS ============ */}
        <section className="section services" id="servicos">
          <div className="container">
            <div className="section__head" data-aos="fade-up">
              <p className="eyebrow">O que fazemos</p>
              <h2 className="section__title">
                Serviços projetados para <span className="text-gradient">escalar</span> o seu negócio
              </h2>
            </div>

            <div className="services__grid">
              {services.map((service, i) => (
                <article
                  className="service-card"
                  key={service.index}
                  data-tilt-card
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  <div className="service-card__glow" aria-hidden="true"></div>
                  <span className="service-card__index">{service.index}</span>
                  <div className={`service-card__icon icon-${service.icon}`} aria-hidden="true">
                    <svg viewBox="0 0 32 32" width="28" height="28">
                      <use href={`#icon-${service.icon}`}></use>
                    </svg>
                  </div>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__desc">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Shared icon sprite */}
        <IconSprite />

        {/* ============ PRODUTOS ============ */}
        <section className="section products" id="produtos">
          <div className="container">
            <div className="section__head" data-aos="fade-up">
              <p className="eyebrow">Produtos Hydra</p>
              <h2 className="section__title">
                Hardware e software, <span className="text-gradient">na mesma régua</span>
              </h2>
            </div>

            <div className="products__grid" id="produtos-destaque">
              {products[0] && (
                <article className="product-card product-card--featured" data-aos="fade-up">
                  <div className="product-card__glow" aria-hidden="true"></div>
                  <div className="product-card__mockup" data-tilt>
                    <div className="mockup__collar">
                      <div className="mockup__collar-band"></div>
                      <div className="mockup__collar-node"></div>
                    </div>
                  </div>
                  <div className="product-card__body">
                    <div className="product-card__badges">
                      <span className="badge">Destaque</span>
                      {products[0].comingSoon && <span className="badge badge--soon">Em Breve</span>}
                    </div>
                    <h3 className="product-card__title">{products[0].name}</h3>
                    <p className="product-card__tagline">{products[0].tagline}</p>
                    <p className="product-card__desc">{products[0].description}</p>
                    <ul className="product-card__highlights" role="list">
                      {products[0].highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <a href="/contato" className="btn btn--outline btn--magnetic" data-magnetic>
                      <span className="btn__label">
                        {products[0].comingSoon ? "Ser avisado no lançamento" : "Saiba mais"}
                      </span>
                    </a>
                  </div>
                </article>
              )}

              {products.length > 1 && (
                <article className="product-card" data-aos="fade-up" data-aos-delay="150">
                  <div className="product-card__glow" aria-hidden="true"></div>
                  <div className="product-card__mockup product-card__mockup--os" data-tilt>
                    <div className="mockup__os-orb"></div>
                  </div>
                  <div className="product-card__body">
                    {products[1].comingSoon && (
                      <div className="product-card__badges">
                        <span className="badge badge--soon">Em Breve</span>
                      </div>
                    )}
                    <h3 className="product-card__title">{products[1].name}</h3>
                    <p className="product-card__tagline">{products[1].tagline}</p>
                    <p className="product-card__desc">{products[1].description}</p>
                    <ul className="product-card__highlights" role="list">
                      {products[1].highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        {/* ============ DIFERENCIAIS (horizontal scroll) ============ */}
        <section className="section diff" id="diferenciais">
          <div className="diff__head container" data-aos="fade-up">
            <p className="eyebrow">Por que a Hydra</p>
            <h2 className="section__title">
              Seis razões para construir <span className="text-gradient">com a gente</span>
            </h2>
          </div>

          <div className="diff__track-wrap">
            <div className="diff__track" id="diffTrack">
              {differentiators.map((d) => (
                <article className="diff-card" key={d.title}>
                  <div className="diff-card__icon" aria-hidden="true">
                    <svg viewBox="0 0 32 32" width="30" height="30">
                      <use href={`#icon-${d.icon}`}></use>
                    </svg>
                  </div>
                  <h3 className="diff-card__title">{d.title}</h3>
                  <p className="diff-card__desc">{d.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ ESTATÍSTICAS ============ */}
        <section className="section stats">
          <div className="stats__glow" aria-hidden="true"></div>
          <div className="container">
            <div className="stats__grid">
              {stats.map((stat) => (
                <div className="stat" key={stat.label} data-aos="fade-up">
                  <p className="stat__value">
                    <span>{stat.prefix}</span>
                    <span className="stat__number" data-count-to={stat.value}>
                      0
                    </span>
                    <span>{stat.suffix}</span>
                  </p>
                  <p className="stat__label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PROCESSO ============ */}
        <section className="section process" id="processo">
          <div className="container">
            <div className="section__head" data-aos="fade-up">
              <p className="eyebrow">Como trabalhamos</p>
              <h2 className="section__title">
                Um processo <span className="text-gradient">claro</span>, do início ao suporte
              </h2>
            </div>

            <ol className="process__timeline" role="list">
              {processSteps.map((step, i) => (
                <li className="process__step" key={step.order} data-aos="fade-up" data-aos-delay={i * 80}>
                  <span className="process__order">{step.order}</span>
                  <div className="process__body">
                    <h3 className="process__title">{step.title}</h3>
                    <p className="process__desc">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ SOBRE (teaser) ============ */}
        <section className="section about-teaser">
          <div className="container about-teaser__grid">
            <div className="about-teaser__media" data-aos="fade-right" data-tilt>
              <div className="about-teaser__frame">
                <div className="about-teaser__scan" aria-hidden="true"></div>
                <img src="/images/logo.png" alt="Hydra Technologies" className="about-teaser__logo" />
              </div>
            </div>
            <div className="about-teaser__content" data-aos="fade-left">
              <p className="eyebrow">Sobre a Hydra</p>
              <h2 className="section__title">
                Engenharia com <span className="text-gradient">alma de produto</span>
              </h2>
              <p className="about-teaser__text">
                Nascemos para provar que software brasileiro pode competir com os melhores do mundo. Cada projeto
                passa pelas mãos de um time enxuto e obcecado por detalhes do primeiro wireframe ao último commit em
                produção.
              </p>
              <a href="/sobre" className="btn btn--outline btn--magnetic" data-magnetic>
                <span className="btn__label">Conhecer a Hydra</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="section cta">
          <div className="cta__bg" aria-hidden="true">
            <div className="cta__aurora"></div>
          </div>
          <div className="container cta__content" data-aos="zoom-in">
            <h2 className="cta__title">
              Vamos construir
              <br />
              <span className="text-gradient">o futuro juntos.</span>
            </h2>
            <a href="/contato" className="btn btn--primary btn--xl btn--magnetic" data-magnetic>
              <span className="btn__label">Solicitar orçamento</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
