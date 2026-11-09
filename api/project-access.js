
import crypto from "node:crypto";

const SESSION_COOKIE = "project_access";
const SESSION_DURATION = 60 * 60;

const protectedProject = {
  id: "project-04",
  about: "Закрытый проект.",
  role: "Product Designer",
  responsibilities: "Стратегия, UX/UI и прототипирование.",
  platforms: "Web",
  sections: [],
};

function getSecret(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function sign(value) {
  return crypto
    .createHmac("sha256", getSecret("SESSION_SECRET"))
    .update(value)
    .digest("base64url");
}

function createSession() {
  const payload = Buffer.from(
    JSON.stringify({
      projectId: "project-04",
      expiresAt: Date.now() + SESSION_DURATION * 1000,
    })
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

function isValidSession(token) {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;

  if (!payload || !signature) return false;

  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);

  if (
    expected.length !== received.length ||
    !crypto.timingSafeEqual(expected, received)
  ) {
    return false;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    return (
      session.projectId === "project-04" &&
      Number.isFinite(session.expiresAt) &&
      session.expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}

function getCookie(req, name) {
  const cookieHeader = req.headers.cookie || "";

  for (const item of cookieHeader.split(";")) {
    const separator = item.indexOf("=");
    if (separator === -1) continue;

    const key = item.slice(0, separator).trim();
    const value = item.slice(separator + 1).trim();

    if (key === name) return value;
  }

  return null;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "POST") {
    const { projectId, password } = req.body || {};

    if (
      projectId !== "project-04" ||
      typeof password !== "string" ||
      password.length === 0 ||
      password.length > 1024
    ) {
      return res.status(400).json({
        error: "Некорректный запрос.",
      });
    }

    let passwordMatches;

    try {
      const expected = crypto
        .createHash("sha256")
        .update(getSecret("PROJECT_04_PASSWORD"))
        .digest();

      const received = crypto
        .createHash("sha256")
        .update(password)
        .digest();

      passwordMatches = crypto.timingSafeEqual(expected, received);
    } catch (error) {
      console.error("Project access configuration error:", error.message);

      return res.status(500).json({
        error: "Сервер временно недоступен.",
      });
    }

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Пароль не подошёл. Попробуйте ещё раз.",
      });
    }

    const session = createSession();

    res.setHeader(
      "Set-Cookie",
      `${SESSION_COOKIE}=${session}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_DURATION}`
    );

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    const session = getCookie(req, SESSION_COOKIE);

    if (!isValidSession(session)) {
      return res.status(401).json({
        error: "Требуется авторизация.",
      });
    }

    return res.status(200).json({
      project: protectedProject,
    });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({
    error: "Метод не поддерживается.",
  });
}

