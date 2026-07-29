// Vercel Serverless Function - lead capture for Tammy's guide funnel
// Adds the subscriber to a Rav Messer (responder.live) list; the list's
// published email series delivers the guide email on join.
// Guide config lives in /guides/config.json (slug -> list_id, pdf_url).

import { readFileSync } from "fs";
import { join } from "path";

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

const RAVMESSER_API = "https://graph.responder.live/v2";

// Rav Messer v2 auth: client_credentials + the account's user_token exchange
// for a JWT that is valid ~14 days. Cached across warm invocations.
let tokenCache = { jwt: null, expiresAt: 0 };

function jwtExpiry(jwt) {
  try {
    const payload = JSON.parse(
      Buffer.from(jwt.split(".")[1], "base64url").toString("utf8"),
    );
    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

async function getToken(force = false) {
  if (!force && tokenCache.jwt && Date.now() < tokenCache.expiresAt) {
    return tokenCache.jwt;
  }
  const clientId = Number(process.env.RAVMESSER_CLIENT_ID);
  const clientSecret = process.env.RAVMESSER_CLIENT_SECRET;
  const userToken = process.env.RAVMESSER_USER_TOKEN;
  if (!clientId || !clientSecret || !userToken) {
    throw new Error("Rav Messer credentials not configured");
  }
  const res = await fetch(`${RAVMESSER_API}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      scope: "*",
      client_id: clientId,
      client_secret: clientSecret,
      user_token: userToken,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.token) throw new Error(`Rav Messer auth ${res.status}`);
  // Refresh a minute early; fall back to 1h if the JWT carries no exp
  const exp = jwtExpiry(data.token);
  tokenCache = {
    jwt: data.token,
    expiresAt: (exp || Date.now() + 3600 * 1000) - 60 * 1000,
  };
  return data.token;
}

async function postSubscriber(jwt, listId, name, email) {
  return fetch(`${RAVMESSER_API}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, email, list_ids: [Number(listId)] }),
  });
}

async function addSubscriber(listId, name, email) {
  let res = await postSubscriber(await getToken(), listId, name, email);
  // A stale cached JWT is the one failure worth retrying
  if (res.status === 401) {
    res = await postSubscriber(await getToken(true), listId, name, email);
  }
  const data = await res.json().catch(() => ({}));
  // Already on the list = returning reader = success for the user
  const duplicate = JSON.stringify(data).includes("already");
  if (!res.ok || (data.status === false && !duplicate)) {
    throw new Error(`Rav Messer ${res.status}: ${JSON.stringify(data)}`);
  }
  return { id: data.createdId ?? null, duplicate };
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
