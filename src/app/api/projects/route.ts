import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongodb";
import Project from "@/models/project.model";
import { handleError } from "@/utils/errorHandler";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export async function GET() {
  try {
    await connectToDb();

    const projects = await Project.find({})
      .sort({ order: 1 })
      .lean();

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

    await connectToDb();

    // for bulk array
    if (Array.isArray(body)) {
      const newProjects = await Project.insertMany(
        body.map(proj => ({
          order: proj.order,
          title: proj.title,
          description: proj.description,
          imageUrl: proj.imageUrl,
          link: proj.link,
          categories: proj.categories || [],
        }))
      );
      return NextResponse.json(newProjects);
    } 
    
    //for single object
    else {

      const { order, title, description, imageUrl, link, categories } = body;

      if (!title || !description || !imageUrl || !link) {
        return NextResponse.json(
          { error: "title, description, imageUrl, and link are required" },
          { status: 400 }
        );
      }

      const newProject = await Project.create({
        order: order || 0,
        title,
        description,
        imageUrl,
        link,
        categories: categories || [],
      });

      return NextResponse.json(newProject);
    }
  } 
  catch (error) {
    return handleError(error);
  }
}