# ADQUIRA — Sitio web

Sitio estático (HTML + CSS + JS puro, sin build ni backend) de **ADQUIRA**,
firma especializada en contratación pública en Ecuador.

## Estructura

```
adquirafirma-sitio/
├── index.html                        Página principal (home)
├── servicios/
│   ├── asesoria-preventiva.html      Planes de asesoría preventiva
│   └── defensa-y-patrocinio.html     Vías de defensa y patrocinio
├── assets/
│   ├── css/
│   │   └── styles.css                Hoja de estilos única del sitio
│   ├── js/
│   │   └── main.js                   Script compartido por todas las páginas
│   └── img/                          Imágenes propias (aún vacío)
├── docs/                             Documentos internos — NO se publican
│   └── ADQUIRA-acta-reunion.pdf
├── .gitignore
└── README.md
```

## Rutas

- Desde `index.html` (raíz): `assets/...` y `servicios/...`
- Desde `servicios/*.html`: se sube un nivel con `../` (`../assets/...`, `../index.html`).

## Ver el sitio en local

Abrir `index.html` en el navegador, o servirlo:

```bash
# Python
python -m http.server 8000
# luego abrir http://localhost:8000
```

## Pendientes antes de producción

Editar en [`assets/js/main.js`](assets/js/main.js):

- **WhatsApp** → reemplazar `wa.me/000000000` por el número real (código de país, sin espacios ni símbolos).
- **LinkedIn** → reemplazar `linkedin.com/company/adquira` por la URL real del perfil.

Editar en [`index.html`](index.html):

- **Formulario de contacto** → envía por AJAX a Formspree. Crear cuenta gratuita en
  [formspree.io](https://formspree.io), generar un formulario y reemplazar
  `action="https://formspree.io/f/TU_FORM_ID"` por el endpoint real. El correo de
  destino se configura dentro del panel de Formspree, no en el código.

Otros:

- Las imágenes del hero y secciones son de **Unsplash** (hotlink). Para producción,
  descargar y alojar en `assets/img/` para no depender de un tercero.
- No hay favicon. Añadir uno en la raíz y enlazarlo desde el `<head>` de cada página.
