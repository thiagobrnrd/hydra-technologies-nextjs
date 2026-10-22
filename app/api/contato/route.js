import { handleLead, statusResponse } from "@/lib/handleLead";
import { validateContact } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  return handleLead(request, "contact", validateContact);
}

export async function GET() {
  return statusResponse();
}
