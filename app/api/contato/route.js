import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validateContact";

// Ported from ContactController.submitContact (Spring Boot).
// In production this would forward the request to a CRM or e-mail
// service; here it validates the payload and logs it, matching the
// original demo behavior.
export async function POST(request) {
  const body = await request.json();
  const { valid, errors, data } = validateContact(body);

  if (!valid) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.log(`Novo pedido de orçamento recebido de ${data.name} <${data.email}>`);

  return NextResponse.json({ ok: true });
}
