const http = require("http");
const fs = require("fs");
const path = require("path");
const {
  getClientConfirmationTemplate,
  getAdminNotificationTemplate,
} = require("./api/templates.js");

// Cargar variables de entorno desde .env manualmente sin dependencias
function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    content.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...values] = trimmed.split("=");
        if (key && values.length) {
          process.env[key.trim()] = values.join("=").trim();
        }
      }
    });
  }
}
loadEnv();

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const server = http.createServer(async (req, res) => {
  // Manejo de endpoint /api/send
  if (req.url === "/api/send") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      return res.end();
    }

    if (req.method !== "POST") {
      res.writeHead(405, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Método no permitido" }));
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        let parsed = {};
        if (req.headers["content-type"]?.includes("application/json")) {
          parsed = JSON.parse(body);
        } else {
          const params = new URLSearchParams(body);
          for (const [k, v] of params.entries()) parsed[k] = v;
        }

        const { nombre, correo, empresa, mensaje } = parsed;

        if (!nombre || !correo || !mensaje) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              error: "Faltan campos obligatorios (nombre, correo o mensaje)",
            }),
          );
        }

        const apiKey = process.env.RESEND_API_KEY;
        const toEmail = process.env.TO_EMAIL || "contacto@adquirafirma.com";

        if (!apiKey) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              error: "Falta configurar RESEND_API_KEY en .env",
            }),
          );
        }

        // 1. Notificación interna para la firma / Alex
        const adminHtml = getAdminNotificationTemplate({
          nombre,
          correo,
          empresa,
          mensaje,
        });

        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "User-Agent": "resend-node/2.0.0",
          },
          body: JSON.stringify({
            from: "ADQUIRA Web <onboarding@resend.dev>",
            to: [toEmail],
            reply_to: correo,
            subject: `Nueva consulta legal: ${nombre} · ${empresa || "Particular"}`,
            html: adminHtml,
          }),
        });

        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
          res.writeHead(resendResponse.status, {
            "Content-Type": "application/json",
          });
          return res.end(
            JSON.stringify({
              error: resendData.message || "Error al enviar correo",
            }),
          );
        }

        // 2. Correo de confirmación institucional para el CLIENTE
        try {
          const clientHtml = getClientConfirmationTemplate({
            nombre,
            correo,
            empresa,
            mensaje,
          });

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "User-Agent": "resend-node/2.0.0",
            },
            body: JSON.stringify({
              from: "ADQUIRA <onboarding@resend.dev>",
              to: [correo],
              reply_to: "contacto@adquirafirma.com",
              subject: "Hemos recibido su consulta | ADQUIRA",
              html: clientHtml,
            }),
          });
        } catch (clientErr) {
          console.warn("Nota: Envío al cliente condicionado a dominio en Resend:", clientErr);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: true, id: resendData.id }));
      } catch (err) {
        console.error("Error procesando solicitud:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Error interno en el servidor" }),
        );
      }
    });
    return;
  }

  // Servir archivos estáticos
  let safePath = path.normalize(req.url.split("?")[0]);
  if (safePath === "/" || safePath === "\\") safePath = "/index.html";

  let filePath = path.join(__dirname, safePath);
  if (!path.extname(filePath) && fs.existsSync(filePath + ".html")) {
    filePath = filePath + ".html";
  }
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>404 Página no encontrada</h1>");
      } else {
        res.writeHead(500);
        res.end(`Error de servidor: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "text/plain" });
      res.end(content);
    }
  });
});

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

server.listen(PORT, () => {
  console.log(`Servidor ADQUIRA corriendo en http://localhost:${PORT}`);
});
