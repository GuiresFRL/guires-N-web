import { clean, isEmail, sendMail, smtpConfigured, throttled } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const OK_EXT = /\.(pdf|docx?)$/i;

export async function POST(request) {
  if (!smtpConfigured()) return Response.json({ ok: false, error: "Mail is not configured." }, { status: 503 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (throttled(ip)) return Response.json({ ok: false, error: "Too many requests." }, { status: 429 });

  let form;
  try { form = await request.formData(); } catch { return Response.json({ ok: false, error: "Invalid request." }, { status: 400 }); }

  const name = clean(form.get("name"), 120), email = clean(form.get("email"), 200);
  const subject = clean(form.get("subject"), 200), body = String(form.get("body") ?? "").trim().slice(0, 8000);
  const resume = form.get("resume");
  if (!name || !isEmail(email) || !subject || !body) {
    return Response.json({ ok: false, error: "Please complete all required fields." }, { status: 400 });
  }
  if (!resume || typeof resume === "string" || !OK_EXT.test(resume.name) || resume.size > MAX_BYTES || resume.size === 0) {
    return Response.json({ ok: false, error: "Attach a PDF, DOC or DOCX resume up to 5 MB." }, { status: 400 });
  }
  try {
    await sendMail({
      to: process.env.CAREERS_TO || "careers@guires.com",
      subject: `[Website application] ${subject}`,
      text: body,
      replyTo: email,
      replyName: name,
      attachments: [{ filename: clean(resume.name, 120), content: Buffer.from(await resume.arrayBuffer()) }],
    });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("careers mail failed:", e?.message);
    return Response.json({ ok: false, error: "Could not send the application." }, { status: 502 });
  }
}
