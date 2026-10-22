import { SITE, PROJECT_TYPES, DEADLINES, BUDGETS, labelOf } from "./site";
import { digits } from "./validation";

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const waNumber = (phone) => {
  const d = digits(phone || "");
  if (!d) return "";
  return d.length <= 11 ? `55${d}` : d;
};

function shell({ preheader, title, body }) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#eef1f7;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#0b1222">
<span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f7;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dfe5f0">
<tr><td style="background:#05070d;padding:26px 30px;background-image:linear-gradient(120deg,#05070d 0%,#081a33 60%,#0a2a55 100%)">
  <div style="font-family:Arial,sans-serif;font-size:13px;letter-spacing:6px;color:#4cc9ff;font-weight:700">HYDRA</div>
  <div style="font-size:10px;letter-spacing:4px;color:#8ea3c7;margin-top:2px">TECHNOLOGIES</div>
  <div style="font-size:22px;line-height:1.3;color:#ffffff;font-weight:600;margin-top:18px">${esc(title)}</div>
</td></tr>
<tr><td style="padding:26px 30px 8px">${body}</td></tr>
<tr><td style="padding:18px 30px 26px;font-size:12px;color:#7a869c;border-top:1px solid #eef1f7">
  ${esc(SITE.name)} · ${esc(SITE.city)} · <a href="${SITE.url}" style="color:#0077cc;text-decoration:none">hydratechnologies.com.br</a>
</td></tr></table></td></tr></table></body></html>`;
}

function rows(pairs) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
${pairs
  .filter(([, v]) => v)
  .map(
    ([k, v]) => `<tr><td style="padding:9px 0;color:#6b778c;width:150px;vertical-align:top;border-bottom:1px solid #f0f2f7">${esc(k)}</td>
<td style="padding:9px 0;color:#0b1222;font-weight:600;border-bottom:1px solid #f0f2f7">${v}</td></tr>`
  )
  .join("")}</table>`;
}

function button(href, label, bg) {
  return `<a href="${href}" style="display:inline-block;background:${bg};color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:10px;margin:0 8px 10px 0">${esc(label)}</a>`;
}

function messageBlock(message) {
  return `<div style="margin:22px 0 6px;font-size:12px;letter-spacing:1.5px;color:#6b778c;text-transform:uppercase">Mensagem</div>
<div style="background:#f5f7fb;border:1px solid #e6eaf2;border-radius:12px;padding:16px 18px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(message)}</div>`;
}

/* ───────── Lead para a Hydra ───────── */
export function leadEmail(kind, d) {
  const isQuote = kind === "quote";
  const typeLabel = isQuote ? labelOf(PROJECT_TYPES, d.projectType) : "Mensagem rápida";
  const subject = isQuote
    ? `[Orçamento] ${typeLabel} — ${d.name}${d.company ? ` · ${d.company}` : ""}`
    : `[Contato] ${d.name}`;
  const wa = waNumber(d.phone);
  const firstName = d.name.split(" ")[0];

  const pairs = [
    ["Nome", esc(d.name)],
    ["E-mail", `<a href="mailto:${esc(d.email)}" style="color:#0077cc">${esc(d.email)}</a>`],
    ["WhatsApp / Tel.", d.phone ? esc(d.phone) : ""],
  ];
  if (isQuote) {
    pairs.push(
      ["Empresa", esc(d.company)],
      ["Tipo de projeto", esc(typeLabel)],
      ["Prazo", d.deadline ? esc(labelOf(DEADLINES, d.deadline)) : ""],
      ["Investimento", d.budget ? esc(labelOf(BUDGETS, d.budget)) : ""]
    );
  }

  const body = `${rows(pairs)}${messageBlock(d.message)}
<div style="margin:24px 0 8px">
${button(`mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent(`Re: ${isQuote ? "seu orçamento" : "sua mensagem"} — Hydra Technologies`)}`, "Responder por e-mail", "#0b1222")}
${wa ? button(`https://wa.me/${wa}?text=${encodeURIComponent(`Olá, ${firstName}! Aqui é da Hydra Technologies, recebi sua ${isQuote ? "solicitação de orçamento" : "mensagem"} pelo site.`)}`, "Chamar no WhatsApp", "#1fa855") : ""}
</div>`;

  const text = [
    isQuote ? "NOVA SOLICITAÇÃO DE ORÇAMENTO" : "NOVA MENSAGEM PELO SITE",
    "",
    ...pairs.filter(([, v]) => v).map(([k]) => `${k}: ${plain(k, d, typeLabel)}`),
    "",
    "Mensagem:",
    d.message,
  ].join("\n");

  return {
    subject,
    html: shell({
      preheader: `${typeLabel} · ${d.name} · ${d.email}`,
      title: isQuote ? "Nova solicitação de orçamento" : "Nova mensagem pelo site",
      body,
    }),
    text,
  };
}

function plain(k, d, typeLabel) {
  return (
    {
      Nome: d.name,
      "E-mail": d.email,
      "WhatsApp / Tel.": d.phone,
      Empresa: d.company,
      "Tipo de projeto": typeLabel,
      Prazo: labelOf(DEADLINES, d.deadline),
      Investimento: labelOf(BUDGETS, d.budget),
    }[k] || ""
  );
}

/* ───────── Resposta automática para o cliente ───────── */
export function autoReplyEmail(kind, d) {
  const firstName = esc(d.name.split(" ")[0]);
  const isQuote = kind === "quote";
  const body = `<p style="font-size:15px;line-height:1.65;margin:0 0 14px">Olá, ${firstName}!</p>
<p style="font-size:15px;line-height:1.65;margin:0 0 14px">Recebemos sua ${isQuote ? "solicitação de orçamento" : "mensagem"} e ela já está com a gente. Vamos analisar e responder em até <b>1 dia útil</b>, por e-mail ou WhatsApp.</p>
${isQuote ? `<p style="font-size:15px;line-height:1.65;margin:0 0 6px">Resumo do que você enviou:</p>${rows([["Projeto", esc(labelOf(PROJECT_TYPES, d.projectType))], ["Prazo", d.deadline ? esc(labelOf(DEADLINES, d.deadline)) : ""]])}` : ""}
${messageBlock(d.message)}
<p style="font-size:15px;line-height:1.65;margin:22px 0 14px">Se preferir adiantar a conversa, é só chamar:</p>
<div style="margin:0 0 10px">${button(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Olá! Acabei de enviar uma solicitação pelo site da Hydra.")}`, "Falar no WhatsApp", "#1fa855")}</div>
<p style="font-size:14px;color:#6b778c;line-height:1.6;margin:18px 0 0">Equipe Hydra Technologies</p>`;
  return {
    subject: isQuote ? "Recebemos sua solicitação de orçamento — Hydra Technologies" : "Recebemos sua mensagem — Hydra Technologies",
    html: shell({ preheader: "Obrigado pelo contato! Respondemos em até 1 dia útil.", title: "Recebemos seu contato", body }),
    text: `Olá, ${d.name.split(" ")[0]}!\n\nRecebemos sua ${isQuote ? "solicitação de orçamento" : "mensagem"}. Vamos responder em até 1 dia útil.\n\nWhatsApp: https://wa.me/${SITE.whatsapp}\n\nEquipe Hydra Technologies`,
  };
}
