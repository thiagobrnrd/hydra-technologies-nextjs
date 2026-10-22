import ContactSection from "@/components/ContactSection";

const STACK = ["Next.js", "React", "Java", "Spring Boot", "PostgreSQL", "Node.js", "Vercel", "ESP32", "MQTT", "Three.js"];

function Check() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

function Chapter({ id, n, kicker, title, lead, items, cta, service, badge }) {
  return (
    <section id={id} className="chapter" data-scene={id} aria-labelledby={`${id}-title`}>
      <div className="chapter__sticky">
        <div className="container chapter__inner">
          <div className="chapter__copy">
            <p className="kicker" data-reveal>
              <span>{n}</span> {kicker}
              {badge && <em className="badge">{badge}</em>}
            </p>
            <h2 id={`${id}-title`} className="h2" data-reveal dangerouslySetInnerHTML={{ __html: title }} />
            <p className="lead" data-reveal>
              {lead}
            </p>
            <ul className="features" data-reveal>
              {items.map((it) => (
                <li key={it}>
                  <Check />
                  {it}
                </li>
              ))}
            </ul>
            <div className="actions" data-reveal>
              <a href="#contato" className="btn btn--primary" data-service={service}>
                {cta}
              </a>
            </div>
          </div>
        </div>
        <div className="chapter__rail" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      {/* ───────── HERO ───────── */}
      <section id="inicio" className="hero" data-scene="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <p className="kicker hero__kicker" data-reveal>
            <span className="pulse" aria-hidden="true" /> Engenharia de software · Suzano, SP
          </p>
          <h1 id="hero-title" className="h1">
            <span className="line" data-reveal>
              Sua tecnologia,
            </span>
            <span className="line grad" data-reveal style={{ "--d": "120ms" }}>
              nossa missão.
            </span>
          </h1>
          <p className="lead hero__lead" data-reveal style={{ "--d": "220ms" }}>
            Criamos <strong>sites institucionais</strong> e <strong>sistemas internos sob medida</strong> para o seu estabelecimento. Em breve,
            dispositivos inteligentes conectados.
          </p>
          <div className="actions" data-reveal style={{ "--d": "320ms" }}>
            <a href="#contato" className="btn btn--primary btn--lg" data-service="">
              Solicitar orçamento
            </a>
            <a href="#sites" className="btn btn--ghost btn--lg">
              Explorar em 3D
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 5v14m0 0-6-6m6 6 6-6" />
              </svg>
            </a>
          </div>
          <ol className="hero__index" data-reveal style={{ "--d": "420ms" }}>
            <li>
              <a href="#sites">
                <span>01</span> Sites institucionais
              </a>
            </li>
            <li>
              <a href="#sistemas">
                <span>02</span> Sistemas internos
              </a>
            </li>
            <li>
              <a href="#iot">
                <span>03</span> IoT <em className="badge">em breve</em>
              </a>
            </li>
          </ol>
        </div>
        <a href="#sites" className="scroll-cue" aria-label="Rolar para a próxima seção">
          <span className="scroll-cue__line" />
          <span className="scroll-cue__label">role para explorar</span>
        </a>
      </section>

      {/* ───────── STACK ───────── */}
      <div className="marquee" aria-label="Tecnologias que usamos">
        <div className="marquee__track">
          {[...STACK, ...STACK].map((s, i) => (
            <span key={i} aria-hidden={i >= STACK.length}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ───────── 01 SITES ───────── */}
      <Chapter
        id="sites"
        n="01"
        kicker="Sites institucionais"
        title={'Sua empresa apresentada no <span class="grad">nível que ela merece.</span>'}
        lead="Sites rápidos, bonitos e feitos para converter visitantes em clientes. Cada camada pensada: estrutura, layout, conteúdo e o botão que faz o telefone tocar."
        items={["Design exclusivo, nada de template pronto", "Responsivo e otimizado para o Google", "Formulário e WhatsApp integrados", "Domínio, hospedagem e SSL configurados"]}
        cta="Quero um site"
        service="site"
      />

      {/* ───────── 02 SISTEMAS ───────── */}
      <Chapter
        id="sistemas"
        n="02"
        kicker="Sistemas internos"
        title={'O controle do seu estabelecimento <span class="grad">em um só lugar.</span>'}
        lead="Sistemas sob medida para a rotina do seu negócio: agenda, clientes, serviços e financeiro, acessíveis do celular ou do computador, de qualquer lugar."
        items={["Agendamento online pelo link, 24h por dia", "Cadastro de clientes e histórico", "Financeiro e relatórios do mês", "Lembretes pelo WhatsApp em 1 clique"]}
        cta="Quero um sistema"
        service="sistema"
      />

      {/* ───────── 03 IOT ───────── */}
      <Chapter
        id="iot"
        n="03"
        kicker="Dispositivos inteligentes"
        badge="em breve"
        title={'Hardware, firmware e nuvem <span class="grad">na mesma régua.</span>'}
        lead="Estamos levando a engenharia da Hydra para o mundo físico: dispositivos conectados que medem, automatizam e avisam, com painel na web e alertas no celular."
        items={["Placas com ESP32 e Wi-Fi", "Sensores, motores e automação", "Comunicação MQTT com a nuvem", "Dashboard e alertas em tempo real"]}
        cta="Quero ser avisado"
        service="iot"
      />

      {/* ───────── 04 PORTFÓLIO ───────── */}
      <Chapter
        id="portfolio"
        n="04"
        kicker="Portfólio · Case real"
        title={'Studio Elen Gomes: <span class="grad grad--gold">gestão e agendamento</span> de um studio de beleza.'}
        lead="Um sistema completo, com a identidade do Studio, para organizar a agenda, os clientes, os serviços e o caixa, e deixar as clientes agendarem sozinhas pelo link."
        items={["Login exclusivo com a marca do Studio", "Catálogo de serviços com preço e duração", "Pedidos de agendamento online", "Central de lembretes pelo WhatsApp"]}
        cta="Quero um sistema assim"
        service="sistema"
      />

      <section className="case" aria-labelledby="case-title">
        <div className="container">
          <div className="case__head">
            <p className="kicker" data-reveal>
              <span>Case</span> Do pedido à entrega
            </p>
            <h2 id="case-title" className="h3" data-reveal>
              Feito para a rotina real de um studio de beleza.
            </h2>
          </div>
          <div className="case__grid">
            <figure className="shot" data-reveal>
              <div className="shot__frame">
                <img src="/images/portfolio/elen-login.jpg" alt="Tela de login do sistema do Studio Elen Gomes, com a identidade visual dourada da marca" loading="lazy" width="1200" height="750" />
              </div>
              <figcaption>Acesso restrito com a identidade do Studio</figcaption>
            </figure>
            <figure className="shot" data-reveal style={{ "--d": "120ms" }}>
              <div className="shot__frame">
                <img src="/images/portfolio/elen-servicos.jpg" alt="Tela de catálogo de serviços do sistema do Studio Elen Gomes com preços e duração" loading="lazy" width="1386" height="866" />
              </div>
              <figcaption>Catálogo de serviços: preço, duração e retorno</figcaption>
            </figure>
          </div>
          <div className="case__facts">
            <div className="fact" data-reveal>
              <h3>Desafio</h3>
              <p>Organizar agenda, clientes e caixa em um só lugar e reduzir faltas, sem abrir mão do WhatsApp que as clientes já usam.</p>
            </div>
            <div className="fact" data-reveal style={{ "--d": "80ms" }}>
              <h3>Solução</h3>
              <p>Painel com agenda, clientes, serviços e financeiro, mais uma página pública onde as clientes pedem horário.</p>
            </div>
            <div className="fact" data-reveal style={{ "--d": "160ms" }}>
              <h3>Tecnologia</h3>
              <p className="stack-tags">
                <span>React / Next.js</span>
                <span>Java · Spring Boot</span>
                <span>PostgreSQL</span>
                <span>Vercel + Render</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PROCESSO ───────── */}
      <section id="processo" className="process" aria-labelledby="processo-title">
        <div className="container">
          <div className="process__head">
            <p className="kicker" data-reveal>
              <span>Como trabalhamos</span>
            </p>
            <h2 id="processo-title" className="h2" data-reveal>
              Simples para você. <span className="grad">Rigoroso por dentro.</span>
            </h2>
          </div>
          <ol className="steps">
            {[
              ["Conversa", "Entendemos sua rotina, seus clientes e o que precisa mudar. Sem compromisso."],
              ["Proposta", "Escopo, prazo e investimento claros, por escrito, antes de começar."],
              ["Desenvolvimento", "Entregas parciais para você acompanhar e ajustar durante o caminho."],
              ["Entrega e suporte", "Publicamos, treinamos sua equipe e seguimos junto depois do lançamento."],
            ].map(([t, d], i) => (
              <li key={t} className="step" data-reveal style={{ "--d": `${i * 90}ms` }}>
                <span className="step__n">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <div className="why">
            {[
              ["Atendimento direto", "Você fala com quem desenvolve. Sem intermediários, sem telefone sem fio."],
              ["Sob medida de verdade", "Nada de sistema genérico engessado: o software se adapta ao seu negócio."],
              ["Tecnologia de mercado", "Java, Spring Boot, React e Next.js: a mesma base de grandes empresas."],
              ["Tudo configurado", "Domínio, hospedagem, e-mails e publicação: você recebe pronto para usar."],
            ].map(([t, d], i) => (
              <div key={t} className="why__item" data-reveal style={{ "--d": `${i * 70}ms` }}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      {/* HUD de capítulos (desktop) */}
      <nav className="hud" aria-label="Capítulos">
        {[
          ["hero", "#inicio", "Início"],
          ["sites", "#sites", "Sites"],
          ["sistemas", "#sistemas", "Sistemas"],
          ["iot", "#iot", "IoT"],
          ["portfolio", "#portfolio", "Portfólio"],
          ["contato", "#contato", "Contato"],
        ].map(([id, href, label]) => (
          <a key={id} href={href} data-hud={id} className="hud__item">
            <span className="hud__label">{label}</span>
            <span className="hud__dot" />
          </a>
        ))}
      </nav>
    </main>
  );
}
