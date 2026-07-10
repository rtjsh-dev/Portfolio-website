import { NextResponse } from "next/server";
import { profileInfo, experience, education, contactInfo, projects, certificationsList, fetchBlogs } from "@/app/about/data";

type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  mode?: "ai" | "human";
  message: string;
  history?: ChatHistoryItem[];
};

const createSystemPrompt = async (mode?: "ai" | "human") => {
  const blogs = await fetchBlogs().catch(() => []);
  const topBlogs = Array.isArray(blogs) ? blogs.slice(0, 3) : [];

  const projectLines = (projects || [])
    .slice(0, 5)
    .map((p: any) => `- ${p.title}: ${p.description} (${p.link || "no link"})`)
    .join("\n");

  const certLines = (certificationsList || [])
    .slice(0, 8)
    .map((c: any) => `- ${c.title} (${c.issuedDate || "date unknown"})`)
    .join("\n");

  const blogLines = topBlogs
    .map((b: any) => `- ${b.title}: ${b.description ? b.description.slice(0, 140) + (b.description.length > 140 ? "..." : "") : "No summary"} (${b.link})`)
    .join("\n");

  const profileFacts = `
You are an AI assistant for Rajesh's portfolio.
Use the profile facts below when answering personal questions.

Name: ${profileInfo.name}
Title: ${profileInfo.title}
Tagline: ${profileInfo.tagline}
Bio: ${profileInfo.bio}
Skills: ${profileInfo.skills.join(", ")}
Strengths: ${profileInfo.strengths.join(", ")}
Experience:
${experience
      .map((item) => `- ${item.title} (${item.period}): ${item.description}`)
      .join("\n")}
Education:
${education
      .map((item) => `- ${item.title} (${item.period}): ${item.description}`)
      .join("\n")}
Projects:
${projectLines}
Certifications:
${certLines}
Blogs:
${blogLines}
Contact:
- Email: ${contactInfo.email}
- LinkedIn: ${contactInfo.linkedin}
- GitHub: ${contactInfo.github}
`;

  if (mode === "human") {
    return `${profileFacts}
You are Rajesh, a friendly front-end developer from Nepal. Answer conversationally and clearly, and help visitors understand the portfolio, skills, and how to contact Rajesh. Keep replies polite, professional, and personal.`;
  }

  return `${profileFacts}
You are a helpful AI assistant for a developer portfolio. Answer clearly, assist with questions about projects, technologies, or collaboration, and keep responses concise and friendly.`;
};

export async function POST(req: Request) {
  try {
    const { mode, message, history } = (await req.json()) as ChatRequestBody;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message content is required." }, { status: 400 });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      const fallback =
        mode === "human"
          ? "Rajesh is available for direct conversations through the contact form below or by email at rajesh025thapa@gmail.com."
          : "This chatbot is running in demo mode because no OpenAI key is configured. Please set OPENAI_API_KEY in .env.local to enable real AI responses.";
      return NextResponse.json({ reply: fallback });
    }

    const systemPrompt = await createSystemPrompt(mode);
    const messages = [
      { role: "system", content: systemPrompt },
      ...(Array.isArray(history)
        ? history
          .slice(-10)
          .map((item) => ({ role: item.role, content: item.content }))
        : []),
      { role: "user", content: message },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",

      },
      body: JSON.stringify({
        model: "openai/gpt-4.1-mini",
        messages,
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenAI chat error", response.status, errorBody);
      return NextResponse.json(
        {
          reply:
            "I couldn't get a response from the AI service right now. Please try again later or contact Rajesh directly.",
          error: `OpenAI returned ${response.status}: ${errorBody}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ reply: reply ?? "Sorry, I could not generate a response." });
  } catch (error) {
    console.error("Chat route error", error);
    return NextResponse.json({ error: "Unable to process chat message." }, { status: 500 });
  }
}
