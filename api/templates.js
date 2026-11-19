// Plantillas de correo basadas en el Manual de Identidad de Marca de ADQUIRA S.A.S. (Octubre 2026)
// Colores oficiales:
// Petróleo: #0E4D5F | Petróleo oscuro: #0A3A49 | Arena: #EDE7DA | Arena oscura: #E3DCCB
// Coral: #D4644A | Coral claro: #F4A28A | Coral profundo: #B03E26 | Blanco: #FFFFFF
// Tipografía: Georgia

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Plantilla 1: Correo de confirmación que recibe el CLIENTE (Prospecto / Contratista)
 */
function getClientConfirmationTemplate({ nombre, correo, empresa, mensaje }) {
  const safeNombre = escapeHtml(nombre);
  const safeEmpresa = escapeHtml(empresa || "");
  const safeMensaje = escapeHtml(mensaje);

  const empresaTexto = safeEmpresa
    ? ` en relación con <strong>${safeEmpresa}</strong>`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hemos recibido su consulta | ADQUIRA</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EDE7DA; font-family: Georgia, 'Times New Roman', serif; color: #0E4D5F; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #EDE7DA; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- CONTENEDOR PRINCIPAL -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #D2CAB6; border-top: 4px solid #D4644A;">
          
          <!-- CABECERA PETRÓLEO -->
          <tr>
            <td style="background-color: #0E4D5F; padding: 36px 40px; text-align: left;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <!-- LOGO ADQUIRA -->
                    <div style="font-size: 28px; font-weight: bold; letter-spacing: 0.16em; color: #EDE7DA; line-height: 1; font-family: Georgia, serif;">
                      ADQUIRA
                    </div>
                    <div style="font-size: 11px; letter-spacing: 0.12em; color: #EDE7DA; opacity: 0.88; text-transform: uppercase; margin-top: 8px; font-family: Georgia, serif;">
                      Firma jurídica especializada en Contratación Pública
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTENIDO -->
          <tr>
            <td style="padding: 42px 40px 32px; color: #0E4D5F; font-size: 16px; line-height: 1.6;">
              
              <div style="font-size: 12px; letter-spacing: 0.2em; font-weight: bold; color: #B03E26; text-transform: uppercase; margin-bottom: 12px;">
                CONFIRMACIÓN DE CONSULTA
              </div>
              
              <h1 style="font-size: 26px; line-height: 1.25; margin: 0 0 24px; color: #0E4D5F; font-weight: bold;">
                Hemos recibido su caso.
              </h1>
              
              <p style="margin: 0 0 18px;">
                Estimado(a) <strong>${safeNombre}</strong>,
              </p>
              
              <p style="margin: 0 0 18px;">
                Le confirmamos la recepción de su comunicación${empresaTexto} a través de nuestro sitio web.
              </p>

              <p style="margin: 0 0 24px;">
                En <strong>ADQUIRA</strong> nos dedicamos exclusivamente a la Contratación Pública al servicio del contratista. Su caso será analizado bajo estricta reserva y confidencialidad profesional para evaluar el escenario y las alternativas jurídicas correspondientes.
              </p>

              <!-- RESUMEN EN ARENA -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #EDE7DA; border-left: 4px solid #D4644A; margin: 26px 0;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 11px; letter-spacing: 0.18em; font-weight: bold; color: #B03E26; text-transform: uppercase; margin-bottom: 8px;">
                      DETALLE REGISTRADO DE SU CONSULTA
                    </div>
                    <div style="font-size: 14.5px; line-height: 1.55; color: #0E4D5F; font-style: italic;">
                      &ldquo;${safeMensaje}&rdquo;
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 28px;">
                Nos pondremos en contacto con usted a la brevedad posible.
              </p>

              <!-- CAJA DE URGENCIA / WHATSAPP -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #E3DCCB; background-color: #fcfbf9; margin-bottom: 34px;">
                <tr>
                  <td style="padding: 18px 22px;">
                    <div style="font-size: 14px; font-weight: bold; color: #0E4D5F; margin-bottom: 4px;">
                      ¿Su proceso cuenta con plazos administrativos en curso?
                    </div>
                    <div style="font-size: 13.5px; color: #0E4D5F; opacity: 0.9; margin-bottom: 12px; line-height: 1.45;">
                      Si requiere atención inmediata por términos o notificaciones de la entidad contratante, puede escribirnos directamente por WhatsApp:
                    </div>
                    <div>
                      <a href="https://wa.me/593985206918?text=Hola%2C%20acabo%20de%20enviar%20una%20consulta%20por%20la%20web%20y%20requiero%20atenci%C3%B3n%20urgente." style="display: inline-block; background-color: #0E4D5F; color: #EDE7DA; text-decoration: none; padding: 10px 18px; font-size: 13px; font-weight: bold; letter-spacing: 0.05em;">
                        Contactar por WhatsApp &rarr;
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- FIRMA INSTITUCIONAL SEGÚN MANUAL (PÁGINA 36) -->
              <div style="border-top: 1px solid #E3DCCB; padding-top: 24px;">
                <div style="font-size: 16px; font-weight: bold; color: #0E4D5F; margin-bottom: 3px;">
                  Abg. Alex Carvajal
                </div>
                <div style="font-size: 13px; color: #0E4D5F; opacity: 0.85; margin-bottom: 14px;">
                  Gerente General &middot; ADQUIRA S.A.S.
                </div>
                <div style="font-size: 13px; line-height: 1.7; color: #0E4D5F;">
                  +593 98 520 6918<br>
                  <a href="mailto:contacto@adquirafirma.com" style="color: #0E4D5F; text-decoration: none;">contacto@adquirafirma.com</a><br>
                  <a href="https://adquirafirma.com" style="color: #0E4D5F; text-decoration: none;">www.adquirafirma.com</a> &middot; Quito, Ecuador
                </div>
              </div>

            </td>
          </tr>

          <!-- PIE DE PÁGINA PETRÓLEO OSCURO -->
          <tr>
            <td style="background-color: #0A3A49; padding: 24px 40px; text-align: center;">
              <div style="font-size: 15px; font-style: italic; color: #EDE7DA; margin-bottom: 6px;">
                Prevenir primero, defender cuando haga falta.
              </div>
              <div style="font-size: 11px; color: #EDE7DA; opacity: 0.75; letter-spacing: 0.05em;">
                &copy; ADQUIRA S.A.S. &middot; Firma jurídica especializada en Contratación Pública
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Plantilla 2: Notificación interna que recibe ALEX / LA FIRMA
 */
function getAdminNotificationTemplate({ nombre, correo, empresa, mensaje }) {
  const safeNombre = escapeHtml(nombre);
  const safeCorreo = escapeHtml(correo);
  const safeEmpresa = escapeHtml(empresa || "No especificada");
  const safeMensaje = escapeHtml(mensaje);

  const cleanPhoneUrl = "https://wa.me/593985206918";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nueva consulta web | ADQUIRA</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EDE7DA; font-family: Georgia, 'Times New Roman', serif; color: #0E4D5F;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #EDE7DA; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #D2CAB6; border-top: 4px solid #0E4D5F;">
          
          <!-- CABECERA -->
          <tr>
            <td style="background-color: #0E4D5F; padding: 30px 40px;">
              <div style="font-size: 24px; font-weight: bold; letter-spacing: 0.16em; color: #EDE7DA; line-height: 1;">
                ADQUIRA
              </div>
              <div style="font-size: 11px; letter-spacing: 0.1em; color: #F4A28A; text-transform: uppercase; margin-top: 6px; font-weight: bold;">
                NUEVA CONSULTA DESDE LA WEB
              </div>
            </td>
          </tr>

          <!-- DETALLES DEL PROSPECTO -->
          <tr>
            <td style="padding: 36px 40px 30px;">
              <h2 style="font-size: 22px; color: #0E4D5F; margin: 0 0 20px; font-weight: bold;">
                Datos del cliente potencial:
              </h2>

              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EDE7DA; width: 130px; font-weight: bold; color: #B03E26;">Nombre:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EDE7DA; color: #0E4D5F;">${safeNombre}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EDE7DA; font-weight: bold; color: #B03E26;">Correo:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EDE7DA;">
                    <a href="mailto:${safeCorreo}" style="color: #0E4D5F; font-weight: bold;">${safeCorreo}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EDE7DA; font-weight: bold; color: #B03E26;">Empresa:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EDE7DA; color: #0E4D5F;">${safeEmpresa}</td>
                </tr>
              </table>

              <!-- DETALLE DEL CASO -->
              <div style="font-size: 12px; letter-spacing: 0.15em; font-weight: bold; color: #B03E26; text-transform: uppercase; margin-bottom: 8px;">
                DESCRIPCIÓN DEL CASO:
              </div>
              <div style="background-color: #EDE7DA; border-left: 4px solid #0E4D5F; padding: 18px; font-family: sans-serif; font-size: 14.5px; line-height: 1.6; color: #1c363f; white-space: pre-wrap; margin-bottom: 30px;">
${safeMensaje}
              </div>

              <!-- BOTONES DE ACCIÓN RÁPIDA -->
              <div style="text-align: center; margin-bottom: 10px;">
                <a href="mailto:${safeCorreo}?subject=Respuesta%20a%20su%20consulta%20en%20ADQUIRA" style="display: inline-block; background-color: #0E4D5F; color: #EDE7DA; text-decoration: none; padding: 12px 24px; font-size: 14px; font-weight: bold; margin-right: 10px;">
                  Responder por correo
                </a>
              </div>

            </td>
          </tr>

          <!-- PIE DE PÁGINA -->
          <tr>
            <td style="background-color: #0A3A49; padding: 16px 40px; text-align: center; font-size: 12px; color: #EDE7DA; opacity: 0.8;">
              ADQUIRA S.A.S. &middot; Panel de Notificaciones Web
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

module.exports = {
  getClientConfirmationTemplate,
  getAdminNotificationTemplate,
};
