import { NextResponse } from "next/server";
import { projectsData } from "@/app/api/constants/projects";
import { handleError } from "@/utils/errorHandler";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export async function GET() {
  try {
    const projects = projectsData.slice().sort((a, b) => a.order - b.order);
    return NextResponse.json(projects);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    // POST is not implemented for static data
    return NextResponse.json({ error: "Not implemented for static data" }, { status: 501 });
  } 
  catch (error) {
    return handleError(error);
  }
}