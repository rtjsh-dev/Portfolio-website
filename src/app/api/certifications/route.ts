import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongodb";
import { Certification, ICertification } from "@/models/certification.model";
import { handleError } from "@/utils/errorHandler";

// GET all certifications
export async function GET() {
  try {
    await connectToDb();

    const certifications = await Certification.find<ICertification>({})
      .sort({ issuedDate: -1 })
      .lean<ICertification[]>();

    return NextResponse.json(certifications);
  } catch (error) {
    return handleError(error);
  }
}

// POST new certification(s)
export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await connectToDb();

    // for bulk array
    if (Array.isArray(body)) {
      const newCerts = await Certification.insertMany(
        body.map((cert: Partial<ICertification>) => ({
          title: cert.title!,
          link: cert.link!,
          imageUrl: cert.imageUrl!,
          categories: cert.categories || [],
          issuedDate: new Date(cert.issuedDate!),
        }))
      );
      return NextResponse.json(newCerts);
    } 
    
    // for single object
    else {
      const { title, link, imageUrl, categories, issuedDate } = body;
      if (!title || !link || !imageUrl || !issuedDate) {
        return NextResponse.json(
          { error: "title, link, imageUrl, and issuedDate are required" },
          { status: 400 }
        );
      }

      const newCert = await Certification.create({
        title,
        link,
        imageUrl,
        categories: categories || [],
        issuedDate: new Date(issuedDate),
      });
      return NextResponse.json(newCert);
    }
  } catch (error) {
    return handleError(error);
  }
}