import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limit: max 3 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // ── IP for rate limiting ──────────────────────────────────
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in an hour." },
        { status: 429 }
      );
    }

    // ── Parse body ────────────────────────────────────────────
    let body: { name?: string; email?: string; message?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const name    = (body.name    ?? "").trim();
    const email   = (body.email   ?? "").trim();
    const message = (body.message ?? "").trim();

    // ── Validation ────────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Name must be 2–100 characters." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json({ error: "Message must be 10–1000 characters." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ── Check env vars ────────────────────────────────────────
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RECIPIENT_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !RECIPIENT_EMAIL) {
      console.error("[send-email] Missing env vars:", {
        SMTP_HOST:       !!SMTP_HOST,
        SMTP_PORT:       !!SMTP_PORT,
        SMTP_USER:       !!SMTP_USER,
        SMTP_PASS:       !!SMTP_PASS,
        RECIPIENT_EMAIL: !!RECIPIENT_EMAIL,
      });
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    // ── Create transporter ────────────────────────────────────
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: SMTP_PORT === "465",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      // Helps with Gmail strict TLS
      tls: { rejectUnauthorized: false },
    });

    // ── Verify connection before sending ──────────────────────
    await transporter.verify();
    console.log("[send-email] SMTP connection verified ✓");

    // ── Build email ───────────────────────────────────────────
    const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    await transporter.sendMail({
      from:    `"Portfolio – viratsathavara.in" <${SMTP_USER}>`,
      to:      RECIPIENT_EMAIL,
      replyTo: email,
      subject: `📬 New message from ${name} — Portfolio`,
      text: [
        `You received a new message from your portfolio contact form.`,
        ``,
        `Name:    ${name}`,
        `Email:   ${email}`,
        ``,
        `Message:`,
        message,
        ``,
        `──────────────────────────────`,
        `Time : ${now} (IST)`,
        `IP   : ${ip}`,
        `Via  : viratsathavara.in`,
      ].join("\n"),
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
         background: #f4f4f5; padding: 32px 16px; color: #18181b; }
  .card { max-width: 560px; margin: 0 auto; background: #ffffff;
          border-radius: 12px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
            padding: 28px 32px; }
  .header h1 { color: #fff; font-size: 22px; font-weight: 700; }
  .header p  { color: rgba(255,255,255,0.85); font-size: 13px; margin-top: 4px; }
  .body { padding: 28px 32px; }
  .field { margin-bottom: 20px; }
  .label { font-size: 11px; font-weight: 600; text-transform: uppercase;
           letter-spacing: 0.08em; color: #71717a; margin-bottom: 6px; }
  .value { font-size: 15px; color: #18181b; background: #f9f9f9;
           border: 1px solid #e4e4e7; border-radius: 8px; padding: 10px 14px;
           line-height: 1.6; word-break: break-word; }
  .value a { color: #f59e0b; text-decoration: none; }
  .footer { background: #f9f9f9; border-top: 1px solid #e4e4e7;
            padding: 16px 32px; text-align: center; }
  .footer p { font-size: 12px; color: #a1a1aa; }
  .footer a { color: #f59e0b; text-decoration: none; }
  .badge { display: inline-block; background: rgba(245,158,11,0.12);
           color: #d97706; border: 1px solid rgba(245,158,11,0.3);
           border-radius: 9999px; font-size: 11px; font-weight: 600;
           padding: 2px 10px; margin-left: 8px; vertical-align: middle; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h1>📬 New Message Received</h1>
    <p>Someone reached out via your portfolio contact form</p>
  </div>
  <div class="body">
    <div class="field">
      <div class="label">From</div>
      <div class="value">${escapeHtml(name)}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="value">${escapeHtml(message).replace(/\n/g, "<br>")}</div>
    </div>
  </div>
  <div class="footer">
    <p>Sent from <a href="https://viratsathavara.in">viratsathavara.in</a>
    &nbsp;·&nbsp; ${now} IST &nbsp;·&nbsp; IP: ${ip}</p>
  </div>
</div>
</body>
</html>`,
    });

    console.log(`[send-email] ✅ Email sent to ${RECIPIENT_EMAIL} from ${name} <${email}>`);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });

  } catch (err) {
    console.error("[send-email] ❌ Error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.includes("Invalid login")
            ? "SMTP authentication failed. Check your app password."
            : "Failed to send email. Please try contacting via phone or LinkedIn.",
      },
      { status: 500 }
    );
  }
}

// Prevent XSS in HTML emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
