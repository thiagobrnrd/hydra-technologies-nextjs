import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/validateContact";

// Serverless route (runs on Vercel like any other Next.js API route —
// no separate backend/server needed). Validates the payload and sends
// the lead by e-mail via Resend to the Hydra inbox.
export async function POST(request) {
  const body = await request.json();
  const { valid, errors, data } = validateContact(body);

  if (!valid) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      // Must be a domain verified in Resend. Use "onboarding@resend.dev"
      // only for quick testing — see setup notes.
      from: "Hydra Technologies <contato@hydratechnologies.com.br>",
      to: ["contato.techhydra@gmail.com"],
      replyTo: data.email,
      subject: `Novo orçamento — ${data.name}`,
      text: [
        `Nome: ${data.name}`,
        `E-mail: ${data.email}`,
        `Telefone: ${data.phone || "não informado"}`,
        "",
        "Mensagem:",
        data.message,
      ].join("\n"),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Falha ao enviar e-mail via Resend:", err);
    return NextResponse.json(
      { errors: { message: "Não foi possível enviar sua mensagem agora. Tente novamente em instantes." } },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
