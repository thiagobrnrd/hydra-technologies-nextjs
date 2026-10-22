export const SITE = {
  name: "Hydra Technologies",
  url: "https://hydratechnologies.com.br",
  email: "contato.techhydra@gmail.com",
  whatsapp: "5511999101739",
  phoneDisplay: "(11) 99910-1739",
  city: "Suzano · SP",
};

export function waLink(text) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const PROJECT_TYPES = [
  { id: "site", label: "Site institucional" },
  { id: "sistema", label: "Sistema interno" },
  { id: "iot", label: "Dispositivo inteligente / IoT" },
  { id: "outro", label: "Outro projeto" },
];

export const DEADLINES = [
  { id: "sem-pressa", label: "Sem pressa" },
  { id: "1-mes", label: "Até 1 mês" },
  { id: "3-meses", label: "Até 3 meses" },
  { id: "urgente", label: "Urgente" },
];

export const BUDGETS = [
  { id: "conversar", label: "Prefiro conversar" },
  { id: "ate-2k", label: "Até R$ 2 mil" },
  { id: "2k-5k", label: "R$ 2 mil – 5 mil" },
  { id: "5k-10k", label: "R$ 5 mil – 10 mil" },
  { id: "10k+", label: "Acima de R$ 10 mil" },
];

export const labelOf = (list, id) => list.find((x) => x.id === id)?.label || "—";
