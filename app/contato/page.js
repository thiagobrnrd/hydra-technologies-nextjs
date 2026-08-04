import BodyClass from "@/components/BodyClass";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contato · Hydra Technologies",
  description: "Solicite um orçamento com a Hydra Technologies e vamos construir o futuro juntos.",
  openGraph: {
    title: "Contato · Hydra Technologies",
    description: "Solicite um orçamento com a Hydra Technologies e vamos construir o futuro juntos.",
    type: "website",
    images: ["/images/logo.jpeg"],
  },
};

export default function ContatoPage() {
  return (
    <>
      <BodyClass className="page--contact" />

      <main id="main">
        <section className="section page-hero page-hero--contact">
          <div className="hero__bg" aria-hidden="true">
            <div className="hero__aurora hero__aurora--sub"></div>
            <div className="hero__grid"></div>
          </div>
          <div className="container">
            <p className="eyebrow" data-aos="fade-up">
              Fale com a Hydra
            </p>
            <h1 className="page-hero__title" data-aos="fade-up" data-aos-delay="100">
              Vamos construir <span className="text-gradient">algo grande</span>
            </h1>
            <p className="page-hero__subtitle" data-aos="fade-up" data-aos-delay="200">
              Conte um pouco sobre seu projeto e retornamos em até 1 dia útil.
            </p>
          </div>
        </section>

        <section className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-info" data-aos="fade-right">
              <h2 className="section__title">
                Fale <span className="text-gradient">diretamente</span> conosco
              </h2>
              <p className="contact-info__text">Prefere um canal direto? Estamos disponíveis pelos meios abaixo.</p>
              <ul className="contact-info__list" role="list">
                <li>
                  <span className="contact-info__label">E-mail</span>
                  <a href="mailto:contato@hydratechnologies.com">contato.techhydra@gmail.com</a>
                </li>
                <li>
                  <span className="contact-info__label">Telefone</span>
                  <a href="tel:+5511999999999">+55 11 999101739</a>
                </li>
                <li>
                  <span className="contact-info__label">Localização</span>
                  <span>Suzano, São Paulo</span>
                </li>
              </ul>
            </div>

            <div className="contact-form-wrap" data-aos="fade-left">
              <div className="contact-form-wrap__glow" aria-hidden="true"></div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
