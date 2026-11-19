# ADQUIRA — Sitio Web Oficial & API Serverless

Sitio web corporativo y API serverless para **ADQUIRA S.A.S.**, firma jurídica especializada en Contratación Pública en Quito, Ecuador.

Desplegado en **Vercel** con URLs limpias (`cleanUrls`), cabeceras de seguridad HTTP, almacenamiento en caché de activos estáticos y función serverless para procesamiento de formularios vía **Resend**.

---

## 🏛️ Arquitectura del Proyecto

```
adquirafirma-sitio/
├── index.html                      # Página principal (Inicio, propuesta de valor y contacto)
├── quienes-somos.html              # Quiénes somos, equipo, enfoque y valores
├── asesoria-permanente.html        # Servicio: Asesoría preventiva continua para contratistas
├── defensa-puntual.html            # Servicio: Defensa, reclamos y patrocinio contencioso
├── politica-de-privacidad.html     # Política de Privacidad conforme a la LOPDP ecuatoriana
│
├── api/                            # Vercel Serverless Functions
│   ├── send.js                     # Endpoint POST /api/send para procesar el formulario
│   └── templates.js                # Plantillas HTML de correo (Admin y Confirmación a cliente)
│
├── img/                            # Recursos gráficos locales de alta resolución
│   ├── columnas.jpg                # Imagen institucional: Columnas de justicia
│   ├── faro.jpg                    # Imagen institucional: Faro de guía y prevención
│   └── puente.jpg                  # Imagen institucional: Puente de infraestructura
│
├── favicon.svg                     # Isotipo vectorial corporativo de ADQUIRA
├── style.css                       # Hoja de estilos global (Sistema de diseño ADQUIRA)
├── server.js                       # Servidor HTTP local para desarrollo (Node.js nativo)
├── vercel.json                     # Configuración de Vercel (cleanUrls, redirects, headers)
├── package.json                    # Metadatos del proyecto y scripts de ejecución
└── .gitignore                      # Exclusiones de Git (.env, node_modules, scratch)
```

---

## 🚀 Despliegue en Vercel

El proyecto está configurado para despliegue automático mediante Git con Vercel.

### Variables de Entorno Requeridas en Vercel:

Configurar en el panel de Vercel (**Project Settings > Environment Variables**):

| Variable | Descripción | Ejemplo / Valor |
|---|---|---|
| `RESEND_API_KEY` | Clave API de Resend para envío de correos | `re_123456789...` |
| `TO_EMAIL` | Correo receptor de notificaciones de nuevos prospectos | `contacto@adquirafirma.com` |

### Características configuradas en `vercel.json`:
- **Clean URLs (`cleanUrls: true`)**: Permite rutas limpias sin extensión `.html` (ej. `/quienes-somos`, `/asesoria-permanente`, `/defensa-puntual`).
- **Redirecciones 301 permanentes**: Mapeo de rutas legacy (`/servicios/asesoria-preventiva` → `/asesoria-permanente`, `/servicios/defensa-y-patrocinio` → `/defensa-puntual`).
- **Seguridad HTTP**: Cabeceras `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Caché CDN**: Cabecera `Cache-Control` inmutable para imágenes, favicon y estilos.

---

## 💻 Desarrollo Local

No se requieren librerías externas ni instalación pesada de dependencias. Se utiliza Node.js nativo (>= 18.0).

1. **Crear archivo `.env`** en la raíz (ignorado por Git):
   ```env
   RESEND_API_KEY=re_tu_api_key_aqui
   TO_EMAIL=contacto@adquirafirma.com
   PORT=3000
   ```

2. **Iniciar el servidor local**:
   ```bash
   npm start
   # o bien:
   node server.js
   ```

3. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

---

## 🎨 Identidad de Marca y Colores

Basado en el Manual de Identidad de Marca de ADQUIRA S.A.S.:

- **Petróleo (Principal):** `#0E4D5F`
- **Petróleo Oscuro:** `#0A3A49`
- **Arena (Fondo / Neutro):** `#EDE7DA`
- **Arena Oscura:** `#E3DCCB`
- **Coral (Acento / CTA):** `#D4644A`
- **Coral Claro:** `#F4A28A`
- **Blanco:** `#FFFFFF`
- **Tipografía Institucional:** Georgia / Serif editorial

---

## ⚖️ Licencia

Todos los derechos reservados © ADQUIRA S.A.S. — Prohibida su reproducción sin autorización.
