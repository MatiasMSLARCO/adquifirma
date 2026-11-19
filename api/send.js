const {
  getClientConfirmationTemplate,
  getAdminNotificationTemplate,
} = require("./templates.js");

async function handler(req, res) {
  // Configuración de CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        try {
          const params = new URLSearchParams(body);
          body = Object.fromEntries(params.entries());
        } catch (_) {}
      }
    }

    const { nombre, correo, empresa, mensaje } = body || {};

    if (!nombre || !correo || !mensaje) {
      return res
        .status(400)
        .json({ error: "Faltan campos obligatorios (nombre, correo o mensaje)" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.TO_EMAIL || "contacto@adquirafirma.com";

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Falta la configuración de RESEND_API_KEY en el servidor" });
    }

    // 1. Notificación para el equipo / Alex
    const adminHtml = getAdminNotificationTemplate({
      nombre,
      correo,
      empresa,
      mensaje,
    });

    const adminResponse = await fetch("https://api.resend.com/emails", {
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

    const adminData = await adminResponse.json();

    if (!adminResponse.ok) {
      console.error("Error al enviar notificación a la firma:", adminData);
      return res
        .status(adminResponse.status)
        .json({ error: adminData.message || "Error al enviar correo con Resend" });
    }

    // 2. Correo de confirmación elegante para el CLIENTE
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
      console.warn("Nota: Envío al cliente condicionado al dominio verificado de Resend:", clientErr);
    }

    return res.status(200).json({ success: true, id: adminData.id });
  } catch (error) {
    console.error("Error en servidor:", error);
    return res.status(500).json({ error: "Error interno en el servidor" });
  }
}

module.exports = handler;
module.exports.default = handler;
