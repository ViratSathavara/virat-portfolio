import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const results: Record<string, unknown> = {};

  // Step 1: Check env vars
  results.env = {
    SMTP_HOST:       process.env.SMTP_HOST       || "MISSING",
    SMTP_PORT:       process.env.SMTP_PORT       || "MISSING",
    SMTP_USER:       process.env.SMTP_USER       || "MISSING",
    SMTP_PASS:       process.env.SMTP_PASS       ? `SET (${process.env.SMTP_PASS.length} chars)` : "MISSING",
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL || "MISSING",
  };

  // Step 2: Try creating transporter
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    // Step 3: Verify SMTP connection
    await transporter.verify();
    results.smtpConnection = "SUCCESS ✅";

    // Step 4: Try sending a real test email
    const info = await transporter.sendMail({
      from:    `"Test" <${process.env.SMTP_USER}>`,
      to:      process.env.RECIPIENT_EMAIL,
      subject: "✅ Portfolio Email Test",
      text:    "If you receive this, your SMTP is working correctly!",
    });

    results.emailSent    = "SUCCESS ✅";
    results.messageId    = info.messageId;

  } catch (err) {
    results.error        = err instanceof Error ? err.message : String(err);
    results.errorCode    = (err as NodeJS.ErrnoException).code;
    results.status       = "FAILED ❌";
  }

  return NextResponse.json(results, { status: 200 });
}
