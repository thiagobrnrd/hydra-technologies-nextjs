import nodemailer from "nodemailer";
import { Resend } from "resend";
import { SITE } from "./site";

/**
 * Envio de e-mails com dois provedores possíveis:
 *  - Gmail/SMTP (SMTP_USER + SMTP_PASS)  → recomendado, já envia resposta automática ao cliente
 *  - Resend     (RESEND_API_KEY)         → alternativa
 */
export function mailProvider() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) return "smtp";
  if (process.env.RESEND_API_KEY) return "resend";
  return null;
}

export function leadInbox() {
  return process.env.CONTACT_TO_EMAIL || SITE.email;
}

/** Só dá para responder o cliente quando o remetente é um endereço real. */
export function canAutoReply() {
  const p = mailProvider();
  return p === "smtp" || (p === "resend" && Boolean(process.env.RESEND_FROM));
}

let transporter;
function smtp() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        // senhas de app do Google aparecem com espaços — removemos
        pass: String(process.env.SMTP_PASS).replace(/\s+/g, ""),
      },
    });
  }
  return transporter;
}

export async function sendMail({ to, subject, html, text, replyTo }) {
  const provider = mailProvider();
  if (!provider) {
    const err = new Error("E-mail não configurado (defina SMTP_USER/SMTP_PASS ou RESEND_API_KEY)");
    err.code = "NOT_CONFIGURED";
    throw err;
  }

  if (provider === "smtp") {
    await smtp().sendMail({
      from: { name: SITE.name, address: process.env.SMTP_USER },
      to,
      subject,
      html,
      text,
      replyTo,
    });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || `${SITE.name} <onboarding@resend.dev>`,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
    replyTo,
  });
  if (error) throw new Error(`Resend: ${error.message || error.name}`);
}
