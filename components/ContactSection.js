import ContactForms, { WaIcon } from "./ContactForms";
import { SITE, waLink } from "@/lib/site";

export default function ContactSection({ standalone = false }) {
  const Title = standalone ? "h1" : "h2";
  return (
    <section id="contato" className={`contact ${standalone ? "contact--page" : ""}`} data-scene="contato" aria-labelledby="contato-title">
      <div className="container contact__grid">
        <div className="contact__copy">
          <p className="kicker" data-reveal>
            <span>05</span> Contato
          </p>
          <Title id="contato-title" className="h2" data-reveal>
            Vamos construir o <span className="grad">próximo passo</span> do seu negócio.
          </Title>
          <p className="lead" data-reveal>
            Conte o que você precisa. Respondemos em até 1 dia útil com um caminho claro: escopo, prazo e investimento. Sem compromisso.
          </p>
          <ul className="contact__list" data-reveal>
            <li>
              <a href={waLink("Olá! Vim pelo site da Hydra e quero conversar sobre um projeto.")} target="_blank" rel="noopener noreferrer" className="contact__item contact__item--wa">
                <span className="contact__icon">
                  <WaIcon size={20} />
                </span>
                <span>
                  <small>WhatsApp</small>
                  {SITE.phoneDisplay}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="contact__item">
                <span className="contact__icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="1.8" d="M3.5 6.5h17v11h-17z M3.8 7l8.2 6.2L20.2 7" />
                  </svg>
                </span>
                <span>
                  <small>E-mail</small>
                  {SITE.email}
                </span>
              </a>
            </li>
            <li>
              <span className="contact__item">
                <span className="contact__icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="1.8" d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" />
                  </svg>
                </span>
                <span>
                  <small>Atendimento</small>
                  {SITE.city} · todo o Brasil, online
                </span>
              </span>
            </li>
          </ul>
        </div>
        <div className="contact__form" id="form-anchor" data-reveal>
          <ContactForms />
        </div>
      </div>
    </section>
  );
}
