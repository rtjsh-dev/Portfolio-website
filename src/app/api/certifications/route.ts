import { NextResponse } from "next/server";
import { certifications } from "@/app/api/constants/certifications";
import { handleError } from "@/utils/errorHandler";

// GET all certifications
export async function GET() {
  try {
    const certs = certifications
      .slice()
      .sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime());
    return NextResponse.json(certs);
  } catch (error) {
    return handleError(error);
  }
}

// POST new certification(s) - not supported for static data
export async function POST(req: Request) {
  return NextResponse.json({ error: "Not implemented for static data" }, { status: 501 });
}