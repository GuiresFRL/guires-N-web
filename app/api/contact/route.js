import { clean, isEmail, sendMail, smtpConfigured, throttled } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request) {
  if (!smtpConfigured()) return Response.json({ ok: false, error: "Mail is not configured." }, { status: 503 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (throttled(ip)) return Response.json({ ok: false, error: "Too many requests." }, { status: 429 });

  let data;
  try { data = await request.json(); } catch { return Response.json({ ok: false, error: "Invalid request." }, { status: 400 }); }

  const name = clean(data.name, 120), email = clean(data.email, 200);
  const subject = clean(data.subject, 200), body = String(data.body ?? "").trim().slice(0, 8000);
  if (!name || !isEmail(email) || !subject || body.length < 10) {
    return Response.json({ ok: false, error: "Please complete all required fields." }, { status: 400 });
  }
  try {
    await sendMail({ to: process.env.CONTACT_TO || "hr@guires.com", subject: `[Website enquiry] ${subject}`, text: body, replyTo: email, replyName: name });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("contact mail failed:", e?.message);
    return Response.json({ ok: false, error: "Could not send the message." }, { status: 502 });
  }
}
