import BodyClass from "@/components/BodyClass";
import { getStats } from "@/lib/content";

export const metadata = {
  title: "Sobre · Hydra Technologies",
  description: "Conheça a Hydra Technologies: nossa missão, valores e o time por trás dos produtos.",
  openGraph: {
    title: "Sobre · Hydra Technologies",
    description: "Conheça a Hydra Technologies: nossa missão, valores e o time por trás dos produtos.",
    type: "website",
    images: ["/images/logo.jpeg"],
  },
};

export default function SobrePage() {
  const stats = getStats();

  return (
    <>
      <BodyClass className="page--about" />

      <main id="main">
        <section className="section page-hero">
          <div className="hero__bg" aria-hidden="true">
            <div className="hero__aurora hero__aurora--sub"></div>
            <div className="hero__grid"></div>
          </div>
          <div className="container">
            <p className="eyebrow" data-aos="fade-up">
              Sobre a Hydra
            </p>
            <h1 className="page-hero__title" data-aos="fade-up" data-aos-delay="100">
              Três cabeças, <span className="text-gradient">uma visão</span>
            </h1>
            <p className="page-hero__subtitle" data-aos="fade-up" data-aos-delay="200">
              Estratégia, design e engenharia trabalhando como um único organismo.
            </p>
          </div>
        </section>

        <section className="section about-story">
          <div className="container about-story__grid">
            <div className="about-story__media" data-aos="fade-right" data-tilt>
              <div className="about-teaser__frame">
                <div className="about-teaser__scan" aria-hidden="true"></div>
                <img src="/images/logo.png" alt="Hydra Technologies" className="about-teaser__logo" />
              </div>
            </div>
            <div className="about-story__content" data-aos="fade-left">
              <p className="eyebrow">Nossa origem</p>
              <h2 className="section__title">
                Por que <span className="text-gradient">Hydra</span>
              </h2>
              <p className="about-story__text">
                O nome vem da mitologia: uma criatura com múltiplas cabeças, cada uma agindo com autonomia, mas
                todas movidas pelo mesmo corpo. É assim que organizamos nosso trabalho squads independentes de
                produto, design e engenharia, unidos por um único padrão de qualidade.
              </p>
              <p className="about-story__text">
                Fundada para provar que software brasileiro compete de igual para igual com qualquer startup do
                Vale do Silício, a Hydra combina rigor técnico com sensibilidade de design sem atalhos, sem
                aparência de template.
              </p>
            </div>
          </div>
        </section>

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

        <section className="section values">
          <div className="container">
            <div className="section__head" data-aos="fade-up">
              <p className="eyebrow">O que nos guia</p>
              <h2 className="section__title">
                Valores <span className="text-gradient">não negociáveis</span>
              </h2>
            </div>
            <div className="values__grid">
              <article className="value-card" data-aos="fade-up">
                <h3>Obsessão por detalhe</h3>
                <p>Cada pixel, cada milissegundo de resposta importa. Não entregamos &quot;bom o suficiente&quot;.</p>
              </article>
              <article className="value-card" data-aos="fade-up" data-aos-delay="100">
                <h3>Transparência radical</h3>
                <p>Comunicação direta com o cliente em cada etapa, sem surpresas no final do projeto.</p>
              </article>
              <article className="value-card" data-aos="fade-up" data-aos-delay="200">
                <h3>Engenharia que dura</h3>
                <p>Construímos para escalar, não para remendar. Código limpo é decisão de negócio.</p>
              </article>
            </div>
          </div>
        </section>

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
