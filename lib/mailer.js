import nodemailer from "nodemailer";

let transporter;
function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // SSL
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export const clean = (v, max = 200) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

/** Sends from the SMTP account; Reply-To is the visitor so replies go straight to them. */
export function sendMail({ to, subject, text, replyTo, replyName, attachments }) {
  return getTransporter().sendMail({
    from: `"Guires Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: replyName ? { name: replyName, address: replyTo } : replyTo,
    subject,
    text,
    attachments,
  });
}

// Very small in-memory throttle (per server instance): 5 submissions / 10 min per IP.
const hits = new Map();
export function throttled(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 600000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}
