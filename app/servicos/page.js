import BodyClass from "@/components/BodyClass";
import { getServices } from "@/lib/content";

export const metadata = {
  title: "Serviços · Hydra Technologies",
  description:
    "Conheça todos os serviços da Hydra Technologies: desenvolvimento web, apps, sistemas empresariais, automação, IA e cloud.",
  openGraph: {
    title: "Serviços · Hydra Technologies",
    description:
      "Conheça todos os serviços da Hydra Technologies: desenvolvimento web, apps, sistemas empresariais, automação, IA e cloud.",
    type: "website",
    images: ["/images/logo.jpeg"],
  },
};

export default function ServicosPage() {
  const services = getServices();

  return (
    <>
      <BodyClass className="page--services" />

      <main id="main">
        <section className="section page-hero">
          <div className="hero__bg" aria-hidden="true">
            <div className="hero__aurora hero__aurora--sub"></div>
            <div className="hero__grid"></div>
          </div>
          <div className="container">
            <p className="eyebrow" data-aos="fade-up">
              O que fazemos
            </p>
            <h1 className="page-hero__title" data-aos="fade-up" data-aos-delay="100">
              Serviços que <span className="text-gradient">escalam</span> negócios
            </h1>
            <p className="page-hero__subtitle" data-aos="fade-up" data-aos-delay="200">
              Da concepção à operação: construímos os sistemas que sustentam empresas ambiciosas.
            </p>
          </div>
        </section>

        <section className="section services services--page">
          <div className="container">
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
                  <div className="service-card__icon" aria-hidden="true">
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

        <svg className="sr-only" aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          <defs>
            <g id="icon-code">
              <path
                fill="currentColor"
                d="M11 22 4 16l7-6v3.2L8 16l3 2.8Zm10 0v-3.2l3-2.8-3-2.8V10l7 6Zm-8.6 4L10 25 18 6l2.4 1Z"
              />
            </g>
            <g id="icon-mobile">
              <path
                fill="currentColor"
                d="M11 4h10a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm5 20.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM11.4 6.6v16.8h9.2V6.6Z"
              />
            </g>
            <g id="icon-enterprise">
              <path
                fill="currentColor"
                d="M6 26V10l8-4v6l8-3v17Zm4-13h2v2h-2Zm0 5h2v2h-2Zm6-5h2v2h-2Zm0 5h2v2h-2Zm6 1h2v2h-2Z"
              />
            </g>
            <g id="icon-automation">
              <path
                fill="currentColor"
                d="M16 4a12 12 0 1 0 12 12h-3a9 9 0 1 1-2.64-6.36L20 12h8V4l-2.9 2.9A11.96 11.96 0 0 0 16 4Z"
              />
            </g>
            <g id="icon-ai">
              <path
                fill="currentColor"
                d="M16 3 4 9v8c0 6.6 4.6 11.4 12 13 7.4-1.6 12-6.4 12-13V9Zm0 5.4L21 20h-2l-1-2.6h-4L13 20h-2Zm-1.2 6.4h2.4L16 11.8Z"
              />
            </g>
            <g id="icon-cloud">
              <path
                fill="currentColor"
                d="M11.5 24A6.5 6.5 0 0 1 10.4 11a8 8 0 0 1 15.4 2.3A5.5 5.5 0 0 1 24.5 24Z"
              />
            </g>
          </defs>
        </svg>

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
