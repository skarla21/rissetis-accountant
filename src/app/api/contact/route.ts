import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_URL } from "@/lib/seo";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  recaptchaToken?: unknown;
};

type RateEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateEntry>();

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF and other controls so user input cannot inject email headers. */
function sanitizeForHeader(value: string): string {
  return value.replace(/[\0-\x1f\x7f]/g, " ").replace(/\s+/g, " ").trim();
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

function allowedRecaptchaHostnames(): Set<string> {
  const hosts = new Set<string>(["localhost"]);

  try {
    const hostname = new URL(SITE_URL).hostname;
    hosts.add(hostname);
    if (hostname.startsWith("www.")) {
      hosts.add(hostname.slice(4));
    } else {
      hosts.add(`www.${hostname}`);
    }
  } catch {
    // SITE_URL is a constant; ignore parse failure
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    hosts.add(vercelUrl.replace(/^https?:\/\//, "").split("/")[0]!);
  }

  return hosts;
}

async function verifyRecaptcha(token: string, secret: string): Promise<boolean> {
  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as {
    success?: boolean;
    hostname?: string;
    "error-codes"?: string[];
  };

  if (result.success !== true) {
    if (result["error-codes"]?.length) {
      console.error("reCAPTCHA error-codes:", result["error-codes"].join(", "));
    }
    return false;
  }

  const hostname = result.hostname?.trim();
  if (!hostname || !allowedRecaptchaHostnames().has(hostname)) {
    console.error("reCAPTCHA hostname rejected:", hostname ?? "(missing)");
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const name = asNonEmptyString(body.name);
  const email = asNonEmptyString(body.email);
  const message = asNonEmptyString(body.message);
  const recaptchaToken = asNonEmptyString(body.recaptchaToken);

  if (!name || !email || !message || !recaptchaToken) {
    return NextResponse.json(
      { message: "Name, email, message, and reCAPTCHA are required" },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json({ message: "Field exceeds maximum length" }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
  }

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.NEXT_PUBLIC_RISSETIS_EMAIL;

  if (!recaptchaSecret || !resendApiKey || !from || !to) {
    console.error("Contact API missing required environment variables");
    return NextResponse.json(
      { message: "Contact form is not configured" },
      { status: 500 }
    );
  }

  const captchaOk = await verifyRecaptcha(recaptchaToken, recaptchaSecret);
  if (!captchaOk) {
    return NextResponse.json(
      { message: "reCAPTCHA verification failed" },
      { status: 401 }
    );
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const subjectName = sanitizeForHeader(name).slice(0, MAX_NAME_LENGTH) || "Contact";
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Νέο μήνυμα επικοινωνίας — ${subjectName}`,
      html: `
      <p><strong>Όνομα:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Μήνυμα:</strong></p>
      <p>${safeMessage}</p>
    `,
    });

    if (error) {
      console.error("Resend send failed:", error.message);
      return NextResponse.json(
        { message: "Failed to send message" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Resend send threw:", err);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
