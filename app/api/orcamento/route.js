import { handleLead, statusResponse } from "@/lib/handleLead";
import { validateQuote } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  return handleLead(request, "quote", validateQuote);
}

export async function GET() {
  return statusResponse();
}
