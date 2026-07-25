// Vercel Serverless Function - lead capture for Tammy's guide funnel
// Adds the subscriber to a Rav Messer (responder.co.il) list; the list's
// first automated message (SEND_0) delivers the guide email.
// Guide config lives in /guides/config.json (slug -> list_id, pdf_url).

import { readFileSync } from "fs";
import { join } from "path";
import { createHash, randomBytes } from "crypto";

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

const ALLOWED_ORIGINS = [
  "https://tammy-site.vercel.app",
  "http://localhost:3333",
  "http://127.0.0.1:3333",
];

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function sanitize(str, maxLen = 100) {
  if (!str || typeof str !== "string") return "";
  return str.slice(0, maxLen).replace(/[<>"'&]/g, "");
}

function loadGuides() {
  const configPath = join(process.cwd(), "guides", "config.json");
  return JSON.parse(readFileSync(configPath, "utf8"));
}

// Rav Messer auth header: c_key, c_secret=MD5(client_secret+nonce),
// u_key, u_secret=MD5(user_secret+nonce), nonce, timestamp
function ravmesserAuthHeader() {
  const cKey = process.env.RAVMESSER_C_KEY;
  const cSecret = process.env.RAVMESSER_C_SECRET;
  const uKey = process.env.RAVMESSER_U_KEY;
  const uSecret = process.env.RAVMESSER_U_SECRET;
  if (!cKey || !cSecret || !uKey || !uSecret) return null;
  const nonce = randomBytes(16).toString("hex");
  const timestamp = Math.floor(Date.now() / 1000);
  const md5 = (s) => createHash("md5").update(s).digest("hex");
  return [
    `c_key=${cKey}`,
    `c_secret=${md5(cSecret + nonce)}`,
    `u_key=${uKey}`,
    `u_secret=${md5(uSecret + nonce)}`,
    `nonce=${nonce}`,
    `timestamp=${timestamp}`,
  ].join(",");
}

async function addSubscriber(listId, name, email) {
  const auth = ravmesserAuthHeader();
  if (!auth) throw new Error("Rav Messer credentials not configured");
  const res = await fetch(
    `https://api.responder.co.il/main/lists/${encodeURIComponent(listId)}/subscribers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify([{ NAME: name, EMAIL: email, SEND_0: 1 }]),
    },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Rav Messer ${res.status}`);
  const created =
    Array.isArray(data.SUBSCRIBERS_CREATED) &&
    data.SUBSCRIBERS_CREATED.length > 0;
  // Existing subscriber = returning reader = success for the user
  const existing =
    Array.isArray(data.EMAILS_EXISTING) && data.EMAILS_EXISTING.length > 0;
  if (!created && !existing) {
    throw new Error(
      `Rav Messer rejected: ${JSON.stringify(data.ERRORS || data)}`,
    );
  }
  return { created, existing };
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const allowed = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", allowed);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (origin && !ALLOWED_ORIGINS.includes(origin))
    return res.status(403).json({ ok: false, error: "Forbidden" });

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (isRateLimited(ip)) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ ok: false, error: "Too many requests" });
  }

  try {
    const raw = JSON.stringify(req.body || {});
    if (raw.length > 1000)
      return res.status(400).json({ ok: false, error: "Payload too large" });

    const email = sanitize(req.body?.email, 254).toLowerCase();
    const name = sanitize(req.body?.name, 100);
    const source = sanitize(req.body?.source, 50);

    if (!isValidEmail(email))
      return res.status(400).json({ ok: false, error: "Invalid email" });

    const guides = loadGuides();
    const guide = guides[source];
    if (!guide || guide.active === false)
      return res.status(400).json({ ok: false, error: "Invalid source" });

    await addSubscriber(guide.list_id, name, email);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("subscribe error:", err.message);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
