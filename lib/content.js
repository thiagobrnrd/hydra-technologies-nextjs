/**
 * Central source of structured content for the site.
 *
 * Ported 1:1 from com.hydra.technologies.service.ContentService
 * (Spring Boot / Java) — same copy, same order, same values.
 */

export function getServices() {
  return [
    {
      icon: "code",
      title: "Desenvolvimento Web",
      description:
        "Plataformas e sites de alta performance, construídos com arquitetura limpa e escalável.",
      index: "01",
    },
    {
      icon: "mobile",
      title: "Aplicativos",
      description:
        "Apps nativos e híbridos com experiência fluida, do primeiro toque à última tela.",
      index: "02",
    },
    {
      icon: "enterprise",
      title: "Sistemas Empresariais",
      description:
        "Softwares sob medida que organizam operações complexas com simplicidade.",
      index: "03",
    },
    {
      icon: "automation",
      title: "Automação",
      description:
        "Processos inteligentes que eliminam tarefas repetitivas e aceleram resultados.",
      index: "04",
    },
    {
      icon: "ai",
      title: "Inteligência Artificial",
      description:
        "Modelos e integrações de IA aplicadas a problemas reais de negócio.",
      index: "05",
    },
    {
      icon: "cloud",
      title: "Cloud",
      description:
        "Infraestrutura escalável, segura e resiliente, pronta para crescer com você.",
      index: "06",
    },
  ];
}

export function getProducts() {
  return [
    {
      name: "HydraBand",
      tagline: "Smart Collar for Pets",
      description:
        "Uma coleira inteligente que acompanha localização, saúde e bem-estar do seu pet em tempo real com o mesmo rigor de engenharia de tudo o que a Hydra constrói.",
      highlights: [
        "GPS de precisão",
        "Monitoramento de saúde",
        "Bateria de longa duração",
        "App dedicado",
      ],
      featured: true,
      comingSoon: true,
    },
    {
      name: "Hydra OS",
      tagline: "Plataforma de Integração",
      description:
        "Camada de software que conecta produtos, sensores e sistemas Hydra em uma única experiência.",
      highlights: ["APIs abertas", "Painel unificado", "Segurança de ponta a ponta"],
      featured: false,
      comingSoon: false,
    },
  ];
}

export function getDifferentiators() {
  return [
    {
      icon: "bolt",
      title: "Alta Performance",
      description: "Sistemas otimizados para velocidade em qualquer escala.",
    },
    {
      icon: "layers",
      title: "Tecnologia Moderna",
      description: "Stack atualizado, sem débito técnico escondido.",
    },
    {
      icon: "scale",
      title: "Escalabilidade",
      description: "Arquitetura pronta para crescer junto com o seu negócio.",
    },
    {
      icon: "shield",
      title: "Segurança",
      description: "Boas práticas de segurança em cada camada do sistema.",
    },
    {
      icon: "spark",
      title: "UX Ideal",
      description: "Interfaces pensadas para encantar desde o primeiro clique.",
    },
    {
      icon: "clean",
      title: "Código Limpo",
      description: "Engenharia de software feita para durar.",
    },
  ];
}

export function getStats() {
  return [
    { prefix: "+", value: 50, suffix: "", label: "Projetos entregues" },
    { prefix: "", value: 99, suffix: "%", label: "Satisfação dos clientes" },
    { prefix: "", value: 24, suffix: "/7", label: "Suporte dedicado" },
    { prefix: "", value: 100, suffix: "%", label: "Responsivo" },
  ];
}

export function getProcessSteps() {
  return [
    {
      order: "01",
      title: "Descoberta",
      description:
        "Entendemos profundamente o seu negócio, seus usuários e seus objetivos.",
    },
    {
      order: "02",
      title: "Planejamento",
      description:
        "Definimos escopo, arquitetura e o caminho mais eficiente até o resultado.",
    },
    {
      order: "03",
      title: "Design",
      description:
        "Criamos interfaces elegantes, funcionais e alinhadas à sua marca.",
    },
    {
      order: "04",
      title: "Desenvolvimento",
      description:
        "Construímos com engenharia de qualidade e ciclos de entrega curtos.",
    },
    {
      order: "05",
      title: "Deploy",
      description:
        "Colocamos o produto no ar com segurança e monitoramento ativo.",
    },
    {
      order: "06",
      title: "Suporte",
      description:
        "Acompanhamos, evoluímos e damos suporte contínuo ao seu produto.",
    },
  ];
}
