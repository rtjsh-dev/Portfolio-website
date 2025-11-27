import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { handleError } from "@/utils/errorHandler";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    // Validate environment variables early and return clear errors
    const EMAIL = process.env.EMAIL;
    const APP_PW = process.env.APP_PW;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

    if (!EMAIL || !APP_PW || !CONTACT_EMAIL) {
      console.error("Missing email env vars", { EMAIL: !!EMAIL, APP_PW: !!APP_PW, CONTACT_EMAIL: !!CONTACT_EMAIL });
      return NextResponse.json(
        { success: false, message: "Email configuration is missing on the server. Please set EMAIL, APP_PW, and CONTACT_EMAIL in .env.local." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: APP_PW,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: CONTACT_EMAIL,
      subject: `[Portfolio Contact] ${subject}`,
      text: `You got a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } 
  catch (error) {
    return handleError(error);
  }
}