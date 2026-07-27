/* ADQUIRA — script compartido de todas las páginas.
   Cada bloque comprueba que el elemento exista antes de actuar,
   así el mismo archivo sirve para la home y las páginas internas. */

// PLACEHOLDER: número real de WhatsApp de la firma (código de país, sin espacios ni símbolos).
const WHATSAPP = '000000000';
const WA_BASE = `https://wa.me/${WHATSAPP}`;

document.addEventListener('DOMContentLoaded', () => {

  // Año dinámico del footer.
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  // Menú responsive (hamburguesa).
  const toggle = document.getElementById('navToggle');
  const lista = document.getElementById('navLista');
  if (toggle && lista) {
    toggle.addEventListener('click', () => {
      const abierto = lista.classList.toggle('abierto');
      toggle.setAttribute('aria-expanded', abierto);
    });
    lista.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      lista.classList.remove('abierto');
      toggle.setAttribute('aria-expanded', false);
    }));
  }

  // Enlaces directos a WhatsApp (botón de contacto y dato de la lista).
  document.querySelectorAll('#whatsappBtn, #whatsappDato').forEach(el => {
    el.href = WA_BASE;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // Botones de plan → WhatsApp con mensaje contextualizado según el plan elegido.
  const mensajesPlan = {
    'Asesoría': 'Hola ADQUIRA, requiero información sobre el Plan Asesoría ($600/mes) para orientación jurídica y revisión documental en contratación pública.',
    'Gestión': 'Hola ADQUIRA, requiero información sobre el Plan Gestión ($800/mes) para acompañamiento, redacción de descargos y negociaciones.',
    'Defensa': 'Hola ADQUIRA, requiero información sobre el Plan Defensa ($1.200/mes) para patrocinio jurídico, representación y procedimientos sancionatorios.'
  };

  document.querySelectorAll('[data-plan]').forEach(el => {
    const plan = el.getAttribute('data-plan');
    const mensajeBase = mensajesPlan[plan] || `Hola ADQUIRA, me interesa recibir información sobre el plan ${plan} de asesoría preventiva.`;
    const texto = encodeURIComponent(mensajeBase);
    el.href = `${WA_BASE}?text=${texto}`;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // LinkedIn: reemplazar por la URL real del perfil institucional de ADQUIRA.
  const linkedinLink = document.getElementById('linkedinLink');
  if (linkedinLink) linkedinLink.href = 'https://www.linkedin.com/company/adquira';

  // Formulario de contacto: envío real vía Formspree (sin backend propio).
  const form = document.getElementById('formContacto');
  if (form) {
    const estado = document.getElementById('formEstado');
    const btn = document.getElementById('btnEnviar');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const campos = [
      { id: 'nombre',  err: 'err-nombre',  wrap: 'campo-nombre',  test: v => v.trim().length > 0,       msg: 'Ingrese su nombre.' },
      { id: 'correo',  err: 'err-correo',  wrap: 'campo-correo',  test: v => emailRe.test(v.trim()),    msg: 'Ingrese un correo válido.' },
      { id: 'mensaje', err: 'err-mensaje', wrap: 'campo-mensaje', test: v => v.trim().length > 0,       msg: 'Escriba su mensaje.' }
    ];

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      estado.textContent = '';
      estado.classList.remove('error');

      let primerInvalido = null;
      campos.forEach(c => {
        const input = document.getElementById(c.id);
        const errEl = document.getElementById(c.err);
        const wrap = document.getElementById(c.wrap);
        if (!c.test(input.value)) {
          errEl.textContent = c.msg;
          wrap.classList.add('error');
          input.setAttribute('aria-invalid', 'true');
          if (!primerInvalido) primerInvalido = input;
        } else {
          errEl.textContent = '';
          wrap.classList.remove('error');
          input.removeAttribute('aria-invalid');
        }
      });

      if (primerInvalido) {
        estado.classList.add('error');
        estado.textContent = 'Revise los campos marcados.';
        primerInvalido.focus();
        return;
      }

      // Válido → envío real por AJAX a Formspree (no recarga la página).
      const textoBtn = btn.textContent;
      btn.classList.add('cargando');
      btn.disabled = true;
      btn.textContent = 'Enviando…';
      estado.classList.remove('error');
      estado.textContent = '';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(res => {
          if (res.ok) {
            estado.textContent = 'Mensaje enviado. Le responderemos a la brevedad.';
            form.reset();
          } else {
            estado.classList.add('error');
            estado.textContent = 'No se pudo enviar el mensaje. Escríbanos directamente a contacto@adquirafirma.com';
          }
        })
        .catch(() => {
          estado.classList.add('error');
          estado.textContent = 'No se pudo enviar el mensaje. Escríbanos directamente a contacto@adquirafirma.com';
        })
        .finally(() => {
          btn.classList.remove('cargando');
          btn.disabled = false;
          btn.textContent = textoBtn;
        });
    });

    // Validación en blur: limpia el error apenas el campo queda correcto.
    campos.forEach(c => {
      const input = document.getElementById(c.id);
      input.addEventListener('blur', () => {
        if (input.value.trim() === '') return;
        if (c.test(input.value)) {
          document.getElementById(c.err).textContent = '';
          document.getElementById(c.wrap).classList.remove('error');
          input.removeAttribute('aria-invalid');
        }
      });
    });
  }

  // Indicador de sección activa en el menú (solo home: nav con anclas internas).
  const navInterno = document.querySelectorAll('#navLista a[href^="#"]');
  if (navInterno.length && 'IntersectionObserver' in window) {
    const mapa = {};
    navInterno.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      if (id) mapa[id] = a;
    });
    const secciones = Object.keys(mapa)
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (secciones.length) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            navInterno.forEach(a => a.classList.remove('activo'));
            const link = mapa[en.target.id];
            if (link) link.classList.add('activo');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      secciones.forEach(s => obs.observe(s));
    }
  }

  // Botón flotante "volver arriba": aparece tras bajar, sube al hacer clic.
  const irArriba = document.getElementById('irArriba');
  if (irArriba) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alternar = () => irArriba.classList.toggle('visible', window.scrollY > 600);
    alternar();
    window.addEventListener('scroll', alternar, { passive: true });
    irArriba.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

});
