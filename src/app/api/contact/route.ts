import { NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, { count: number; resetAt: number }>();

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getClientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const entry = submissions.get(key);

  if (!entry || entry.resetAt <= now) {
    submissions.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ContactPayload;
    const name = normalize(payload.name);
    const email = normalize(payload.email).toLowerCase();
    const message = normalize(payload.message);
    const company = normalize(payload.company);

    if (company) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (name.length > 80 || email.length > 120 || message.length > 2000) {
      return NextResponse.json({ error: "Please keep your message within the allowed length." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const rateKey = `${getClientIp(req)}:${email}`;
    if (!checkRateLimit(rateKey)) {
      return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.log("Mock portfolio contact message", { name, email, message });
      await new Promise((resolve) => setTimeout(resolve, 700));
      return NextResponse.json({ success: true, mock: true });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "kenzamariyan32@gmail.com",
      subject: `New Portfolio Message from ${name.slice(0, 80)}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-top: 0;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #374151;">${safeMessage}</div>
          <p style="font-size: 11px; color: #9ca3af; margin-top: 24px;">Sent via Ken Zamariyan Portfolio</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error in contact API:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
