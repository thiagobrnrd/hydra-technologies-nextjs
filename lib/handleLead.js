import { NextResponse, after } from "next/server";
import { rateLimit, clientIp } from "./rateLimit";
import { sendMail, leadInbox, canAutoReply, mailProvider } from "./mailer";
import { leadEmail, autoReplyEmail } from "./emailTemplates";

const json = (body, status = 200, headers) => NextResponse.json(body, { status, headers });

/**
 * Fluxo compartilhado pelas rotas /api/orcamento e /api/contato:
 * parse → anti-spam → validação → rate limit → e-mail para a Hydra → resposta automática ao cliente.
 */
export async function handleLead(request, kind, validate) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_body", message: "Requisição inválida." }, 400);
  }
  if (!body || typeof body !== "object") return json({ error: "invalid_body", message: "Requisição inválida." }, 400);

  // Honeypot + tempo mínimo de preenchimento: bots recebem "ok" e nada é enviado.
  const elapsed = Number(body._t ? Date.now() - Number(body._t) : Infinity);
  if ((typeof body.website === "string" && body.website.trim()) || elapsed < 2500) {
    return json({ ok: true });
  }

  const { valid, errors, data } = validate(body);
  if (!valid) return json({ error: "validation", errors }, 400);

  const limit = rateLimit(`${kind}:${clientIp(request)}`);
  if (!limit.ok) {
    return json(
      { error: "rate_limited", message: "Muitas tentativas seguidas. Tente novamente em alguns minutos ou fale com a gente pelo WhatsApp." },
      429,
      { "Retry-After": String(limit.retryAfter) }
    );
  }

  if (!mailProvider()) {
    console.error(`[${kind}] E-mail não configurado — lead NÃO entregue:`, JSON.stringify(data));
    return json(
      { error: "not_configured", message: "Nosso envio por e-mail está em manutenção. Envie pelo WhatsApp que respondemos rapidinho." },
      503
    );
  }

  try {
    const mail = leadEmail(kind, data);
    await sendMail({ to: leadInbox(), replyTo: data.email, ...mail });
  } catch (err) {
    console.error(`[${kind}] Falha ao enviar e-mail:`, err?.message || err, JSON.stringify(data));
    return json(
      { error: "send_failed", message: "Não conseguimos enviar agora. Tente de novo em instantes ou fale com a gente pelo WhatsApp." },
      502
    );
  }

  if (canAutoReply()) {
    after(async () => {
      try {
        await sendMail({ to: data.email, replyTo: leadInbox(), ...autoReplyEmail(kind, data) });
      } catch (err) {
        console.warn(`[${kind}] Resposta automática falhou:`, err?.message || err);
      }
    });
  }

  console.log(`[${kind}] Lead recebido: ${data.name} <${data.email}>`);
  return json({ ok: true });
}

export function statusResponse() {
  return json({ ok: true, email: mailProvider() ? "configured" : "not_configured" });
}
